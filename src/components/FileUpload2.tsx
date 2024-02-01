import React, { useState } from "react";
import "./FileUpload.css";

interface FileUploadProps2 {
  onUpload: (responseValue: string) => void;
}

const FileUpload2: React.FC<FileUploadProps2> = ({ onUpload }) => {


  const [textInput, setTextInput] = useState<string>("");
  const [responseValue, setResponseValue] = useState<string | null>(null);


  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
  };

  const onUploads = async () => {
    try {
      if (textInput && textInput !== "0") {
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
      if (textInput) {

        setResponseValue("");
        onUpload("");
        setTextInput("");
        console.log("borrado serial extraído (desde texto)");
      } else {
        console.error(
          "No se ha seleccionado ningún archivo ni se ha ingresado texto."
        );
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error);
    }
  };

  

  return (
    <section className="comparison">
      <div className="input-buttons">
        <input type="text" value={textInput} onChange={onTextChange} />

        <button className="upload-button" onClick={onUploads}>
          Verificar
        </button>
        <button className="clear-button" onClick={onUploadsLimpiar}>
          Limpiar
        </button>

      </div>
      {responseValue && <p>Valor retornado: {responseValue}</p>}
    </section>
  );
};

export default FileUpload2;