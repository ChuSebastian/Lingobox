# Speech to Text
Para poder traducir un audio, primero tenemos que pasarlo a texto, para posteriormente poder traducirlo.
Esta parte del proyecto se enfoca en esa parte.

# Whisper AI

Whisper AI es la mejor herramienta que existe en la actualidad para poder transcribir el audio a texto (y no solo eso).
OpenAI utilizó un modelo Transformer (2017) y una cantidad de 680 000 horas de audios transcritos para poder entrenar a Whisper. Dichos audios vienen en múltiples idiomas permitiéndonos entrenar un modelo que es multilenguaje. 

![image](https://github.com/ChuSebastian/Lingovox/assets/83739305/a837c536-f565-443b-b613-8ffce1d57ebd)


Una de las características más importantes de Whisper AI no es solo que es multilenguaje, sino que además es multitarea, pues no solo nos va a permitir transcribir nuestros audios, sino que además nos va a permitir traducir dichas transcripciones.

![image](https://github.com/ChuSebastian/Lingovox/assets/83739305/3fc6ef51-85f5-4fb0-9c76-7cbcfcdf7256)

## Resolución a posibles errores

**FileNotFoundError: [WinError 2] The system cannot find the file specified**
- https://stackoverflow.com/questions/73845566/openai-whisper-filenotfounderror-winerror-2-the-system-cannot-find-the-file
- https://www.geeksforgeeks.org/how-to-install-ffmpeg-on-windows/

## Fuentes

- https://github.com/openai/whisper/tree/main

- Santana, Carlos. [DotCSV]. (2022, 13 de noviembre). Whisper, el OÍDO más POTENTE de la Inteligencia Artificial (y Open Source!) [Video]. YouTube. https://www.youtube.com/watch?v=JuMEmF-2FsA
