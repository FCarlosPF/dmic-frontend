import React, { useState } from 'react';
import axios from 'axios';
import "./components.css"

interface FileUploadProps {
  onUpload: (responseValue: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const stage = window.location.pathname;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState<string>('');
  const [responseValue, setResponseValue] = useState<string | null>(null);


  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
  };

  const onUploads = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);

        const response = await axios.post<string>('http://localhost:3000/images/detect-text', formData);

        setResponseValue(response.data);
        onUpload(response.data);
        console.log('Número serial extraído:', response.data);
      } else if (textInput) {
        // Handle text input verification
        setResponseValue(textInput);
        onUpload(textInput);
        console.log('Número serial extraído (desde texto):', textInput);
      } else {
        console.error('No se ha seleccionado ningún archivo ni se ha ingresado texto.');
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
  };

  function renderInputFile() {
    return (
      <input className='input-file' type="file" onChange={onFileChange} />
    )
  }

  return (
    <div>
      {stage === "/embarque" && renderInputFile()}
      <hr />
      <input className='input-file' type="text" value={textInput} onChange={onTextChange} />
      <button className='btn-file' onClick={onUploads}>Subir Archivo o Verificar Texto</button>
      {responseValue && <p>Valor retornado: {responseValue}</p>}
    </div>
  );
};

export default FileUpload;
