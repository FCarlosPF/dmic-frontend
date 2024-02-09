import { useEffect, useState } from "react";
import { SearchQr } from "../../components/SearchQr/SearchQr";
import "../../components/Stages/Stage.css";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";

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
      <Header />
      <Title text="Consultas"/>
      <main className="incoming">
        <section>
          <h3 className="step-title-qr">Búsqueda del QR</h3>

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
          
        </section>

        <section></section>
      </main>
    </div>
  );
};
