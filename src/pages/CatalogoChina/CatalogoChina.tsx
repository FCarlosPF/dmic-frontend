import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import CatalogoChinaGateway from "../../gateways/CatalogoChinaGateway";
import BarcodeScanner from "../../components/BarCodeScanner";

interface CatalogoItem {
  iqms: number;
  familia: string;
  molde: string;
  imagen: string;
}

export const CatalogoChina = () => {
  const [catalogo, setCatalogo] = useState<CatalogoItem[]>([]);
  const catalogoGateway = new CatalogoChinaGateway();
  const [nuevoElemento, setNuevoElemento] = useState<CatalogoItem>({
    iqms: 0,
    familia: "",
    molde: "",
    imagen: "",
  });
  const [busquedaIQMS, setBusquedaIQMS] = useState<number>(0);
  const [busquedaMolde, setBusquedaMolde] = useState<string>("");
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);

  const [resultadoBusqueda, setResultadoBusqueda] =
    useState<CatalogoItem | null>(null);

  useEffect(() => {
    catalogoGateway
      .getAll()
      .then((data) => setCatalogo(data))
      .catch((error) =>
        console.error("Error al obtener elementos del catálogo:", error)
      );
  }, []);

  const agregarElemento = (event: React.FormEvent) => {
    event.preventDefault();

    catalogoGateway
      .create(nuevoElemento)
      .then((data) => {
        setCatalogo([...catalogo, data]);
        setNuevoElemento({
          iqms: 0,
          familia: "",
          molde: "",
          imagen: "",
        });
      })
      .catch((error) =>
        console.error("Error al agregar nuevo elemento:", error)
      );
  };

  const eliminarElemento = (iqms: number) => {
    // Eliminar un elemento del catálogo por su ID
    catalogoGateway
      .delete(iqms)
      .then(() => {
        // Actualizar el estado del catálogo eliminando el elemento con el ID dado
        setCatalogo((prevCatalogo) =>
          prevCatalogo.filter((elemento) => elemento.iqms !== iqms)
        );
      })
      .catch((error) => console.error("Error al eliminar elemento:", error));
  };

  const buscarPorIQMS = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      try {
        const resultado = await catalogoGateway.getById(busquedaIQMS);
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
    <>
      <Header />
      <Title text="Catalogo China" />
      
      <Container className="contendor-catalogoChina">
        <h2>Agregar Nuevo elemento</h2>
        <section className="contenedor-add-element">

          <section className="contenedor-input">

            <input
              type="text"
              placeholder="IQMS"
              className="catalogoChina-input"
              value={nuevoElemento.iqms}
              onChange={(e) =>
                setNuevoElemento({
                  ...nuevoElemento,
                  iqms: parseInt(e.target.value),
                })
              }
            />
            <input
              type="text"
              placeholder="Familia"
              className="catalogoChina-input"
              value={nuevoElemento.familia}
              onChange={(e) =>
                setNuevoElemento({ ...nuevoElemento, familia: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Molde"
              className="catalogoChina-input"
              value={nuevoElemento.molde}
              onChange={(e) =>
                setNuevoElemento({ ...nuevoElemento, molde: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Imagen"
              className="catalogoChina-input"
              value={nuevoElemento.imagen}
              onChange={(e) =>
                setNuevoElemento({ ...nuevoElemento, imagen: e.target.value })
              }
            />
          </section>
          <button className="catalogoChina-button-add" onClick={agregarElemento}>Agregar</button>

        </section>

        <hr />
        <section className="contenedor-input-search">


          Buscar por IQMS:
          <input
            type="number"
            placeholder="Buscar por IQMS"
            className="catalogoChina-input"
            value={busquedaIQMS}
            onChange={(e) => setBusquedaIQMS(parseInt(e.target.value))}
            onKeyDown={buscarPorIQMS} // Llama a la función buscarPorIQMS cuando se presiona una tecla
          />
          Buscar por Molde:
          <input
            type="text"
            placeholder="Buscar por Molde"
            className="catalogoChina-input"
            value={busquedaMolde}
            onChange={(e) => setBusquedaMolde(e.target.value)}
            onKeyDown={buscarPorMolde} // Llama a la función buscarPorIQMS cuando se presiona una tecla
          />
        </section>
        <hr />
        <section className="contenedor-table-catalogo">
          <table>
            <thead>
              <tr>
                <th className="table-header">IQMS</th>
                <th className="table-header">IQMS2</th>
                <th className="table-header">MOLDE</th>
                <th className="table-header">URL</th>
                <th className="table-header">IMAGEN</th>
              </tr>
            </thead>
            <tbody>
              {catalogo.map((elemento, index) => {
                console.log(elemento.imagen);

                return (
                  <tr key={index}>
                    <td className="table-element">{elemento.iqms}</td>
                    <td className="table-element">{elemento.familia}</td>
                    <td className="table-element">{elemento.molde}</td>
                    <td className="table-element">{elemento.imagen}</td>
                    <td className="table-element">
                      <img src={elemento.imagen} alt="image element" width={200} />
                    </td>
                    {/*                     <td>
                      <BarCode additionalProp={elemento.iqms} />
                    </td> */}
                    <td>
                      <button className="table-button-delete" onClick={() => eliminarElemento(elemento.iqms)}>
                        Eliminar
                      </button>
                    </td>

                  </tr>

                );
              })}

            </tbody>

          </table>
          {resultadoBusqueda && (
            <div>
              <h2 className="catalogoChina-title">Resultado de la Búsqueda</h2>
              <table>
                <thead>
                  <tr>
                    <th className="table-header">IQMS</th>
                    <th className="table-header">FAMILIA</th>
                    <th className="table-header">MOLDE</th>
                    <th className="table-header">FOTO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="table-element">{resultadoBusqueda.iqms}</td>
                    <td className="table-element">{resultadoBusqueda.familia}</td>
                    <td className="table-element">{resultadoBusqueda.molde}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>

      </Container>
    </>
  );
};
