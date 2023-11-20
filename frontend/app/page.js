"use client";

import React, { useState, useEffect } from 'react';
import './page.css';

function Page() {
    const [language, set_language] = useState('es'); // output language
    const [audio_file, set_audio_file] = useState(null); // audio file
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
        set_audio_file_translate(false); // set the audio_file_is_loaded to false
    }

    const handle_submit_upload = (event) => {
        event.preventDefault();
        set_audio_file_uploaded(true); // set the audio_file_uploaded to true
    }
    useEffect(() => {
        if (audio_file_uploaded) {
            const formData = new FormData();
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
            }
        }
    }, [audio_file_uploaded]);

    const handle_submit_translate = async (event) => {
        event.preventDefault();
        
        form = new FormData();
        form.append('language', language);
        form.append('audio_file', audio_file);

        try {
            const response = await fetch('http://localhost:8000/translate/', {
                method: 'POST',
                body: form,
            });
            if (!response.ok) {
                throw new Error('Error to translate audio file');
            }
            const blob = await response.blob();

            // Simulate a mouse click:
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.click();

            set_audio_file_translate(true);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        if (audio_file_translate) { // reset the page
            set_audio_file(null);
            set_text('speech to text');
            set_audio_file_uploaded(false);
            set_audio_file_translate(false);
            set_language('es');
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
                <form className="translate-class" onSubmit={handle_submit_translate}>
                    <select value={language} onChange={handle_language_change}>
                        <option value="es">Spanish</option>
                        <option value="en">English</option>
                        <option value="pt">Portuguese</option>
                        <option value="fr">French</option>
                    </select>
                    <button type="submit">Translate</button>
                </form>
            </main>
        </div>
    );
}

export default Page;
