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

# WhisperX

Whisper es un modelo de reconocimiento automático de voz (ASR) desarrollado por OpenAI, entrenado en una amplia colección de grabaciones de audio variadas. Aunque ofrece transcripciones altamente precisas, las marcas de tiempo correspondientes se aplican a nivel de las frases habladas en lugar de a nivel de palabras, y pueden no ser exactas en varios segundos. Además, Whisper de OpenAI no tiene la capacidad incorporada de procesar varias transcripciones a la vez.

El proyecto WhisperX actualmente es el mejor modelo de audio a texto del mercado, y lo mejor de todo es que es Oper Source.

Han cogido el potentísimo modelo de transcripción de voz de OpenAI y han realizado los siguientes avances:

- 👉 x70 más rápido que Whisper!
- 👉 Te calcula timestamps por palabras (Alineación Forzada)!
- 👉 Detección del habla (VAD) y diarización!
- 👉 Alineaci[on forzada
- 👉 Open source y fácil de instalar.

La **Alineación Forzada** es el proceso en el cual las transcripciones escritas se alinean automáticamente con las grabaciones de audio, permitiendo una segmentación precisa a nivel de los sonidos individuales (fonemas).

La **Detección de Actividad de Voz (VAD)** consiste en detectar si hay presencia o ausencia de habla humana en una grabación de audio.

La **Diarización** de Oradores es el proceso de dividir una grabación de audio que contiene discurso humano en segmentos homogéneos, agrupados según la identidad de cada hablante en la conversación.

![image](https://github.com/ChuSebastian/Lingovox/assets/83739305/4fcd79d7-8b3c-4791-933a-42951618116f)

Por todas estas razones utilizaremos este modelo modificado de Whisper AI a comparación del orginal.

## Desventajas

Por desgracia el modelo WhisperX a pesar que es más preciso en la transcripción y además sus transcripciones no estan desfasadas en el tiempo, no posee la propiedad multitarea de además de transcribir también poder traducir.

A pesar de ello, esto no es una problemática al 100% ya que hay otras herramientas que nos van a ayudar para poder hacer traducciones eficientes.

## Notebook de prueba

https://colab.research.google.com/drive/1Icqzys3HsONWE47GS-MbzKYZe5-YvhbK?authuser=0#scrollTo=U5giMZv5Uppm

## Fuentes

- https://github.com/openai/whisper/tree/main
- https://github.com/m-bain/whisperX
- Santana, Carlos. [DotCSV]. (2022, 13 de noviembre). Whisper, el OÍDO más POTENTE de la Inteligencia Artificial (y Open Source!) [Video]. YouTube. https://www.youtube.com/watch?v=JuMEmF-2FsA
