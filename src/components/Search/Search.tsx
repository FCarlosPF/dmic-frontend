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

  const [busquedaIQMS_aka, setBusquedaIQMS_aka] = useState<number>(0);
  const [busquedaIQMS_dg, setBusquedaIQMS_dg] = useState<number>(0);
  const [busquedaMolde, setBusquedaMolde] = useState<string>("");
  const [resultadoBusqueda, setResultadoBusqueda] =
    useState<CatalogoItemChina | null>(null);
  const [searchType, setSearchType] = useState<string>("iqms_aka"); // Default to searching by both

  /*const buscarPorIQMS = async () => {
    try {
      const resultado = await catalogoGateway.getById(busquedaIQMS_aka);
      console.log(resultado);
      setResultadoBusqueda(resultado);
      onSearch && onSearch(resultado.iqms_aka);
      console.log("Resultado de la búsqueda:", resultado);
    } catch (error) {
      console.error("Error al realizar la búsqueda por IQMS:", error);
    }
  };*/
  const buscarPorIQMS2 = async () => {
    try {
      let resultado;

      if (searchType === "iqms_aka") {
        resultado = await catalogoGateway.getById_aka(busquedaIQMS_aka);
      } else if (searchType === "iqms_dg") {
        resultado = await catalogoGateway.getById_dg(busquedaIQMS_dg);
      }
      console.log(resultado);
      if (resultado !== undefined) {
        setResultadoBusqueda(resultado);
        onSearch && onSearch(resultado.iqms_aka);
        console.log("Resultado de la búsqueda:", resultado);
      }
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
        <p className="search-title">Buscar por IQMS:</p>
        <div className="search-select-container">
          <label className="search-select-label">Seleccionar tipo:</label>
          <select
            className="search-select"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="iqms_aka">IQMS_AKA</option>
            <option value="iqms_dg">IQMS_DG</option>
          </select>
        </div>
        <div className="search-input-button">
          {searchType === "iqms_aka" && (
            <div className="search-label-input">
              <label className="search-label">IQMS_AKA</label>
              <input
                type="number"
                placeholder="IQMS_AKA"
                className="catalogo-input"
                value={busquedaIQMS_aka}
                onChange={(e) => setBusquedaIQMS_aka(parseInt(e.target.value))}
              />
            </div>
          )}

          {searchType === "iqms_dg" && (
            <div className="search-label-input">
              <label className="search-label">IQMS_DG</label>
              <input
                type="number"
                placeholder="IQMS_DG"
                className="catalogo-input"
                value={busquedaIQMS_dg}
                onChange={(e) => setBusquedaIQMS_dg(parseInt(e.target.value))}
              />
            </div>
          )}

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
                    <img
                      style={{ maxWidth: "100%", height: "auto" }}
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

  const [busquedaIQMS1, setBusquedaIQMS1] = useState<number>(0);
  const [busquedaIQMS2, setBusquedaIQMS2] = useState<number>(0);
  const [busquedaIQMS3, setBusquedaIQMS3] = useState<number>(0);
  const [busquedaMolde, setBusquedaMolde] = useState<string>("");
  const [resultadoBusqueda, setResultadoBusqueda] =
    useState<CatalogoItem_USA_QRO | null>(null);
  const [searchType, setSearchType] = useState<string>("iqms1"); // Default to searching by both

  /*const buscarPorIQMS = async () => {
    try {
      const resultado = await catalogoGateway.getById(busquedaIQMS);
      console.log(resultado);
      setResultadoBusqueda(resultado);
      onSearch && onSearch(resultado.iqms1);
      console.log("Resultado de la búsqueda:", resultado);
    } catch (error) {
      console.error("Error al realizar la búsqueda por IQMS:", error);
    }
  };*/
  const buscarPorIQMS = async () => {
    try {
      let resultado;

      if (searchType === "iqms1") {
        resultado = await catalogoGateway.getById1(busquedaIQMS1);
      } else if (searchType === "iqms2") {
        resultado = await catalogoGateway.getById2(busquedaIQMS2);
      } else if (searchType === "iqms3") {
        resultado = await catalogoGateway.getById3(busquedaIQMS3);
      }
      console.log(resultado);
      if (resultado !== undefined) {
        setResultadoBusqueda(resultado);
        onSearch && onSearch(resultado.iqms1);
        console.log("Resultado de la búsqueda:", resultado);
      }
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
        <p className="search-title">Buscar por IQMS:</p>
        <div className="search-select-container">
          <label className="search-select-label">Seleccionar tipo:</label>
          <select
            className="search-select"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="iqms1">IQMS1</option>
            <option value="iqms2">IQMS2</option>
            <option value="iqms3">IQMS3</option>
          </select>
        </div>
        <div className="search-input-button">
          {searchType === "iqms1" && (
            <div className="search-label-input">
              <label className="search-label">IQMS1</label>
              <input
                type="number"
                placeholder="IQMS1"
                className="catalogo-input"
                value={busquedaIQMS1}
                onChange={(e) => setBusquedaIQMS1(parseInt(e.target.value))}
              />
            </div>
          )}
          {searchType === "iqms2" && (
            <div className="search-label-input">
              <label className="search-label">IQMS2</label>
              <input
                type="number"
                placeholder="IQMS2"
                className="catalogo-input"
                value={busquedaIQMS2}
                onChange={(e) => setBusquedaIQMS2(parseInt(e.target.value))}
              />
            </div>
          )}
          {searchType === "iqms3" && (
            <div className="search-label-input">
              <label className="search-label">IQMS3</label>
              <input
                type="number"
                placeholder="IQMS3"
                className="catalogo-input"
                value={busquedaIQMS3}
                onChange={(e) => setBusquedaIQMS3(parseInt(e.target.value))}
              />
            </div>
          )}{" "}
          {/* {searchType === "iqms1&iqms2" && (
            <div className="search-iqms">
              <div className="search-label-input">
                <label className="search-label">IQMS1</label>
                <input
                  type="number"
                  placeholder="IQMS1"
                  className="catalogo-input"
                  value={busquedaIQMS1}
                  onChange={(e) => setBusquedaIQMS1(parseInt(e.target.value))}
                />
              </div>
              <div className="search-label-input">
                <label className="search-label">IQMS2</label>
                <input
                  type="number"
                  placeholder="IQMS2"
                  className="catalogo-input"
                  value={busquedaIQMS2}
                  onChange={(e) => setBusquedaIQMS2(parseInt(e.target.value))}
                />
              </div>
            </div>
          )}
          {searchType === "iqms1&iqms3" && (
            <div className="search-iqms">
              <div className="search-label-input">
                <label className="search-label">IQMS1</label>
                <input
                  type="number"
                  placeholder="IQMS1"
                  className="catalogo-input"
                  value={busquedaIQMS1}
                  onChange={(e) => setBusquedaIQMS1(parseInt(e.target.value))}
                />
              </div>
              <div className="search-label-input">
                <label className="search-label">IQMS3</label>
                <input
                  type="number"
                  placeholder="IQMS3"
                  className="catalogo-input"
                  value={busquedaIQMS3}
                  onChange={(e) => setBusquedaIQMS3(parseInt(e.target.value))}
                />
              </div>
            </div>
          )}
          {searchType === "iqms2&iqms3" && (
            <div className="search-iqms">
              <div className="search-label-input">
                <label className="search-label">IQMS2</label>
                <input
                  type="number"
                  placeholder="IQMS2"
                  className="catalogo-input"
                  value={busquedaIQMS2}
                  onChange={(e) => setBusquedaIQMS2(parseInt(e.target.value))}
                />
              </div>
              <div className="search-label-input">
                <label className="search-label">IQMS3</label>
                <input
                  type="number"
                  placeholder="IQMS3"
                  className="catalogo-input"
                  value={busquedaIQMS3}
                  onChange={(e) => setBusquedaIQMS3(parseInt(e.target.value))}
                />
              </div>
            </div>
          )}
          {searchType === "all" && (
           <div className="search-iqms">
              <div className="search-label-input">
                <label className="search-label">IQMS1</label>
                <input
                  type="number"
                  placeholder="IQMS1"
                  className="catalogo-input"
                  value={busquedaIQMS1}
                  onChange={(e) => setBusquedaIQMS1(parseInt(e.target.value))}
                />
              </div>
              <div className="search-label-input">
                <label className="search-label">IQMS2</label>
                <input
                  type="number"
                  placeholder="IQMS2"
                  className="catalogo-input"
                  value={busquedaIQMS2}
                  onChange={(e) => setBusquedaIQMS2(parseInt(e.target.value))}
                />
              </div>
              <div className="search-label-input">
                <label className="search-label">IQMS3</label>
                <input
                  type="number"
                  placeholder="IQMS3"
                  className="catalogo-input"
                  value={busquedaIQMS3}
                  onChange={(e) => setBusquedaIQMS3(parseInt(e.target.value))}
                />
              </div>
            </div>
          )} */}
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
                    <td className="table-element">
                      {resultadoBusqueda.familia}
                    </td>
                    <td className="table-element">
                      {resultadoBusqueda.molde1}
                    </td>
                    <td className="table-element">
                      {resultadoBusqueda.molde2}
                    </td>
                    <td className="table-element">
                      {resultadoBusqueda.foto &&
                      typeof resultadoBusqueda.foto === "object" &&
                      "type" in resultadoBusqueda.foto &&
                      resultadoBusqueda.foto.type === "Buffer" &&
                      "data" in resultadoBusqueda.foto ? (
                        <img
                          style={{ maxWidth: "100%", height: "auto" }}
                          src={URL.createObjectURL(
                            new Blob([
                              new Uint8Array(resultadoBusqueda.foto.data),
                            ])
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
