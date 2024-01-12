import { useState } from "react";
import "../Catalogos.css";
import CatalogoChinaGateway from "../../../gateways/CatalogoChinaGateway";

interface CatalogoItem {
    iqms_aka: number;
    iqms_dg: number;
    molde: string;
    imagen: string;
}

export const CatalogoChinaForm = () => {

    const [nuevoElemento, setNuevoElemento] = useState<CatalogoItem>({
        iqms_aka: 0,
        iqms_dg: 0,
        molde: "",
        imagen: "",
    });

    const [catalogo, setCatalogo] = useState<CatalogoItem[]>([]);
    const catalogoGateway = new CatalogoChinaGateway();


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

    return (
        <section className="catalogo">
            <h2>Agregar Nuevo elemento</h2>
            <form className="catalogo-form">
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
                            setNuevoElemento({ ...nuevoElemento, iqms_dg: parseInt(e.target.value) })
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
                        type="text"
                        placeholder="Imagen"
                        className="catalogo-input"
                        value={nuevoElemento.imagen}
                        onChange={(e) =>
                            setNuevoElemento({ ...nuevoElemento, imagen: e.target.value })
                        }
                    />
                </label>
                
            </form>
            <button className="catalogo-button-add" onClick={agregarElemento}>Agregar</button>

        </section>


    )
}
