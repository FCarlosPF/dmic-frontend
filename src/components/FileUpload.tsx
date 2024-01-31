import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./FileUpload.css";
import "./components.css";

interface FileUploadProps {
  onUpload: (responseValue: string) => void;
  scannedCode: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload, scannedCode }) => {
  //const stage = window.location.hash.substring(1);
  const stage = window.location.pathname;
  console.log(stage)

  const [selectedFile, ] = useState<File | null>(null);
  const [textInput, setTextInput] = useState<string>('');
  const [code, setTextBarInput] = useState<string>('');
  const [responseValue, setResponseValue] = useState<string | null>(null);


  /*const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };*/

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
    onUpload(event.target.value)
  };
  const onTextBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextBarInput(event.target.value);
  };


  const onUploads = async () => {
    try {

      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);

        const response = await axios.post<string>('http://localhost:3000/images/detect-text', formData);

        setResponseValue(response.data);
        onUpload(response.data);
        setTextInput(response.data);
        console.log('Número serial extraído:', response.data);
      } else if (textInput) {
        // Handle text input verification
        setResponseValue(textInput);
        onUpload(textInput);
        console.log('Número serial extraído (desde texto):', textInput);
      } else if (code) {
        setResponseValue(code);
        onUpload(code);
        console.log('Codigo de barras escanneado:', code);
      } else {
        console.error('No se ha seleccionado ningún archivo ni se ha ingresado texto.');
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
  };
  const onUploadsLimpiar = async () => {
    try {
      if (selectedFile) {

        setResponseValue("");
        onUpload("");
        setTextInput("");
      } else if (textInput) {
        // Handle text input verification
        setResponseValue("");
        onUpload("");
        setTextInput("");
        console.log('borrado serial extraído (desde texto)');
      } else if (code) {
        setResponseValue("");
        onUpload("");
        setTextBarInput("");
        console.log('borrado Codigo de barras escanneado:');
      } else {
        console.error('No se ha seleccionado ningún archivo ni se ha ingresado texto.');
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
  };

  /*function renderInputFile() {
    return (
      <input className='input-file' type="file" onChange={onFileChange} />
    )
  }*/

  useEffect(() => {
    if (!code) {

      setTextBarInput(scannedCode);
    }
    console.log("codigoFile-> " + code);

  }, [code, scannedCode]);



  return (
    <div>

      {stage === "/embarque" && (
        <>
          
          <>
            <br></br>
            <br></br>
            <div className='input-buttons'>
              <input className='input-file' type="text" value={textInput} onChange={onTextChange} />


              <input type="text" value={textInput} onChange={onTextChange} />
              <div className='container-buttons'>
                <button className="upload-button" onClick={onUploads}>Subir Archivo</button>
                <button className="clear-button" onClick={onUploadsLimpiar}>Limpiar</button>

              </div>
            </div>
            {responseValue && <p>Valor retornado: {responseValue}</p>}
          </>
        </>
      )}

      {(stage === "/incoming" || stage === "/empaquetado") && (
        <>
          <input className='input-file' type="text" value={code} onChange={onTextBarChange} />
          <button className="upload-button btn-file" onClick={onUploads}>Verificar Texto</button>
          <button className="clear-button" onClick={onUploadsLimpiar}>Limpiar</button>
          {responseValue && <p>Valor retornado: {responseValue}</p>}
        </>
      )}

    </div >
  );
};

export default FileUpload;
