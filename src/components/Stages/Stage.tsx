import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FileUploadWrapper from "../FileUploadWrapper";
import { SearchChina, Search__USA_QRO } from "../Search/Search";
import "./Stage.css";


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
  const verificarEmbarque = () => {
    if (searchSerial !== 0 ) {
      console.log(`/etiqueta/${props.stage}`);
      return (
        <div className="button-container">
          <Link className="upload-button-stage" to={`/etiqueta/${props.stage}`}>
          <button className="upload-button-label">Validar</button>
        </Link>

        </div>
      
      );
    }
    console.log("No es igual");
    return null;
  };
  
  
  useEffect(() => {
    console.log("searchSerial updated: " + searchSerial);
    console.log("Props stage: " + props.stage);
    console.log("catalogolocalstage: " + catalogo);
  }, [searchSerial]);

  
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
        </section>

        <section>
          {props.stage == "Empaquetado" && catalogo == "Queretaro" && (
            <>
              {verificarEmbarque()}
            </>
          )}
          {props.stage == "Empaquetado" && catalogo == "USA" && (
            <>
              {verificarEmbarque()}
            </>
          )}
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
