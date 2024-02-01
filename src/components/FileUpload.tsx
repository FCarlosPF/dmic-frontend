import React, { useEffect, useState } from "react";
import "./FileUpload.css";

interface FileUploadProps {
  onUpload: (responseValue: string) => void;
  stage: any;
  serial: string;
}

  const FileUpload: React.FC<FileUploadProps> = ({ onUpload, serial }) => {
  const [textInput, setTextInput] = useState<string>("");
  const [responseValue, setResponseValue] = useState<string | null>(null);


  useEffect(() => {
    setTextInput(serial);
    if(serial === "0"){
      setTextInput("");
    }
  }, [serial]);

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
  };

  const onUploads = async () => {
    try {

      if (textInput !== "0") {
        setResponseValue(textInput);
        onUpload(textInput);
        console.log("Número serial extraído (desde texto):", textInput);
      } else if (serial !== "0") {
        setResponseValue(serial);
        onUpload(serial);
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

export default FileUpload;