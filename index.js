const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const {spawn} = require('child_process');

const app = express();
let server = http.createServer(app);
const PORT = 9000;
const AppName = "WHITE QR";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
    res.status(200).render('index');
});

app.post('/create', async (req, res) => {
    const listOfInput = req.body.data;
    await callPythonProcess(listOfInput, 'generate').then(result => {
        //const imageBuffer = fs.readFileSync(path.resolve(result));
        //const base64Img = `data:image/png;base64,${imageBuffer.toString('base64')}`;
        res.status(200).json({img_path: result});
    }).catch(error => {
        console.log(error.message);
    });
});

function callPythonProcess(list, functionValue){
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['./model/main.py', list, functionValue]);
        let resultData = '';
        pythonProcess.stdout.on('data', (data) => {
            resultData += data.toString();
        });
        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
        pythonProcess.on('close', (code) => {
            if(code !== 0){
                console.log(`Python script exited with code ${code}`);
            }
            let result = null;
            try{
                if(typeof resultData === 'string'){
                    result = JSON.parse(resultData);
                }else{
                    result = resultData;
                }
                resolve(result);
            }catch(error){
                console.error(`Error parsing JSON: ${error.message}`);
                reject(new Error("Error parsing JSON from Python script"));
            }
        });
    });
}

app.get('*', (req, res) => {
    res.status(404).render('notfound',{error: 404, message: "Page not found on this url, check the source or report it"});
});

server.listen(PORT, (err) => {
    if(err) console.log("Oops an error occure:  "+err);
    console.log(`Compiled successfully!\n\nYou can now view \x1b[33m./${path.basename(__filename)}\x1b[0m in the browser.`);
    console.info(`\thttp://localhost:${PORT}`);
    console.log("\n\x1b[32mNode web compiled!\x1b[0m \n");
});
