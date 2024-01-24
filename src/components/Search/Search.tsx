import { useState } from "react";
import CatalogoChinaGateway from "../../gateways/CatalogoChinaGateway";
import Catalogo_USA_QRO_Gateway from "../../gateways/Catalogo_USA_QRO_Gateway";
import "./Search.css";

interface CatalogoItemChina {
  iqms_aka: number;
  iqms_dg: number;
  molde: string;
  imagen: any;
  onSearch?: (iqms: number) => void;
}

const SearchChina: React.FC<CatalogoItemChina> = ({ onSearch }) => {
  let catalogoGateway = new CatalogoChinaGateway();

  const [busquedaIQMS, setBusquedaIQMS] = useState<number>(0);
  const [busquedaMolde, setBusquedaMolde] = useState<string>("");
  const [resultadoBusqueda, setResultadoBusqueda] =
    useState<CatalogoItemChina | null>(null);

  const buscarPorIQMS = async () => {
    try {
      const resultado = await catalogoGateway.getById(busquedaIQMS);
      console.log(resultado);
      setResultadoBusqueda(resultado);
      onSearch && onSearch(resultado.iqms_aka);
      console.log("Resultado de la búsqueda:", resultado);
    } catch (error) {
      console.error("Error al realizar la búsqueda por IQMS:", error);
    }
  };

  const buscarPorMolde = async () => {
    try {
      const resultado = await catalogoGateway.getByMolde(busquedaMolde);
      setResultadoBusqueda(resultado);
      onSearch && onSearch(resultado.iqms_aka);
      console.log("Resultado de la búsqueda:", resultado);
    } catch (error) {
      console.error("Error al realizar la búsqueda por Molde:", error);
    }
  };

  return (
    <>
      <section className="contenedor-input-search">
        Buscar por IQMS:
        <div className="search-input-button">
          <input
            type="number"
            placeholder="Buscar por IQMS"
            className="catalogo-input"
            value={busquedaIQMS}
            onChange={(e) => setBusquedaIQMS(parseInt(e.target.value))}
          />
          <button className="search-button" onClick={buscarPorIQMS}>Buscar</button>
        </div>
        Buscar por Molde:
        <div className="search-input-button">
          <input
            type="text"
            placeholder="Buscar por Molde"
            className="catalogo-input"
            value={busquedaMolde}
            onChange={(e) => setBusquedaMolde(e.target.value)}
          />
          <button  className="search-button" onClick={buscarPorMolde}>Buscar</button>
        </div>
      </section>
      <hr />
      <section className="contenedor-table-catalogo">
        {resultadoBusqueda && (
          <div>
            <h2 className="catalogoChina-title">Resultado de la Búsqueda</h2>
            <table>
              <thead>
                <tr>
                  <th className="table-header">IQMS_AKA</th>
                  <th className="table-header">FAMILIA_DG</th>
                  <th className="table-header">MOLDE</th>
                  <th className="table-header">FOTO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-element">
                    {resultadoBusqueda.iqms_aka}
                  </td>
                  <td className="table-element">{resultadoBusqueda.iqms_dg}</td>
                  <td className="table-element">{resultadoBusqueda.molde}</td>
                  {resultadoBusqueda.imagen &&
                  typeof resultadoBusqueda.imagen === "object" &&
                  "type" in resultadoBusqueda.imagen &&
                  resultadoBusqueda.imagen.type === "Buffer" &&
                  "data" in resultadoBusqueda.imagen ? (
                    <img style={{ maxWidth: '100%', height: 'auto' }}
                      src={URL.createObjectURL(
                        new Blob([
                          new Uint8Array(resultadoBusqueda.imagen.data),
                        ])
                      )}
                      alt={`Imagen ${resultadoBusqueda.iqms_aka}`}
                    />
                  ) : (
                    "Imagen no válida"
                  )}
                </tr>
              </tbody>
            </table>
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
  onSearch?: (iqms: number) => void;
}

const Search__USA_QRO: React.FC<CatalogoItem_USA_QRO> = ({ onSearch }) => {
  let catalogoGateway = new Catalogo_USA_QRO_Gateway();

  const [busquedaIQMS, setBusquedaIQMS] = useState<number>(0);
  const [busquedaMolde, setBusquedaMolde] = useState<string>("");
  const [resultadoBusqueda, setResultadoBusqueda] =
    useState<CatalogoItem_USA_QRO | null>(null);

  const buscarPorIQMS = async () => {
    try {
      const resultado = await catalogoGateway.getById(busquedaIQMS);
      console.log(resultado);
      setResultadoBusqueda(resultado);
      onSearch && onSearch(resultado.iqms1);
      console.log("Resultado de la búsqueda:", resultado);
    } catch (error) {
      console.error("Error al realizar la búsqueda por IQMS:", error);
    }
  };

  const buscarPorMolde = async () => {
    try {
      const resultado = await catalogoGateway.getByMolde(busquedaMolde);
      setResultadoBusqueda(resultado);
      onSearch && onSearch(resultado.iqms1);
      console.log("Resultado de la búsqueda:", resultado);
    } catch (error) {
      console.error("Error al realizar la búsqueda por Molde:", error);
    }
  };

  return (
    <>
      <section className="contenedor-input-search">
        Buscar por IQMS:
        <div className="search-input-button">
          <input
            type="number"
            placeholder="Buscar por IQMS"
            className="catalogo-input"
            value={busquedaIQMS}
            onChange={(e) => setBusquedaIQMS(parseInt(e.target.value))}
          />
          <button className="search-button" onClick={buscarPorIQMS}>Buscar</button>
        </div>
        Buscar por Molde:
        <div className="search-input-button">
          <input
            type="text"
            placeholder="Buscar por Molde"
            className="catalogo-input"
            value={busquedaMolde}
            onChange={(e) => setBusquedaMolde(e.target.value)}
          />
          <button className="search-button" onClick={buscarPorMolde}>Buscar</button>
        </div>
      </section>
      <hr />
      <section className="contenedor-table-catalogo">
      {resultadoBusqueda && (
          <div>
            <h2 className="catalogoChina-title">Resultado de la Búsqueda</h2>
        <table className="catalogo-usa-qro-table">
          <thead>
            <tr>
              <th>IQMS1</th>
              <th>IQMS2</th>
              <th>IQMS3</th>
              <th>FAMILIA</th>
              <th>MOLDE1</th>
              <th>MOLDE2</th>
              <th>FOTO</th>
            </tr>
          </thead>
          <tbody>
            {resultadoBusqueda && (
              <tr>
                <td className="table-element">{resultadoBusqueda.iqms1}</td>
                <td className="table-element">{resultadoBusqueda.iqms2}</td>
                <td className="table-element">{resultadoBusqueda.iqms3}</td>
                <td className="table-element">{resultadoBusqueda.familia}</td>
                <td className="table-element">{resultadoBusqueda.molde1}</td>
                <td className="table-element">{resultadoBusqueda.molde2}</td>
                <td className="table-element">
                  {resultadoBusqueda.foto &&
                  typeof resultadoBusqueda.foto === "object" &&
                  "type" in resultadoBusqueda.foto &&
                  resultadoBusqueda.foto.type === "Buffer" &&
                  "data" in resultadoBusqueda.foto ? (
                    <img style={{ maxWidth: '100%', height: 'auto' }}
                      src={URL.createObjectURL(
                        new Blob([new Uint8Array(resultadoBusqueda.foto.data)])
                      )}
                      alt={`Imagen ${resultadoBusqueda.iqms1}`}
                    />
                  ) : (
                    "Imagen no válida"
                  )}
                </td>
              </tr>
            )}
          </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
};

export { SearchChina, Search__USA_QRO };
