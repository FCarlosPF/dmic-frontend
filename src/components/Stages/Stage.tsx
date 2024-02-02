import { useEffect, useState } from "react";
import FileUploadWrapper from "../FileUploadWrapper";
import { SearchChina, Search__USA_QRO } from "../Search/Search";
import "./Stage.css";
import { Link } from "react-router-dom";

export const Stage = (props: { stage: string }) => {
  const stage = window.location.pathname;
  const stage1 = window.location.hash.substring(1);
  console.log(stage, stage1);
  let catalogo = localStorage.getItem("catalogo");

  const [searchSerial, setSearchSerial] = useState(0);

  function handleSearch(iqms: number, iqms_dg: number) {
    console.log("iqms->", iqms);
    console.log("iqms_dg->", iqms_dg);
    setSearchSerial(iqms);
  }
  
  
  
  useEffect(() => {
    console.log("searchSerial updated: " + searchSerial);
    console.log("Props stage: " + props.stage);
    console.log("catalogolocalstage: " + catalogo);
  }, [searchSerial]);

  /*useEffect(() => {
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
    console.log("second?", activateSecondScanner);
    console.log("first?", activateSecondScanner); 
  };

   const handleScan2 = (barcode: string) => {
    if (scannedBarcode1) {
      setScannedBarcode2(barcode);
      console.log("codigoStage2" + barcode);
      setActivateSecondScanner(false);
      setActivateFirstScanner(true);
    }
  };*/

  return (
    <div>
      <main className="incoming">
        {props.stage != "Embarque" && (
          <section>
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
          </section>
        )}
        <section>
          {/*<h3 className="step-title">Escanear con el codigo de barras</h3>
          {activateFirstScanner && <BarcodeScanner onScan={handleScan} />}
          {scannedBarcode1 ? (
            <p>
              Producto encontrado con el código de barras: {scannedBarcode1}
            </p>
          ) : (
            <p>Aún no ha escaneado un código de barras.</p>
          )}
          { activateSecondScanner && <BarcodeScanner2 onScan={handleScan2} />}
          {scannedBarcode2 ? (
            <p>
              Producto encontrado con el segundo código de barras:{" "}
              {scannedBarcode2}
            </p>
          ) : (
            <p>Aún no ha escaneado el segundo código de barras.</p>
          )} */}
        </section>

        <section>
          
          {props.stage == "Incoming" && (
            <>
              <h3 className="step-title">Comparar </h3>
              <FileUploadWrapper
                stage={props.stage}
                iqms_serial={(searchSerial ?? "0").toString()}
              />
            </>
          )}

          {props.stage == "Embarque" && (
            <>
              <h3 className="step-title">Comparar </h3>
              <FileUploadWrapper
                stage={props.stage}
                iqms_serial={(searchSerial ?? "0").toString()}
              />
            </>
          )}
        </section>
      </main>
    </div>
  );
};
