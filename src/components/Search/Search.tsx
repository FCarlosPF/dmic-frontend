import SearchIcon from '@mui/icons-material/Search';
import "./Search.css"
import { useState } from 'react';
import CatalogoChinaGateway from '../../gateways/CatalogoChinaGateway';



export const Search = () => {
  const catalogoGateway = new CatalogoChinaGateway();

  const [busquedaIQMS, setBusquedaIQMS] = useState<number>(0);
  const [busquedaMolde, setBusquedaMolde] = useState<string>("");
  const [resultadoBusqueda, setResultadoBusqueda] =
    useState< object | null >(null);


  const buscarPorIQMS = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      try {
        const resultado = await catalogoGateway.getById(busquedaIQMS);
        console.log(resultado)
        setResultadoBusqueda(resultado); // Almacena el resultado de la búsqueda en el estado resultadoBusqueda
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
        setResultadoBusqueda(resultado); // Almacena el resultado de la búsqueda en el estado resultadoBusqueda
        console.log("Resultado de la búsqueda:", resultado);
      } catch (error) {
        console.error("Error al realizar la búsqueda por Molde:", error);
      }
    }
  };

  return (


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

  )
}
