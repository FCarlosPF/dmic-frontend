import { useEffect, useState } from "react";
import CatalogoUSAGateway from "../../../gateways/Catalogo_USA_QRO_Gateway";
import "../Catalogos.css";

interface CatalogoItem {
  iqms1: number;
  iqms2: number;
  iqms3: number;
  familia: string;
  molde1: string;
  molde2: string;
  foto: any;
}
export const Catalogo_USA_QRO_Table = () => {
  const [catalogo, setCatalogo] = useState<CatalogoItem[]>([]);
  const catalogoGateway = new CatalogoUSAGateway();
  useEffect(() => {
    catalogoGateway
      .getAll()
      .then((data) => {
        setCatalogo(data);
        //console.log("Tipo de dato de catalogo:", typeof data);
        /* if (data.length > 0 && data[0].imagen) {
          console.log("Tipo de dato de la primera imagen:", typeof data[0].imagen);
        } */
      })
      .catch((error) =>
        console.error("Error al obtener elementos del catálogo:", error)
      );
  }, []);

  const eliminarElemento = (iqms: number) => {
    // Eliminar un elemento del catálogo por su ID
    catalogoGateway
      .delete(iqms)
      .then(() => {
        // Actualizar el estado del catálogo eliminando el elemento con el ID dado
        setCatalogo((prevCatalogo) =>
          prevCatalogo.filter((elemento) => elemento.iqms1 !== iqms)
        );
      })
      .catch((error) => console.error("Error al eliminar elemento:", error));
  };
  return (
    <section className="catalogo-usa-qro-container">
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
              {catalogo.map((elemento, index) => {
                console.log(elemento.foto);

                return (
                  <tr key={index}>
                    <td className="table-element">{elemento.iqms1}</td>
                    <td className="table-element">{elemento.iqms2}</td>
                    <td className="table-element">{elemento.iqms3}</td>
                    <td className="table-element">{elemento.familia}</td>
                    <td className="table-element">{elemento.molde1}</td>
                    <td className="table-element">{elemento.molde2}</td>
                    <td className="table-element">
                      {elemento.foto &&
                      typeof elemento.foto === "object" &&
                      "type" in elemento.foto &&
                      elemento.foto.type === "Buffer" &&
                      "data" in elemento.foto ? (
                        <img
                          src={URL.createObjectURL(
                            new Blob([new Uint8Array(elemento.foto.data)])
                          )}
                          alt={`Imagen ${index}`}
                        />
                      ) : (
                        "Imagen no válida"
                      )}
                    </td>
                    {/*                     <td>
                      <BarCode additionalProp={elemento.iqms} />
                    </td> */}
                    <td>
                      <button
                        className="table-button-delete"
                        onClick={() => eliminarElemento(elemento.iqms1)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
    </table>
    </section>
  )
}
