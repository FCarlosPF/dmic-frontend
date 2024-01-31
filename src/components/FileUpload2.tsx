import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FileUpload.css";

interface FileUploadProps2 {
  onUpload: (responseValue: string) => void;
}

const FileUpload2: React.FC<FileUploadProps2> = ({ onUpload }) => {
  const stage = window.location.pathname;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState<string>("");
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
        formData.append("image", selectedFile);

        const response = await axios.post<string>(
          "http://localhost:3000/images/detect-text",
          formData
        );

        setResponseValue(response.data);
        onUpload(response.data);
        setTextInput(response.data);
        console.log("Número serial extraído:", response.data);
      } else if (textInput && textInput!=="0") {
        // Handle text input verification
        setResponseValue(textInput);
        onUpload(textInput);
        console.log("Número serial extraído (desde texto):", textInput);
      
      } else {
        console.error(
          "No se ha seleccionado ningún archivo ni se ha ingresado texto."
        );
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error);
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
        console.log("borado serial extraído (desde texto)");
      } else {
        console.error(
          "No se ha seleccionado ningún archivo ni se ha ingresado texto."
        );
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error);
    }
  };

  function renderInputFile() {
    return <input type="file" onChange={onFileChange} />;
  }

  return (
    <div>
      {stage === "/embarque" && (
        <>
          {renderInputFile()}
          <>
            <br></br>
            <br></br>
            <div className="input-buttons">
              <input type="text" value={textInput} onChange={onTextChange} />
              <div className="container-buttons">
                <button className="upload-button" onClick={onUploads}>
                  Subir Archivo
                </button>
                <button className="clear-button" onClick={onUploadsLimpiar}>
                  Limpiar
                </button>
              </div>
            </div>

            {/* {errorState && <><button onClick={handleCleanFile}>Limpiar</button></>} */}
            {responseValue && <p>Valor retornado: {responseValue}</p>}
          </>
        </>
      )}

      {(stage === "/incoming" || stage === "/empaquetado") && (
        <>
          {/* <button onClick={() => setTextBarInput(code)}>Establecer código escaneado</button>    */}
          <input
            className="file-input"
            type="text"
            value={textInput}
            onChange={onTextChange}
          />
          <button className="upload-button" onClick={onUploads}>
            Verificar Texto
          </button>
          <button className="clear-button" onClick={onUploadsLimpiar}>
            Limpiar
          </button>
          {/* {errorState && <><button onClick={handleCleanText}>Limpiar</button></>} */}
          {responseValue && <p>Valor retornado: {responseValue}</p>}
        </>
      )}
    </div>
  );
};

export default FileUpload2;
