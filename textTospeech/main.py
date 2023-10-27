from gtts import gTTS
from playsound import playsound
import os

# Specify the path to your text file
file_path = "input"

# Read the contents of the text file
with open(file_path, 'r', encoding='utf-8') as file:
    text = file.read()

language = 'es-us'

tts = gTTS(text, lang=language, slow=False)

tts.save("output.mp3")

# Play the generated audio
playsound("output.mp3")
