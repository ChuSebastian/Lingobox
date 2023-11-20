"use client";

import React, { useState, useEffect } from 'react';
import './page.css';

function Page() {
    const [language, set_language] = useState('es'); // output language
    const [audio_file, set_audio_file] = useState(null); // audio file
    const [output_audio_file, set_output_audio_file] = useState(null); // output audio file
    const [text, set_text] = useState('speech to text'); // text of the audio file (speech to text)
    const [audio_file_uploaded, set_audio_file_uploaded] = useState(false); // audio file uploaded
    const [audio_file_translate, set_audio_file_translate] = useState(false); // audio file translate

    const handle_language_change = (event) => {
        set_language(event.target.value);
    }

    const handle_audio_upload = (event) => {
        const file = event.target.files[0]; // get the file
        set_audio_file(file); // set the file
        set_audio_file_uploaded(false); // set the audio_file_uploaded to false
        set_audio_file_is_loaded(false); // set the audio_file_is_loaded to false
    }

    const handle_submit_upload = (event) => {
        event.preventDefault();
        set_audio_file_uploaded(true); // set the audio_file_uploaded to true
    }
    useEffect(() => {
        if (audio_file_uploaded) {
            /*const formData = new FormData();
            formData.append('audio_file', audio_file);
            try {
                const response = fetch('http://localhost:8000/upload/', {
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error('Error to send audio file');
                }
                // Update the text of the audio file (speech to text)
                set_text(response.text);

            } catch (error) {
                console.error('Error:', error);
            }*/
            console.log("audio file uploaded");
        }
    }, [audio_file_uploaded]);

    const handle_submit_play = async (event) => {
        event.preventDefault();
        
        form = new FormData();
        form.append('language', language);
        form.append('audio_file', audio_file);

        try {
            const response = await fetch('http://localhost:8000/play/', {
                method: 'POST',
                body: form,
            });
            if (!response.ok) {
                throw new Error('Error to play audio file');
            }
            const output_audio_file = await response.blob();
            set_output_audio_file(output_audio_file);
            set_audio_file_translate(true);
        } catch (error) {
            console.error('Error:', error);
        }
        audio_file_translate(true);
        console.log("audio file translated");
        /**
         * 1. Enviar el audio_file y el language al servidor (ya hecho)
         * 2. Recibir el audio_file traducido (ya hecho)
         * 3. Descargar el audio_file traducido
         * 
         * basicamente el cambio de Translate a Download
         */
        /* carlos
    const handle_submit_play = async (event) => {
        event.preventDefault();

        const form = new FormData();
        form.append('language', language);
        form.append('audio_file', audio_file);

        try {
            const response = await fetch('http://localhost:8000/play/', {
                method: 'POST',
                body: form,
            });
            if (!response.ok) {
                throw new Error('Error to play audio file');
            }
            const output_audio_file = await response.blob();
            set_output_audio_file(output_audio_file);
            set_audio_file_translate(true);
        } catch (error) {
            console.error('Error:', error);
        }
    }

        */
    }
    useEffect(() => {
        if (audio_file_translate) {
            /*const audio_url = URL.createObjectURL(output_audio_file);
            const new_audio_element = new Audio(audio_url);
            set_audio_element(new_audio_element);*/
            console.log("audio file translated");
        }
    }, [audio_file_translate]);

    return (
        <div>
            <header> {/* title */}
                <h1>Lingovox</h1>
            </header>
            <main> {/* forms */}
                <form className="upload-class" onSubmit={handle_submit_upload}>
                    <input type="file"
                        accept="audio/*"
                        onChange={handle_audio_upload}
                    />
                    <textarea name="text"
                        placeholder={text} readOnly>
                    </textarea>
                    <button type="submit">Upload</button>
                </form>
                <form className="play-class" onSubmit={handle_submit_play}>
                    <select value={language} onChange={handle_language_change}>
                        <option value="es">Spanish</option>
                        <option value="en">English</option>
                        <option value="pt">Portuguese</option>
                        <option value="fr">French</option>
                    </select>
                    {audio_file_translate ? // swap the Translate button to Download button
                        <button type="submit">Download</button>
                        :
                        <button type="submit">Translate</button>}
                </form>
            </main>
        </div>
    );
}

export default Page;

