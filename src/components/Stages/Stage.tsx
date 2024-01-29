import { useEffect, useState } from "react";
import BarcodeScanner from "../BarCodeScanner";
import BarcodeScanner2 from "../BarCodeScanner2";
import FileUploadWrapper from "../FileUploadWrapper";
import { SearchChina, Search__USA_QRO } from "../Search/Search";
import "./Stage.css";



export const Stage = (props: { stage: string }) => {
  const stage = window.location.pathname;
  let catalogo = localStorage.getItem("catalogo");

  const [scannedBarcode1, setScannedBarcode1] = useState("");
  const [scannedBarcode2, setScannedBarcode2] = useState("");
  const [activateSecondScanner, setActivateSecondScanner] = useState(false);
  const [activateFirstScanner, setActivateFirstScanner] = useState(true);
  const [hasPermissions, setHasPermissions] = useState<null | true | false>(null);
  const [, setSearchSerial] = useState(0);

  /*const handleCamera = () => {
    Swal.fire({
      title: "Debes otorgar permiso para la camara ",
      showCancelButton: true,
      timer: 5000
    })

    return ""
  }*/

  function handleSearch(iqms: number) {
    console.log("iqms:", iqms);
    setSearchSerial(iqms);
  }

  useEffect(() => {
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

  const handleScan = (barcode: string) => {
    if (!scannedBarcode1) {
      setScannedBarcode1(barcode);
      console.log("codigoStage1" + barcode);
      setTimeout(() => {
        setActivateSecondScanner(true);
        setActivateFirstScanner(false);
      }, 2000);
    }
    /* console.log("second?", activateSecondScanner);
    console.log("first?", activateSecondScanner); */
  };

  const handleScan2 = (barcode: string) => {
    if (scannedBarcode1) {
      setScannedBarcode2(barcode);
      console.log("codigoStage2" + barcode);
      setActivateSecondScanner(false);
      setActivateFirstScanner(true);
    }
   /*  console.log("second->", activateSecondScanner);
    console.log("first->", activateSecondScanner); */
  };

  return (
    <div>
      <main className="incoming">
        <section>
        {stage != "/embarque" && (
          <>
          <h3 className="step-title">Búsqueda del producto</h3>
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
          </>
)}
        </section>
        <section>
          <h3 className="step-title">Escanear con el codigo de barras</h3>
          {hasPermissions && activateFirstScanner && <BarcodeScanner onScan={handleScan} />}
          {scannedBarcode1 ? (
            <p>
              Producto encontrado con el código de barras: {scannedBarcode1}
            </p>
          ) : (
            <p>Aún no ha escaneado un código de barras.</p>
          )}
          {hasPermissions && activateSecondScanner && <BarcodeScanner2 onScan={handleScan2} />}
          {/* {scannedBarcode2 ? (
            <p>
              Producto encontrado con el segundo código de barras:{" "}
              {scannedBarcode2}
            </p>
          ) : (
            <p>Aún no ha escaneado el segundo código de barras.</p>
          )} */}
        </section>

        <section>
          <h3 className="step-title">Comparar </h3>
          <FileUploadWrapper
            stage={props.stage}
            scannedBarcode1={scannedBarcode1}
            scannedBarcode2={scannedBarcode2}
          />
        </section>
      </main>
    </div>
  );
};
