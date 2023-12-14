import React, { useEffect, useState } from "react";
import CatalogoChinaGateway from "../../gateways/CatalogoChinaGateway";
import Container from "react-bootstrap/Container";
import { BarCode } from "../../components/BarCode";
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
  const [barcode, setBarcode] = useState("");
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

  const handleScan = (barcode: string) => {
    // Aquí puedes manejar la respuesta del servidor
    // Por ejemplo, puedes hacer una solicitud al backend para obtener más información sobre el producto

    // Supongamos que tu API devuelve un objeto con la información del producto
    fetch(`http://localhost:3000/catalogoChina/iqms/${barcode}`)
      .then((response) => response.json())
      .then((product) => {
        console.log('Producto encontrado:', product);
        setScannedBarcode(barcode);
        // Realiza las acciones necesarias con la información del producto
      })
      .catch((error) => {
        console.error('Error al obtener el producto:', error);
        setScannedBarcode(null);
      });
  };
  return (
    <>
      <Container>
        <h2>Agregar Nuevo Elemento</h2>
        <input
          type="text"
          placeholder="IQMS"
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
          value={nuevoElemento.familia}
          onChange={(e) =>
            setNuevoElemento({ ...nuevoElemento, familia: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Molde"
          value={nuevoElemento.molde}
          onChange={(e) =>
            setNuevoElemento({ ...nuevoElemento, molde: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Imagen"
          value={nuevoElemento.imagen}
          onChange={(e) =>
            setNuevoElemento({ ...nuevoElemento, imagen: e.target.value })
          }
        />
        <button onClick={agregarElemento}>Agregar</button>
        <br />
        <br />
        <hr />
        Buscar por IQMS:
        <input
          type="text"
          placeholder="Buscar por IQMS"
          value={busquedaIQMS}
          onChange={(e) => setBusquedaIQMS(parseInt(e.target.value))}
          onKeyDown={buscarPorIQMS} // Llama a la función buscarPorIQMS cuando se presiona una tecla
        />
        Buscar por Molde:
        <input
          type="text"
          placeholder="Buscar por Molde"
          value={busquedaMolde}
          onChange={(e) => setBusquedaMolde(e.target.value)}
          onKeyDown={buscarPorMolde} // Llama a la función buscarPorIQMS cuando se presiona una tecla
        />
        <hr />
        <div className="contenedor-tabla-catalogo">
          <table>
            <thead>
              <tr>
                <th>IQMS</th>
                <th>IQMS2</th>
                <th>MOLDE</th>
                <th>URL</th>
                <th>IMAGEN</th>
              </tr>
            </thead>
            <tbody>
              {catalogo.map((elemento, index) => {
                console.log(elemento.imagen);

                return (
                  <tr key={index}>
                    <td>{elemento.iqms}</td>
                    <td>{elemento.familia}</td>
                    <td>{elemento.molde}</td>
                    <td>{elemento.imagen}</td>
                    <td>
                      <img src={elemento.imagen} alt="" width={200} />
                    </td>
                    <td>
                      <BarCode additionalProp={elemento.iqms} />
                    </td>
                    <td>
                      <button onClick={() => eliminarElemento(elemento.iqms)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <BarcodeScanner onScan={handleScan}/>
            {scannedBarcode && <p>Producto encontrado con el código de barras: {scannedBarcode}</p>}
          </table>
          {resultadoBusqueda && (
            <div>
              <h2>Resultado de la Búsqueda</h2>
              <table>
                <thead>
                  <tr>
                    <th>IQMS</th>
                    <th>FAMILIA</th>
                    <th>MOLDE</th>
                    <th>FOTO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{resultadoBusqueda.iqms}</td>
                    <td>{resultadoBusqueda.familia}</td>
                    <td>{resultadoBusqueda.molde}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};
