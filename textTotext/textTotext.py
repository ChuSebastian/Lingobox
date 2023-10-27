from langdetect import detect
from translate import Translator

def detect_language(text):
    try:
        return detect(text)
    except:
        return 'Error en la deteccion del idioma'

#print(detect_language('This is an english text'))

languages = {
    "en": "english",
    "es": "spanish",
    "fra": "french",
    "ja": "japanese",
    "ru": "russian"
}

#print(languages[detect_language('This is an english text')])

def translate_text(text, dest_language, detected_language):
    try:
        #print(detect_language(text))
        translator = Translator(from_lang=languages[detected_language],to_lang=dest_language)
        return translator.translate(text)
    except:
        return 'Error en la traduccion'
    
#txt = input('Ingrese el texto a traducir: ')
#output = translate_text(txt,'english')
#print(output)

input_file_path = '../speechTotext/transcript.txt'
output_file_path = 'translation.txt'

with open(input_file_path, 'r') as input_file, open(output_file_path, 'w') as output_file:
    first_line = input_file.readline().strip()
    print(first_line)
    detected_language = detect_language(first_line)  # Detect the language of the first line
    
    # Translate and write the first line to the output file
    translated_first_line = translate_text(first_line, 'english', detected_language)
    output_file.write(translated_first_line + '\n')
    
    # Process the remaining lines and write them to the output file
    for line in input_file:
        line = line.strip()  # Remove leading/trailing whitespace and newline characters
        translated_line = translate_text(line, 'english', detected_language)
        output_file.write(translated_line + '\n')
