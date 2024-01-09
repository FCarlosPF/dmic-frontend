import React, { useState } from 'react';
import FileUpload from './FileUpload'; // Asegúrate de proporcionar la ruta correcta al componente FileUpload
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";


const FileUploadWrapper: React.FC = () => {
  const navigate = useNavigate();

  const [responseValues, setResponseValues] = useState<string[]>([]);

  const onFileUpload = (responseValue: string) => {
    setResponseValues(prevValues => [...prevValues, responseValue]);
  };

  const renderVerificationResult = () => {
    if (responseValues.length === 2 && responseValues[0] === responseValues[1]) {
      return (
        <>
          <p>Los valores coinciden: {responseValues[0]}</p>
          <Link to='/etiquetaincoming'><button>Imprimir Etiqueta</button></Link>
        </>
      )
    } else
      if (responseValues.length === 2 && responseValues[0] != responseValues[1]) {
        Swal.fire({
          title: "Validación erronea",
          text: "Los seriales no coinciden o no han ingresado los dos codigos",
          icon: "warning",
          //showCancelButton: true,
          confirmButtonColor: "#3085d6",
          //cancelButtonColor: "#d33",
          //cancelButtonText: "Verificar",
          confirmButtonText: "Aceptar"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/catalogos')
          }
        });;
      }
  };

  return (
    <div>
      <FileUpload onUpload={onFileUpload} />
      <FileUpload onUpload={onFileUpload} />
      {renderVerificationResult()}
    </div>
  );
};

export default FileUploadWrapper;
