import { useEffect, useState } from "react";
import BarcodeScanner from "../BarCodeScanner";
import BarcodeScanner2 from "../BarCodeScanner2";
import FileUploadWrapper from "../FileUploadWrapper";
import { Search__USA_QRO, SearchChina } from "../Search/search";
import "./Stage.css";

export const Stage = (props: { stage: string }) => {
  const stage = window.location.pathname;
  let catalogo = localStorage.getItem("catalogo");


  const [searchSerial, setSearchSerial] = useState(0);

  function handleSearch(iqms: number, iqms_dg: number) {
    console.log("iqms->", iqms);
    console.log("iqms_dg->", iqms_dg);
    setSearchSerial(iqms);
  }
   useEffect(() => {
    console.log("searchSerial updated:", searchSerial);
  }, [searchSerial]);

  

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
          <h3 className="step-title">Comparar </h3>
          <FileUploadWrapper
            stage={props.stage}
            iqms_serial={searchSerial.toString()}
          />
        </section>
      </main>
    </div>
  );
};