/*
<Select
        labelId="inputLanguage-label"
        id="inputLanguage"
        value={inputLanguage}
        onChange={handleInputLanguageChange}
      >
        <MenuItem value="es">Español</MenuItem>
        <MenuItem value="en">Inglés</MenuItem>
        <MenuItem value="pt">Portugués</MenuItem>
        <MenuItem value="fr">Francés</MenuItem>
      </Select>
const handle_user_name_change = (event) => {
        set_user_name(event.target.value);
    }

    const handle_proyect_name_change = (event) => {
        set_proyect_name(event.target.value);
    }

    const handle_audio_upload = (event) => {
        console.log(event.target.files);
        const file = event.target.files[0];
        set_audio_file(file);

        const audio_url = URL.createObjectURL(file);
        const new_audio_element = new Audio(audio_url);
        set_audio_element(new_audio_element);
    };

    const handle_input_language_change = (event) => {
        set_selected_input_language(event.target.value);
    };

    const handle_output_language_change = (event) => {
        set_selected_output_language(event.target.value);
    };

    const toggle_play = () => {
        if (audio_element) {
            if (is_playing) {
                audio_element.pause();
            } else {
                audio_element.play();
            }
            set_is_playing(!is_playing);
        }
    }

    /*const handle_submit = (event) => {
        event.preventDefault();
        //console.log(user_name);
        //console.log(audio_file);
        //console.log(selected_input_language);
        //console.log(selected_output_language);

        const metadata = {
            user_name: user_name,
            proyect_name: proyect_name,
            input_language: selected_input_language,
            output_language: selected_output_language,
            file_name: audio_file.name,
        };
        console.log(metadata);
    };
    const handle_submit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('audio_file', audio_file);
    
        const metadata = {
            user_name: user_name,
            proyect_name: proyect_name,
            input_language: selected_input_language,
            output_language: selected_output_language,
        };

        formData.append('metadata', JSON.stringify(metadata));
    
        try {
            const response = await fetch('http://127.0.0.1:8000/metadata/', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Error al enviar datos');
            }
            
            console.log('Datos enviados correctamente:');
        } catch (error) {
            console.error('Error:', error);
        }
    };
    "use client";

import React, { useState } from 'react';

function Page() {
    // 
    const [user_name, set_user_name] = useState('');
    const [proyect_name, set_proyect_name] = useState('');
    const [audio_file, set_audio_file] = useState(null);
    const [audio_element, set_audio_element] = useState(null);
    const [is_playing, set_is_playing] = useState(false);
    const [selected_input_language, set_selected_input_language] = useState('es');
    const [selected_output_language, set_selected_output_language] = useState('en');

    const handle_user_name_change = (event) => {
        set_user_name(event.target.value);
    }

    const handle_proyect_name_change = (event) => {
        set_proyect_name(event.target.value);
    }

    const handle_audio_upload = (event) => {
        console.log(event.target.files);
        const file = event.target.files[0];
        set_audio_file(file);

        const audio_url = URL.createObjectURL(file);
        const new_audio_element = new Audio(audio_url);
        set_audio_element(new_audio_element);
    };

    const handle_input_language_change = (event) => {
        set_selected_input_language(event.target.value);
    };

    const handle_output_language_change = (event) => {
        set_selected_output_language(event.target.value);
    };

    const toggle_play = () => {
        if (audio_element) {
            if (is_playing) {
                audio_element.pause();
            } else {
                audio_element.play();
            }
            set_is_playing(!is_playing);
        }
    }

    /*const handle_submit = (event) => {
        event.preventDefault();
        //console.log(user_name);
        //console.log(audio_file);
        //console.log(selected_input_language);
        //console.log(selected_output_language);

        const metadata = {
            user_name: user_name,
            proyect_name: proyect_name,
            input_language: selected_input_language,
            output_language: selected_output_language,
            file_name: audio_file.name,
        };
        console.log(metadata);
    };
    const handle_submit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('audio_file', audio_file);
    
        const metadata = {
            user_name: user_name,
            proyect_name: proyect_name,
            input_language: selected_input_language,
            output_language: selected_output_language,
        };

        formData.append('metadata', JSON.stringify(metadata));
    
        try {
            const response = await fetch('http://127.0.0.1:8000/metadata/', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Error al enviar datos');
            }
            
            console.log('Datos enviados correctamente:');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1 class="title">LINGOVOX</h1>
            <form onSubmit={handle_submit}>
                <div>
                    <h2 class="names">Username</h2>
                    <input
                        type="text"
                        value={user_name}
                        onChange={handle_user_name_change}
                    />
                </div>
                <div>
                    <h2 class="names">Proyect Name</h2>
                    <input
                        type="text"
                        value={proyect_name}
                        onChange={handle_proyect_name_change}
                    />
                </div>
                <div>
                    <h2>Audio File</h2>
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={handle_audio_upload}
                    />
                    <button type="button" onClick={toggle_play}>{is_playing ? 'Pause' : 'Play'}</button>
                </div>
                <div>
                    <h2>Input Language</h2>
                    <select value={selected_input_language} onChange={handle_input_language_change}>
                        <option value="es">Spanish</option>
                        <option value="en">English</option>
                        <option value="pt">Portuguese</option>
                        <option value="fr">French</option>
                    </select>
                </div>
                <div>
                    <h2>Output Language</h2>
                    <select value={selected_output_language} onChange={handle_output_language_change}>
                        <option value="es">Spanish</option>
                        <option value="en">English</option>
                        <option value="pt">Portuguese</option>
                        <option value="fr">French</option>
                        <option value="all">ALL</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Page;

*/