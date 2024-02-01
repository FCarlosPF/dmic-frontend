import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import FileUpload from "./FileUpload";
import FileUpload2 from "./FileUpload2";

const FileUploadWrapper = (props: {
  stage: any;
  iqms_serial: string;
}) => {
  console.log(props.stage)
  //const navigate = useNavigate();


 // const [responseValues, setResponseValues] = useState<string[]>([]);
  //const [scannedCode1, setScannedCode1] = useState<string>("");
  //const [scannedCode2, setScannedCode2] = useState<string>("");

  const [responseValues1, setResponseValues1] = useState<string[]>([]);
  const [responseValues2, setResponseValues2] = useState<string[]>([]);
  const [, setSearchSerial] = useState<string>("");


  const onFileUpload1 = (responseValue: string) => {
    setResponseValues1([responseValue]);
  };
  
  const onFileUpload2 = (responseValue: string) => {
    setResponseValues2([responseValue]);
  };

  /* const handleUpload1 = (scannedCode1: string) => {
 
     setScannedCode1(scannedCode1);
     console.log("serial 1 " + scannedCode1);
   };
 
   const handleUpload2 = (scannedCode2: string) => {
 
     setScannedCode2(scannedCode2);
     console.log("serial 2 " + scannedCode2);
   };*/


  /*useEffect(() => {
    if (!scannedCode1) {
      setScannedCode1(props.scannedBarcode1);
    } else {
      console.log("scanner1-> " + scannedCode1);
    }
  }, [scannedCode1, props.scannedBarcode1]);*/

  useEffect(() => {
    console.log("IqmsWrapper-> " + props.iqms_serial);
    console.log(" responseValues[0]: " + responseValues1[0]);
    console.log(" responseValues[1]: " + responseValues2[1]);
    console.log("lenght1: " + responseValues1.length);
    console.log("lenght2: " + responseValues2.length);
    setSearchSerial(props.iqms_serial);
  }, [props.iqms_serial]);

 
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

  /*const renderVerificationResult = () => {
    if (scannedCode1 && scannedCode2 != null) {
     if (scannedCode1 === scannedCode2) { 
    if (responseValues.length === 2 &&
      responseValues[0] === responseValues[1]) {

      return (
        <>
          <p style={{ fontSize: "larger" }}>
            Los valores coinciden: {scannedCode1}</p>*/

  const renderVerificationResult = () => {
    if (
      responseValues1.length > 0 &&
      responseValues2.length > 0 &&
      responseValues1[0] === responseValues2[0]
    ) {
      return (
        <>
          <p style={{ fontSize: "larger" }}>
            Los valores coinciden: {responseValues1[0]}
          </p>
          <Link to={`/etiqueta/${props.stage}`}>
            <button className="print-button">Imprimir Etiqueta</button>
          </Link>
        </>
      );
    } else if (
      responseValues1.length > 0 &&
      responseValues2.length > 0 &&
      responseValues1[0] !== responseValues2[0]
    ) {

      setResponseValues2(prevValues => prevValues.slice(1));

      console.log("error responseValues1[0]: " + responseValues1[0]);
      console.log("error responseValues1[1]: " + responseValues1[1]);
      console.log("error responseValues2[0]: " + responseValues2[0]);
      console.log("error responseValues2[1]: " + responseValues2[1]);
      console.log("lenght: " + responseValues1.length);

      Swal.fire({
        title: "Validación erronea",
        text: "Los seriales no coinciden o no han ingresado los dos codigos",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div>
      <FileUpload
        onUpload={(responseValue) => onFileUpload1(responseValue)}
        serial={props.iqms_serial}
      />
      <hr />
      <FileUpload2
        onUpload={(responseValue) => onFileUpload2(responseValue)}
      />
      {renderVerificationResult()}
    </div>
  );
};

export default FileUploadWrapper;
