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

def translate_text(text, dest_language):
    try:
        print(detect_language(text))
        translator = Translator(from_lang=languages[detect_language(text)],to_lang=dest_language)
        return translator.translate(text)
    except:
        return 'Error en la traduccion'
    
txt = input('Ingrese el texto a traducir: ')
output = translate_text(txt,'english')
print(output)