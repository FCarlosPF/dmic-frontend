import { useState } from "react";
import Swal from "sweetalert2";
import CatalogoChinaGateway from "../../gateways/CatalogoChinaGateway";
import Catalogo_USA_QRO_Gateway from "../../gateways/Catalogo_USA_QRO_Gateway";
import "./Search.css";

interface CatalogoItemChina {
  iqms_aka: number;
  iqms_dg: number;
  molde: string;
  imagen: any;
  onSearch?: (iqms: number, iqms_dg: number) => void;
}

const SearchChina: React.FC<CatalogoItemChina> = ({ onSearch }) => {
  let catalogoGateway = new CatalogoChinaGateway();
  

  const [busquedaIQMS, setBusquedaIQMS] = useState<string>("");
  const [busquedaMolde, setBusquedaMolde] = useState<string>("");
  const [resultadoBusqueda, setResultadoBusqueda] =
    useState<CatalogoItemChina | null>(null);

  

  const buscarPorIQMS2 = async () => {
    try {
      const resultado = await catalogoGateway.getById(busquedaIQMS);
      console.log(resultado);
      setResultadoBusqueda(resultado);
      onSearch && onSearch(resultado.iqms_aka, resultado.iqms_dg);
      console.log("Resultado de la búsqueda:", resultado);

      if (resultado.iqms_aka == null) {
        Swal.fire({
          title: "Producto no encontrado",
          text: "No se encontró ningún producto con el IQMS proporcionado.",
          icon: "info",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      }

      if (resultado !== undefined) {
        setResultadoBusqueda(resultado);
        onSearch && onSearch(resultado.iqms_aka, resultado.iqms_dg);
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

  const buscarPorMolde = async () => {
    try {
      const resultado = await catalogoGateway.getByMolde(busquedaMolde);
      setResultadoBusqueda(resultado);
      onSearch && onSearch(resultado.iqms_aka, resultado.iqms_dg);
      console.log("Resultado de la búsqueda:", resultado);
      resultado.iqms_aka == null &&
        Swal.fire({
          title: "Producto no encontrado",
          text: "No se encontró ningún producto con el molde proporcionado.",
          icon: "info",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
    } catch (error) {
      console.error("Error al realizar la búsqueda por Molde:", error);
    }
  };

  return (
    <>
      <section className="contenedor-input-search">
        <p className="search-title">Buscar por IQMS:</p>

        <div className="search-input-button">
          <div className="search-label-input">
            <label className="search-label">IQMS</label>
            <input
              type="number"
              placeholder="IQMS"
              className="catalogo-input"
              value={busquedaIQMS}
              onChange={(e) => setBusquedaIQMS(e.target.value)}
            />
          </div>

          <button className="search-button" onClick={buscarPorIQMS2}>
            Buscar
          </button>
        </div>
        <p className="search-title">Buscar por Molde:</p>
        <div className="search-input-button">
          <input
            type="text"
            placeholder="Buscar por Molde"
            className="catalogo-input"
            value={busquedaMolde}
            onChange={(e) => setBusquedaMolde(e.target.value)}
          />
          <button className="search-button" onClick={buscarPorMolde}>
            Buscar
          </button>
        </div>
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
                      <th className="table-header">IQMS_AKA</th>
                      <th className="table-header">FAMILIA_DG</th>
                      <th className="table-header">MOLDE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="table-element">
                        {resultadoBusqueda.iqms_aka}
                      </td>
                      <td className="table-element">
                        {resultadoBusqueda.iqms_dg}
                      </td>
                      <td className="table-element">
                        {resultadoBusqueda.molde}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </aside>
              <aside className="search-card-col-img">
                {resultadoBusqueda.imagen &&
                typeof resultadoBusqueda.imagen === "object" &&
                "type" in resultadoBusqueda.imagen &&
                resultadoBusqueda.imagen.type === "Buffer" &&
                "data" in resultadoBusqueda.imagen ? (
                  <img
                    src={URL.createObjectURL(
                      new Blob([new Uint8Array(resultadoBusqueda.imagen.data)])
                    )}
                    alt={`Imagen ${resultadoBusqueda.iqms_aka}`}
                  />
                ) : (
                  "Imagen no válida"
                )}
              </aside>
            </section>
           
          </div>
        )}
      </section>
    </>
  );
};

interface CatalogoItem_USA_QRO {
  iqms1: number;
  iqms2: number;
  iqms3: number;
  familia: string;
  molde1: string;
  molde2: string;
  foto: any;
  onSearch?: (iqms: number, iqms_dg: number) => void;
}

const Search__USA_QRO: React.FC<CatalogoItem_USA_QRO> = ({ onSearch }) => {
  let catalogoGateway = new Catalogo_USA_QRO_Gateway();

  const [busquedaIQMS, setBusquedaIQMS] = useState<string>("");
  const [busquedaMolde, setBusquedaMolde] = useState<string>("");
  const [resultadoBusqueda, setResultadoBusqueda] =
    useState<CatalogoItem_USA_QRO | null>(null);
    const stage = window.location.pathname;
  const stage1 = window.location.hash.substring(1);
  console.log("Stage->"+stage, "Stage1->"+stage1);

  const buscarPorIQMS = async () => {
    try {
      const resultado = await catalogoGateway.getById(parseInt(busquedaIQMS));
      setResultadoBusqueda(resultado);
      if (resultado.iqms1 == null) {
       // setExist(false)
        localStorage.setItem("exist", "no");
        Swal.fire({
          title: "Producto no encontrado",
          text: "No se encontró ningún producto con el IQMS proporcionado.",
          icon: "info",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      }else{
        //setExist(true)
        localStorage.setItem("exist", "si");
      }

      console.log(
        resultado,
        typeof resultado,
        resultadoBusqueda,
        typeof resultadoBusqueda
      );
      onSearch && onSearch(resultado.iqms1, resultado.iqms2);
      console.log("Resultado de la búsqueda:", resultado, typeof resultado);
    } catch (error) {
      console.error("Error al realizar la búsqueda por IQMS:", error);
    }
  };

  const buscarPorMolde = async () => {
    try {
      const resultado = await catalogoGateway.getByMolde(busquedaMolde);
      setResultadoBusqueda(resultado);
      console.log("Resultado de la búsqueda:", resultado);
      if (resultado.iqms1 == null) {
        //setExist(false)
        localStorage.setItem("exist", "no");
        Swal.fire({
          title: "Producto no encontrado",
          text: "No se encontró ningún producto con el molde proporcionado.",
          icon: "info",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      }else{
       // setExist(true)
        localStorage.setItem("exist", "si");
      }
      onSearch && onSearch(resultado.iqms1, resultado.iqms2);

    } catch (error) {
      console.error("Error al realizar la búsqueda por Molde:", error);
    }
  };

  return (
    <>
      <section className="contenedor-input-search">
        <p className="search-title">Buscar por IQMS:</p>

        <div className="search-input-button">
          <div className="search-label-input">
            <label className="search-label">IQMS</label>
            <input
              type="number"
              placeholder="IQMS"
              className="catalogo-input"
              value={busquedaIQMS}
              onChange={(e) => setBusquedaIQMS(e.target.value)}
            />
          </div>

          <button className="search-button" onClick={buscarPorIQMS}>
            Buscar
          </button>
        </div>
        <p className="search-title">Buscar por Molde:</p>

        <div className="search-input-button">
          <input
            type="text"
            placeholder="Buscar por Molde"
            className="catalogo-input"
            value={busquedaMolde}
            onChange={(e) => setBusquedaMolde(e.target.value)}
          />
          <button className="search-button" onClick={buscarPorMolde}>
            Buscar
          </button>
        </div>
      </section>
      <hr />
      <section className="contenedor-table-catalogo">
        {resultadoBusqueda && (
          <div>
            <h2 className="catalogoChina-title">Resultado de la Búsqueda</h2>
            <section className="search-card">
              <aside className="search-card-col-info">
                <table>
                  <thead>
                    <tr>
                      <th className="table-header">IQMS1</th>
                      <th className="table-header">IQMS2</th>
                      <th className="table-header">IQMS3</th>
                      <th className="table-header">FAMILIA</th>
                      <th className="table-header">MOLDE1</th>
                      <th className="table-header">MOLDE2</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="table-element">
                        {resultadoBusqueda.iqms1}
                      </td>
                      <td className="table-element">
                        {resultadoBusqueda.iqms2}
                      </td>
                      <td className="table-element">
                        {resultadoBusqueda.iqms3}
                      </td>
                      <td className="table-element">
                        {resultadoBusqueda.familia}
                      </td>
                      <td className="table-element">
                        {resultadoBusqueda.molde1}
                      </td>
                      <td className="table-element">
                        {resultadoBusqueda.molde2}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </aside>
              <aside className="search-card-col-img">
                {resultadoBusqueda.foto &&
                typeof resultadoBusqueda.foto === "object" &&
                "type" in resultadoBusqueda.foto &&
                resultadoBusqueda.foto.type === "Buffer" &&
                "data" in resultadoBusqueda.foto ? (
                  <img
                    src={URL.createObjectURL(
                      new Blob([new Uint8Array(resultadoBusqueda.foto.data)])
                    )}
                    alt={`foto ${resultadoBusqueda.iqms1}`}
                  />
                ) : (
                  "Imagen no válida"
                )}
              </aside>
            </section>
          
          </div>
        )}
      </section>
     
    </>
  );
};

export { SearchChina, Search__USA_QRO };

