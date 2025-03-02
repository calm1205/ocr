from PIL import Image
import pytesseract
import os
import re

image_dir = os.path.expanduser('~/Desktop/screenshot')
remove_text = "BETTER THAN BEFORE: HOW TO MAKE AND BREAK HABITS - AND BUILD A HAPPIER LIFE FROM THE NO.1 NEW YORK TIMES BESTSELLING QUEEN OF SELF-HELP (ENGLISH EDITION)"
remove_pattern = r"MEORA EMER \d{1,3}%"

for image_file in sorted(os.listdir(image_dir)):
    if image_file.endswith(('.png', '.jpg', '.jpeg')):
        img_path = os.path.join(image_dir, image_file)
        img = Image.open(img_path)
        text = pytesseract.image_to_string(img)

        # 指定された文字列を削除
        text = text.replace(remove_text, "")

        # MEORA EMER 1% のパターンを削除
        text = re.sub(remove_pattern, "", text)

        # print(f"Text from {image_file}:\n{text}\n")
        print(f"\n{text}\n")
