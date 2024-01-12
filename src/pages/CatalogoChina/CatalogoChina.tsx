import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { CatalogoChinaForm } from "../../components/Catalogos/CatalogoChina/CatalogoChinaForm";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import CatalogoChinaGateway from "../../gateways/CatalogoChinaGateway";
import "./CatalogoChina.css";

interface CatalogoItem {
  iqms_aka: number;
  iqms_dg: number;
  molde: string;
  imagen: string;
}


export const CatalogoChina = () => {
  const [catalogo, setCatalogo] = useState<CatalogoItem[]>([]);
  const catalogoGateway = new CatalogoChinaGateway();
  const [nuevoElemento, setNuevoElemento] = useState<CatalogoItem>({
    iqms_aka: 0,
    iqms_dg: 0,
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
          iqms_aka: 0,
          iqms_dg: 0,
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
          prevCatalogo.filter((elemento) => elemento.iqms_aka !== iqms)
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
        <CatalogoChinaForm />
        <hr />
        <h2>Elementos del Catalogo</h2>
        <section className="contenedor-table-catalogo">
          <table>
            <thead>
              <tr>
                <th className="table-header">IQMS_AKA</th>
                <th className="table-header">IQMS_DG</th>
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
                    <td className="table-element">{elemento.iqms_aka}</td>
                    <td className="table-element">{elemento.iqms_dg}</td>
                    <td className="table-element">{elemento.molde}</td>
                    <td className="table-element"><a href={elemento.imagen}>{elemento.imagen}</a></td>
                    <td className="table-element">
                      <a href="https://ibb.co/s3Jy9hg"><img src={elemento.imagen} /></a>
                    </td>
                    {/*                     <td>
                      <BarCode additionalProp={elemento.iqms} />
                    </td> */}
                    <td>
                      <button className="table-button-delete" onClick={() => eliminarElemento(elemento.iqms_aka)}>
                        Eliminar
                      </button>
                    </td>

                  </tr>

                );
              })}

            </tbody>

          </table>

        </section>

      </Container>
    </>
  );
};
