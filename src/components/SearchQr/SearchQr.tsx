import { useState } from "react";
import Swal from "sweetalert2";
import "../Search/Search.css";
import TrazabilidadGateway from "../../gateways/TrazabilidadGateway";

interface QrItemConsulta {
  id_consulta: string;
  hora: string;
  fecha: string;
  id_user: string;
  iqms: string;
  catalogo: string;
  stage: string;
  onSearch?: (id_incoming: string) => void;
}

const SearchQr: React.FC<QrItemConsulta> = ({ onSearch }) => {
  let catalogoGateway = new TrazabilidadGateway();

  const [busquedaStage, setBusquedaStage] = useState<string>("");
  const [busquedaCatalogo, setBusquedaCatalogo] = useState<string>("");
  const [resultadoBusqueda, setResultadoBusqueda] =
    useState<QrItemConsulta | null>(null);

  const botonBuscar = async () => {
    try {
      if(busquedaCatalogo!="" || busquedaStage!=""){
        const resultado = await catalogoGateway.getByDetail(
          busquedaStage,
          busquedaCatalogo
        );
        console.log(resultado);
        setResultadoBusqueda(resultado);
        onSearch && onSearch(resultado.id_consulta);
        console.log("Resultado de la búsqueda:", resultado);
  
        if (resultado.id_consulta == null) {
          Swal.fire({
            title: "Qr de consulta no encontrado",
            text: "No se encontró ningún QR con el parametro proporcionado.",
            icon: "info",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        }
  
        if (resultado !== undefined) {
          setResultadoBusqueda(resultado);
          onSearch && onSearch(resultado.id_consulta);
        }
      }
      else{
        Swal.fire({
          title: "Debe ingresar al menos un dato para la búsqueda",
          text: "Debe seleccionar los parametros indicados",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });

      }
      
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
      Swal.fire({
        title: "Qr no encontrado",
        text: "No se encontró ningún producto con el dato proporcionado.",
        icon: "info",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <>
      <section className="contenedor-input-search">
        <p className="search-title">Buscar por Etapa:</p>

        <div className="search-input-button">
          <div className="search-select-input">
            <label className="search-label">Etapa</label>
            <select
              className="qr-select-catalogo"
              value={busquedaStage}
              onChange={(e) => setBusquedaStage(e.target.value)}
            >
              <option value="" disabled>Selecciona una etapa</option>
              <option value="Incoming">Incoming</option>
              <option value="Empaquetado">Empaquetado</option>
              <option value="Embarque">Embarque</option>
            </select>
          </div>
        </div>
        <p className="search-title">Buscar por Catalogo:</p>
        <div className="search-input-button">
          <div className="search-select-input">
            <label className="search-label">Catalogo</label>
            <select
              className="qr-select-catalogo"
              value={busquedaCatalogo}
              onChange={(e) => setBusquedaCatalogo(e.target.value)}
            >
              <option value="" disabled>Selecciona un catálogo</option>
              <option value="China">China</option>
              <option value="USA">USA</option>
              <option value="Queretaro">Querétaro</option>
            </select>
          </div>
        </div>
        <button className="search-button" onClick={botonBuscar}>
          Buscar
        </button>
      </section>
      <hr />
      <section className="contenedor-table-catalogo">
        {resultadoBusqueda && (
          <div className="table-catalogo-search">
            <h2 className="catalogoChina-title">Resultado de la Búsqueda</h2>
            <section className="search-card">
              <aside className="search-card-col-info">
                <table className="horizontal-table">
                  <tbody>
                    <tr>
                      <th>ID CONSULTA</th>
                      <td>{resultadoBusqueda.id_consulta}</td>
                    </tr>
                    <tr>
                      <th>HORA</th>
                      <td>{resultadoBusqueda.hora}</td>
                    </tr>
                    <tr>
                      <th>FECHA</th>
                      <td>{resultadoBusqueda.fecha}</td>
                    </tr>
                    <tr>
                      <th>ID USUARIO</th>
                      <td>{resultadoBusqueda.id_user}</td>
                    </tr>
                    <tr>
                      <th>IQMS</th>
                      <td>{resultadoBusqueda.iqms}</td>
                    </tr>
                    <tr>
                      <th>CATALOGO</th>
                      <td>{resultadoBusqueda.catalogo}</td>
                    </tr>
                    <tr>
                      <th>STAGE</th>
                      <td>{resultadoBusqueda.stage}</td>
                    </tr>
                  </tbody>
                </table>
              </aside>
            </section>
          </div>
        )}
      </section>
    </>
  );
};
export { SearchQr };