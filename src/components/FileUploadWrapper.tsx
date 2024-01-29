import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import FileUpload from './FileUpload';


const FileUploadWrapper = (props: { stage: any; scannedBarcode1: string ; scannedBarcode2: string }) => {
  const navigate = useNavigate();

  const [responseValues, setResponseValues] = useState<string[]>([]);
  const [scannedCode1, setScannedCode1] = useState<string>("");
  const [scannedCode2, setScannedCode2] = useState<string>("");

  const onFileUpload = (responseValue: string) => {
    setResponseValues(prevValues => [...prevValues, responseValue]);
  };
  useEffect(() => {
    if (!scannedCode1) {
      setScannedCode1(props.scannedBarcode1);
    } else {
      console.log("scanner1-> " + scannedCode1);
    }
  }, [scannedCode1, props.scannedBarcode1]);
  
  useEffect(() => {
    if (!scannedCode2) {
      setScannedCode2(props.scannedBarcode2);
    } else {
      console.log("scanner2-> " + scannedCode2);
    }
  }, [scannedCode2, props.scannedBarcode2]);
  

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
        });
      }
  };

  return (
    <div>
      <FileUpload
  onUpload={(responseValue) => onFileUpload(responseValue)}
  identifier="1"
  scannedCode={scannedCode1}
/>
<hr />
<FileUpload
  onUpload={(responseValue) => onFileUpload(responseValue)}
  identifier="2"
  scannedCode={scannedCode2}
/>
      {renderVerificationResult()}
    </div>
  );
};

export default FileUploadWrapper;
