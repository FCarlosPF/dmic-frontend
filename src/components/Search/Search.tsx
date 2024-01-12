import { useState } from 'react';
import CatalogoChinaGateway from '../../gateways/CatalogoChinaGateway';
import Catalogo_USA_QRO_Gateway from '../../gateways/Catalogo_USA_QRO_Gateway';
import "./Search.css";

interface CatalogoItemChina {
  iqms_aka: number;
  iqms_dg: number;
  molde: string;
  imagen: string;
  onSearch?: (iqms: number) => void
}

interface CatalogoItem_USA_QRO{
  iqms1: number;
  iqms2: number;
  iqms3: number;
  familia: string;
  molde1: string;
  molde2: string;
  foto: string;
  onSearch?: (iqms: number) => void
}

const Search: React.FC<CatalogoItemChina| CatalogoItem_USA_QRO > = ({ onSearch }) => {
  
  let catalogo = localStorage.getItem("catalogo");
  let catalogoGateway = catalogo == "China"  ? new CatalogoChinaGateway() : new Catalogo_USA_QRO_Gateway();


  const [busquedaIQMS, setBusquedaIQMS] = useState<number>(0);
  const [busquedaMolde, setBusquedaMolde] = useState<string>("");
  const [resultadoBusqueda, setResultadoBusqueda] =
    useState<CatalogoItemChina | CatalogoItem_USA_QRO  | null>(null);


  const buscarPorIQMS = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      try {
        const resultado = await catalogoGateway.getById(busquedaIQMS);
        console.log(resultado)
        setResultadoBusqueda(resultado); 
        onSearch && onSearch(resultado.iqms_aka );
        console.log("Resultado de la búsqueda:", resultado);
      } catch (error) {
        console.error("Error al realizar la búsqueda por IQMS:", error);
      }
    }
  };

  const buscarPorMolde = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      try {
        const resultado = await catalogoGateway.getByMolde(busquedaMolde);
        setResultadoBusqueda(resultado); 
        onSearch && onSearch(resultado.iqms_aka);
        console.log("Resultado de la búsqueda:", resultado);
      } catch (error) {
        console.error("Error al realizar la búsqueda por Molde:", error);
      }
    }
  };

  return (

    <>
      <section className="contenedor-input-search">
        Buscar por IQMS:
        <input
          type="number"
          placeholder="Buscar por IQMS"
          className="catalogoChina-input"
          value={busquedaIQMS}
          onChange={(e) => setBusquedaIQMS(parseInt(e.target.value))}
          onKeyDown={buscarPorIQMS}
        />
        Buscar por Molde:
        <input
          type="text"
          placeholder="Buscar por Molde"
          className="catalogoChina-input"
          value={busquedaMolde}
          onChange={(e) => setBusquedaMolde(e.target.value)}
          onKeyDown={buscarPorMolde}
        />
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
                <td className="table-element">{resultadoBusqueda.iqms_aka}</td>
                    <td className="table-element">{resultadoBusqueda.iqms_dg}</td>
                    <td className="table-element">{resultadoBusqueda.molde}</td>
                    <td className="table-element">{resultadoBusqueda.imagen}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </section>
    </>

  )
}
export default Search;