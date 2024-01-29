import { useEffect, useState } from "react";
import BarcodeScanner from "../BarCodeScanner";
import FileUploadWrapper from "../FileUploadWrapper";
import { SearchChina, Search__USA_QRO } from "../Search/Search";
import "./Stage.css";



export const Stage = (props: { stage: string }) => {
  let catalogo = localStorage.getItem("catalogo");

  const [scannedBarcode, setScannedBarcode] = useState("")
  const [, setSearchSerial] = useState(0)
  const [hasPermissions, setHasPermissions] = useState<null | true | false>(null);

  function handleSearch(iqms: number) {
    console.log("iqms:", iqms);
    setSearchSerial(iqms);
  }



  const handleScan = (barcode: string) => {
    setScannedBarcode(barcode);
  };






<<<<<<< Updated upstream
 useEffect(() => {
=======
  useEffect(() => {
>>>>>>> Stashed changes
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        console.log(stream)
        setHasPermissions(true);
      })
      .catch((error) => {
        setHasPermissions(false);
        console.error(error);
      });
  }, []);


 /*const handleCamera = () => {
    Swal.fire({
      title: "Debes otorgar permiso para la camara ",
      showCancelButton: true,
      timer: 5000
    })

    return ""
  }*/



  return (
    <div>
      <main className="incoming">
        <section>
          <h3 className="step-title">1. Busqueda del producto </h3>
          {catalogo == "China" ? (
            <SearchChina
              onSearch={handleSearch}
              iqms_aka={0}
              iqms_dg={0}
              molde={""}
              imagen={""}
            />
          ) : (
            <Search__USA_QRO
              onSearch={handleSearch}
              iqms1={0}
              iqms2={0}
              iqms3={0}
              familia={""}
              molde1={""}
              molde2={""}
              foto={""}
            />
          )}
        </section>
        <section>
          <h3 className="step-title">2. Escanear con el codigo de barras</h3>
        
<<<<<<< Updated upstream
       { hasPermissions &&
            <BarcodeScanner onScan={handleScan} />
       }
=======
        { hasPermissions &&
            <BarcodeScanner onScan={handleScan} />
        }
          
>>>>>>> Stashed changes
          <p>
            Producto encontrado con el código de barras:
            {scannedBarcode}
          </p>

        </section>

        <section>
          <h3 className="step-title">4. Copiar los seriales </h3>

          <p>
            <strong>
              Serial encontrado con el scanner de código de barras :{" "}
            </strong>
            {scannedBarcode
              ? scannedBarcode
              : "Aún no ha escaneado un código de barras."}
          </p>
        </section>
        <section>
          <h3 className="step-title">5. Comparar </h3>
          <FileUploadWrapper stage={props.stage} />
        </section>
      </main>
    </div>
  );
};
