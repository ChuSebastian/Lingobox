from fastapi import FastAPI, UploadFile, File, Form
import shutil
from fastapi.middleware.cors import CORSMiddleware
import os

from pydub import AudioSegment
import json
import whisperx
import torch
import moviepy.editor as mpy
import subprocess
import torch

ruta_actual = os.getcwd()



app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/metadata/")
async def create_metadata(audio_file: UploadFile = File(...), metadata: str = Form(...)):
    
    '''################################################METODOS QUE SE LLAMAN CUANDO LE HACES CLICK AL BOTON SUBMIT##########################################################################'''


    '''Creacion de las carpetas users, username, project, input, output. Ademas de generar los archivos info.json e insertar el archivo de audio dentro de la carpeta input'''
    
    # metadata es un string tal que: {"user_name":"fernando","proyect_name":"proy1","input_language":"es","output_language":"en"}, necesito convertirlo a json:
    metadata = eval(metadata)
    
    print(metadata["user_name"])
    print(metadata["proyect_name"])
    print(metadata["input_language"])
    print(metadata["output_language"])

    # Crear el directorio users si no existe
    if not os.path.exists("users"):
        os.mkdir("users")

    # Crear el directorio user_name si no existe dentro de users
    if not os.path.exists("users/" + metadata["user_name"]):
        os.mkdir("users/" + metadata["user_name"])

    # Crear el directorio proyect_name si no existe dentro de user_name
    if not os.path.exists("users/" + metadata["user_name"] + "/" + metadata["proyect_name"]):
        os.mkdir("users/" + metadata["user_name"] + "/" + metadata["proyect_name"])

    # Dentro de proyect_name crear el directorio input si no existe
    if not os.path.exists("users/" + metadata["user_name"] + "/" + metadata["proyect_name"] + "/input"):
        os.mkdir("users/" + metadata["user_name"] + "/" + metadata["proyect_name"] + "/input")
    
    if not os.path.exists("users/" + metadata["user_name"] + "/" + metadata["proyect_name"] + "/output"):
        os.mkdir("users/" + metadata["user_name"] + "/" + metadata["proyect_name"] + "/output")
    

    # En input guardar el archivo de audio y un info.json con la metadata
    prev_path = os.getcwd()

    # Crear el diccionario
    info_dict = {
        "lan_input": metadata["input_language"],
        "lan_output": metadata["output_language"],
        "input_dir": os.path.join(prev_path, "users", metadata["user_name"], metadata["proyect_name"], "input", audio_file.filename)
    }

    # Escribir el diccionario en el archivo JSON
    with open("users/" + metadata["user_name"] + "/" + metadata["proyect_name"] + "/input/info.json", "w") as f:
        json.dump(info_dict, f, indent=2)

    # Guardar el archivo de audio
    with open("users/" + metadata["user_name"] + "/" + metadata["proyect_name"] + "/input/" + audio_file.filename, "wb") as buffer:
        shutil.copyfileobj(audio_file.file, buffer)

    
    
    #convertir a audio wav
    to_wav(metadata["user_name"], metadata["proyect_name"])
    #Transcripción y Audio Segmentation by Speaker (ambos dentro de la carpeta input)
    lingo_speech_to_text(metadata["user_name"], metadata["proyect_name"])


    '''################################################METODOS QUE SE LLAMAN CUANDO LE HACES CLICK AL BOTON TRADUCIR##########################################################################'''


    #Este metodo sera activado cuando le demos a traducir
    lingo_text_to_speech()


    # Resto del código para procesar los datos del formulario...
    return {"filename": audio_file.filename, "metadata": metadata}


