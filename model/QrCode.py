import sys
import os
import qrcode #install it using  pip install qrcode[pil] 
import ast

def generate_qr_code(link, fcolor, bcolor, version, box, border):
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
        file_path = os.path.join(os.getcwd(), filename)
        img.save(file_path)
        
        return filename

    except Exception as e:
        print(f"An error occurred while generating the QR code: {e}")
        return None
    
def generate(input_list):
    if './model/main.py' in sys.argv[0]:
        input_list = [str(X) for X in input_list[0].split(',')]
    
    link, fcolor, bcolor, version, box, border = input_list

    qr_image_path = generate_qr_code(link, fcolor, bcolor, int(version), int(box), int(border))

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