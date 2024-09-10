import sys
import json
import QrCode

def main():
    if len(sys.argv) <= 1:
        print("Error: Usage: main.py <list-data> <function-value>")
        return
    
    asset = []
    for i in range(0,len(sys.argv)-2):
        asset.append(sys.argv[i+1] * 1)
    function_name = sys.argv[len(sys.argv)-1]

    if function_name == 'generate':
        result = QrCode.generate(asset)
        print(json.dumps(result))
    else:
        print(f"Function {function_name} is not found")

if __name__ == "__main__":
    main()
