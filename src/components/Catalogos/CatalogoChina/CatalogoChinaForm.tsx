import { useState } from "react";
import "../Catalogos.css";
import CatalogoChinaGateway from "../../../gateways/CatalogoChinaGateway";

interface CatalogoItem {
  iqms_aka: number;
  iqms_dg: number;
  molde: string;
}

export const CatalogoChinaForm = () => {
  const [nuevoElemento, setNuevoElemento] = useState<CatalogoItem>({
    iqms_aka: 0,
    iqms_dg: 0,
    molde: "",
  });

  const [] = useState<CatalogoItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const catalogoGateway = new CatalogoChinaGateway();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const agregarElemento = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("iqms_aka", nuevoElemento.iqms_aka.toString());
    formData.append("iqms_dg", nuevoElemento.iqms_dg.toString());
    formData.append("molde", nuevoElemento.molde);
    formData.append("imagen", "s");
    if (selectedFile) {
        formData.append("image", selectedFile);
      }
    console.log(formData);

    catalogoGateway
      .create(formData)

      .then(() => {
        setNuevoElemento({
          iqms_aka: 0,
          iqms_dg: 0,
          molde: "",
        });
        setSelectedFile(null);
      })
      .catch((error) =>
        console.error("Error al agregar nuevo elemento:", error)
      );
  };

  return (
    <section className="catalogo">
      <h2>Agregar Nuevo elemento</h2>
      <form className="catalogo-form" encType="multipart/form-data">
        <label>
          IQMS_AKA
          <input
            type="number"
            placeholder="IQMS"
            className="catalogo-input"
            value={nuevoElemento.iqms_aka}
            onChange={(e) =>
              setNuevoElemento({
                ...nuevoElemento,
                iqms_aka: parseInt(e.target.value),
              })
            }
          />
        </label>
        <label>
          IQMS_DG
          <input
            type="number"
            placeholder="Familia"
            className="catalogo-input"
            value={nuevoElemento.iqms_dg}
            onChange={(e) =>
              setNuevoElemento({
                ...nuevoElemento,
                iqms_dg: parseInt(e.target.value),
              })
            }
          />
        </label>
        <label>
          MOLDE
          <input
            type="text"
            placeholder="Molde"
            className="catalogo-input"
            value={nuevoElemento.molde}
            onChange={(e) =>
              setNuevoElemento({ ...nuevoElemento, molde: e.target.value })
            }
          />
        </label>
        <label>
          Imagen
          <input
            type="file"
            placeholder="Imagen"
            className="catalogoChina-input"
            accept="image/jpg, image/jpeg"
            onChange={onFileChange}
          />
        </label>
      </form>
      <button className="catalogo-button-add" onClick={agregarElemento}>
        Agregar
      </button>
    </section>
  );
};
