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
  stage:string
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
      const resultado = await catalogoGateway.getByDetail(busquedaStage, busquedaCatalogo);
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
        //verificarEmbarque();
      }
    } catch (error) {
      console.error("Error al realizar la búsqueda por IQMS:", error);
      Swal.fire({
        title: "Producto no encontrado",
        text: "No se encontró ningún producto con el IQMS proporcionado.",
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
          <div className="search-label-input">
            <label className="search-label">Etapa</label>
            <input
              type="text"
              placeholder="Buscar por Etapa"
              className="catalogo-input"
              value={busquedaStage}
              onChange={(e) => setBusquedaStage(e.target.value)}
            />
          </div>
        </div>
        <p className="search-title">Buscar por Catalogo:</p>
        <div className="search-input-button">
          <input
            type="text"
            placeholder="Buscar por catalogo"
            className="catalogo-input"
            value={busquedaCatalogo}
            onChange={(e) => setBusquedaCatalogo(e.target.value)}
          />
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
                <table>
                  <thead>
                    <tr>
                      <th className="table-header">ID CONSULTA</th>
                      <th className="table-header">HORA</th>
                      <th className="table-header">FECHA</th>
                      <th className="table-header">ID USUARIO</th>
                      <th className="table-header">IQMS</th>
                      <th className="table-header">CATALOGO</th>
                      <th className="table-header">STAGE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="table-element">
                        {resultadoBusqueda.id_consulta}
                      </td>
                      <td className="table-element">
                        {resultadoBusqueda.hora}
                      </td>
                      <td className="table-element">
                        {resultadoBusqueda.fecha}
                      </td>
                      <td className="table-element">
                        {resultadoBusqueda.id_user}
                      </td>
                      <td className="table-element">
                        {resultadoBusqueda.iqms}
                      </td>
                      <td className="table-element">
                        {resultadoBusqueda.catalogo}
                      </td>
                      <td className="table-element">
                        {resultadoBusqueda.stage}
                      </td>
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

