import { useEffect, useState } from "react";
import { SearchQr } from "../../components/SearchQr/SearchQr";
import "../../components/Stages/Stage.css";

export const DashboardQr = () => {
  const stage = window.location.pathname;
  const stage1 = window.location.hash.substring(1);

  let catalogo = localStorage.getItem("catalogo");
  let exist = localStorage.getItem("exist");

  console.log(stage, stage1);
  const [searchSerial, setSearchSerial] = useState<string>("");

  function handleSearch(id_consulta: string) {
    console.log("id_consulta->", id_consulta);
    setSearchSerial(id_consulta);
  }

  useEffect(() => {
    console.log("searchSerial updated: " + searchSerial);
    console.log("Stage: " + stage);
    console.log("catalogolocalstage: " + catalogo);
  }, [searchSerial]);

  return (
    <div>
      <main className="incoming">
        <section>
          <>
            <h3 className="step-title">Búsqueda del producto</h3>

            <SearchQr
              onSearch={handleSearch}
              id_consulta={""}
              hora={""}
              fecha={""}
              id_user={""}
              iqms={""}
              catalogo={""}
              stage={""}
            />
          </>
        </section>

        <section></section>
      </main>
    </div>
  );
};
