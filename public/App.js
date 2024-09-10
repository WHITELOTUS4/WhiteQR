let system;
let loader;

function System(){
    try{
        this.listen = window.location;
    }catch(e){
        alert("System not deployed!\n\n",e);
    }
}
function Loader(load){
    this.loaded = load;
}
document.addEventListener("DOMContentLoaded",() =>{
    loader = new Loader(true);
    loader.creat();
    loader.remove(2000);
    system = new System();
});
Loader.prototype.creat = function(){
    if(loader.loaded!=false){
        const loaderEle = document.createElement('div');
        loaderEle.classList.add("loader");
        loaderEle.innerHTML = `<div class="centerDia"><div class="loading"></div></div>`;
        document.body.appendChild(loaderEle);
    }
}
Loader.prototype.remove = function(time){
    if(time<100){
        return false;
    }
    setTimeout(()=>{
        document.body.removeChild(document.querySelector('.loader'));
        loader.loaded = false;
    },time);
}
function route(link){
    window.location = link;
}
function invaild(){
    alert("Sorry, this feature not avalible in this version,\nTry another one!...");
}
System.prototype.downloadCode = function(id,name){
    const textToDownload = document.getElementById(id).textContent;
    // const fileName = "downloaded_file.txt";
    const fileName = `${name}`;
    const blob = new Blob([textToDownload], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}
System.prototype.submit = function(){
    let link = document.getElementById('link-input').value;
    let version = document.getElementById('version-input').value;
    let background = document.getElementById('back-input').value;
    let forground = document.getElementById('fore-input').value;
    let box = document.getElementById('box-input').value;
    let border = document.getElementById('bor-input').value;

    try{
        fetch('/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: [link, forground, background, version, box, border] }),
        }).then(responce => responce.json()).then(data => {
          system.setResponce(data.img_path);
        });
    }catch(e){
        alert('Error to submit', e);
    }
}
System.prototype.setResponce = function(path){
    let temp = `<img src=${path} alt="load"/>`;
    document.querySelector('.empty-qr').innerHTML = temp;
}