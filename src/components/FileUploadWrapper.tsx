import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import FileUpload from './FileUpload';



const FileUploadWrapper = (props: {
  stage: any;
  scannedBarcode1: string;
  scannedBarcode2: string;
}) => {
  console.log(props.stage)
  //const navigate = useNavigate();


  const [responseValues, setResponseValues] = useState<string[]>([]);
  const [scannedCode1, setScannedCode1] = useState<string>("");
  const [scannedCode2, setScannedCode2] = useState<string>("");



  const onFileUpload = (responseValue: string) => {
    setResponseValues((prevValues) => [...prevValues, responseValue]);
  };

  /* const handleUpload1 = (scannedCode1: string) => {
 
     setScannedCode1(scannedCode1);
     console.log("serial 1 " + scannedCode1);
   };
 
   const handleUpload2 = (scannedCode2: string) => {
 
     setScannedCode2(scannedCode2);
     console.log("serial 2 " + scannedCode2);
   };*/


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


  /*useEffect(() => {

    if (responseValues.length === 2 && responseValues[0] !== responseValues[1]) {
      setScannedCode1("");
      setScannedCode2("");
      setResponseValues([]);
      console.log("values 0 ->" + responseValues[0]);
      console.log("values 1 ->" + responseValues[1]);
      //setResponseValues((prevValues) => [...prevValues, responseValue]);
      console.log("Códigos limpios");
    }
  }, [responseValues]);
  */

  //console.log(responseValues, scannedCode1, scannedCode2)

  const renderVerificationResult = () => {
    /*if (scannedCode1 && scannedCode2 != null) {
     if (scannedCode1 === scannedCode2) { */
    if (responseValues.length === 2 &&
      responseValues[0] === responseValues[1]) {

      return (
        <>
          <p style={{ fontSize: "larger" }}>
            Los valores coinciden: {scannedCode1}
          </p>
          <Link to={`/etiqueta/${props.stage}`}>
            <button className="print-button">Imprimir Etiqueta</button>
          </Link>
        </>
      );
    } else if (
      responseValues.length === 2 &&
      responseValues[0] !== responseValues[1]
    ) {

      setResponseValues(prevValues => prevValues.slice(2));
      setScannedCode1("");
      setScannedCode2("");

      console.log("error responseValues[0]: " + responseValues[0]);
      console.log("error responseValues[1]: " + responseValues[1]);
      console.log("lenght: " + responseValues.length);

      Swal.fire({
        title: "Validación erronea",
        text: "Los seriales no coinciden o no han ingresado los dos codigos",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }

  }

  return (
    <div>
      <FileUpload
        onUpload={onFileUpload}
        scannedCode={scannedCode1}
      />
      <hr />
      <FileUpload
        onUpload={onFileUpload}
        scannedCode={scannedCode2}
      />
      {renderVerificationResult()}
    </div>
  );
};

export default FileUploadWrapper;
