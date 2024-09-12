import sys
import os
import qrcode #install it using  pip install qrcode[pil] 
import ast
import base64
from io import BytesIO

def generate_qr_code(link, fcolor, bcolor, version, box, border, path):
    try:
        qr = qrcode.QRCode(
            version = version,
            error_correction = qrcode.constants.ERROR_CORRECT_L,
            box_size = box,
            border = border,
        )
        qr.add_data(link)
        qr.make(fit = True)

        img = qr.make_image(fill_color = fcolor, back_color = bcolor)

        filename = "./images/qr_code.png"
        #file_path = os.path.join(os.getcwd(), filename)
        img.save(path)
        
        return path

       ''' buffered = BytesIO()
        #img.save(buffered, format="PNG")
        
        # Convert the bytes to base64-encoded string
        img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
        img_data_uri = f"data:image/png;base64,{img_base64}"

        return img_data_uri'''

    except Exception as e:
       # print(f"An error occurred while generating the QR code: {e}")
        return path
    
def generate(input_list):
    if './model/main.py' in sys.argv[0]:
        input_list = [str(X) for X in input_list[0].split(',')]
    
    link, fcolor, bcolor, version, box, border, path = input_list

    qr_image_path = generate_qr_code(link, fcolor, bcolor, int(version), int(box), int(border), path.replace('\\','/'))

    return qr_image_path


def main():
    if(len(sys.argv) != 2):
        print("Error Usage: QrCode.py <list_value>")
        return
      
    input_list = ast.litreal_eval(sys.argv[1])
    
    qr_image_path = generate(input_list)
    
    if qr_image_path:
        return qr_image_path
    else:
        return 12

if __name__ == "__main__":
    main()

'''
This is a text message for you. If you read this that's mean i have great things in my life. 
'''
