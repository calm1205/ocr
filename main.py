from PIL import Image
import pytesseract
import os

with open("output.txt", "w") as file:
    pass

image_dir = os.path.expanduser('./screenshot')
remove_book_title = "BETTER THAN BEFORE: HOW TO MAKE AND BREAK HABITS - AND BUILD A HAPPIER LIFE FROM THE NO.1 NEW YORK TIMES BESTSELLING QUEEN OF SELF-HELP (ENGLISH EDITION)"

for image_file in sorted(os.listdir(image_dir)):
    if image_file.endswith(('.png', '.jpg', '.jpeg')):
        img_path = os.path.join(image_dir, image_file)
        img = Image.open(img_path)
        text = pytesseract.image_to_string(img)

        # 指定された文字列を削除
        text = text.replace(remove_book_title, "")

        with open("output.txt", "a") as file:
            file.write(text)

        # print(f"\n{text}\n")
