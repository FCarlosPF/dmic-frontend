import { useEffect, useState } from "react";
import BarcodeScanner from "../BarCodeScanner";
import FileUploadWrapper from "../FileUploadWrapper";
import { Search__USA_QRO, SearchChina } from "../Search/search";
import "./Stage.css";

export const Stage = (props: { stage: string }) => {
  let catalogo = localStorage.getItem("catalogo");

  const [scannedBarcode, setScannedBarcode] = useState("");
  const [, setSearchSerial] = useState(0);

  function handleSearch(iqms: number) {
    console.log("iqms:", iqms);
    setSearchSerial(iqms);
  }

  const handleScan = (barcode: string) => {
    // Aquí puedes manejar la respuesta del servidor
    // Por ejemplo, puedes hacer una solicitud al backend para obtener más información sobre el producto

    // Supongamos que tu API devuelve un objeto con la información del producto

    console.log(barcode);
    setScannedBarcode(barcode);

    /*fetch(`http://localhost:3000/catalogoChina/iqms/${barcode}`)
      .then((response) => response.json())
      .then((product) => {
        console.log('Producto encontrado:', product);
        setScannedBarcode(barcode);
        // Realiza las acciones necesarias con la información del producto
      })
      .catch((error) => {
        console.error('Error al obtener el producto:', error);
        setScannedBarcode("");
      });*/
  };

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

          <BarcodeScanner onScan={handleScan} />
          {scannedBarcode ? (
            <p>
              Producto encontrado con el código de barras:
              {scannedBarcode}
            </p>
          ) : (
            <p>Aún no ha escaneado un código de barras.</p>
          )}
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
