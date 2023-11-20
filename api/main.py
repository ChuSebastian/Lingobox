from fastapi import FastAPI, UploadFile, File, Form
import shutil
from fastapi.middleware.cors import CORSMiddleware
import os
import json

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def to_wav(user, project):

    print("xd")

def lingo_speech_to_text(user, project):
    
    print("xd2")

def lingo_text_to_speech():
    
    print("xd3")

def transcribe_audio(file_path):
    with open(file_path, 'r') as archivo:
        result = json.load(archivo)

    transcriptions = []

    for i, segment in enumerate(result['segments']):
        speaker = result['segments'][i]['words'][0]['speaker']
        transcription = f'{segment["start"]} - {segment["end"]}: {segment["text"]} - {speaker}'
        transcriptions.append(transcription)

    return transcriptions

@app.post("/transcribe/")
async def transcribe_audio_endpoint(audio_file: UploadFile = File(...), metadata: str = Form(...)):
    
    metadata = eval(metadata)

    # Crear el directorio users si no existe
    if not os.path.exists("users"):
        os.mkdir("users")
    
    # Crear el directorio user_name si no existe dentro de users
    if not os.path.exists("users/Manuel"):
        os.mkdir("users/Manuel")
    
    # Crear el directorio proyect_name si no existe dentro de user_name
    if not os.path.exists("users/Manuel/Proyecto1"):
        os.mkdir("users/Manuel/Proyecto1")

    # Dentro de proyect_name crear el directorio input si no existe
    if not os.path.exists("users/Manuel/Proyecto1/input"):
        os.mkdir("users/Manuel/Proyecto1/input")
    
    if not os.path.exists("users/Manuel/Proyecto1/output"):
        os.mkdir("users/users/Manuel/Proyecto1/output")
    

    # En input guardar el archivo de audio y un info.json con la metadata
    prev_path = os.getcwd()

    # Crear el diccionario
    info_dict = {
        "lan_input": metadata["input_language"],
        "lan_output": metadata["output_language"],
        "input_dir": os.path.join(prev_path, "users", "Manuel", "Proyecto1", "input", audio_file.filename)
    }

    # Escribir el diccionario en el archivo JSON
    with open("users/users/Manuel/Proyecto1/input/info.json", "w") as f:
        json.dump(info_dict, f, indent=2)

    # Guardar el archivo de audio
    with open("users/users/Manuel/Proyecto1/input/" + audio_file.filename, "wb") as buffer:
        shutil.copyfileobj(audio_file.file, buffer)

    
    
    #convertir a audio wav
    to_wav("Manuel", "Proyecto1")
    #Transcripción y Audio Segmentation by Speaker (ambos dentro de la carpeta input)
    lingo_speech_to_text("Manuel", "Proyecto1")
    

    # Ruta del archivo de transcripción
    transcription_file_path = os.path.join(prev_path, "users", "Manuel", "Proyecto1", "input", "transcription.json")

    # Transcribir el audio
    transcriptions = transcribe_audio(transcription_file_path)

    return {"transcriptions": transcriptions}

@app.post("/metadata/")
async def create_metadata(audio_file: UploadFile = File(...), metadata: str = Form(...)):

    lingo_speech_to_text("Manuel", "Proyecto1")
    
    return {"filename": audio_file.filename, "metadata": metadata}
