import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import FileUpload from './FileUpload';


const FileUploadWrapper = (props: { stage: any; }) => {
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
          <Link to={`/etiqueta/${props.stage}`}>
            <button className="print-button">Imprimir Etiqueta</button>
          </Link>
        </>
      )
    } else
      if (responseValues.length === 2 && responseValues[0] != responseValues[1]) {
        Swal.fire({
          title: "Validación erronea",
          text: "Los seriales no coinciden o no han ingresado los dos codigos",
          icon: "warning",
          confirmButtonColor: "#3085d6",
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
