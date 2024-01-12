import { useState } from "react";
import Catalogo_USA_QRO_Gateway from "../../../gateways/Catalogo_USA_QRO_Gateway";
import "../Catalogos.css";

interface CatalogoItem {
    iqms1: number;
    iqms2: number;
    iqms3: number;
    familia: string;
    molde1: string;
    molde2: string;
    foto: string;
}

export const Catalogo_USA_QRO_Form = () => {
   
    const [nuevoElemento, setNuevoElemento] = useState<CatalogoItem>({
        iqms1: 0,
        iqms2: 0,
        iqms3: 0,
        familia: "",
        molde1: "",
        molde2: "",
        foto: "",
    });
    const [catalogo, setCatalogo] = useState<CatalogoItem[]>([]);
    const catalogoGateway = new Catalogo_USA_QRO_Gateway();


    const agregarElemento = (event: React.FormEvent) => {
        event.preventDefault();
    
        catalogoGateway
          .create(nuevoElemento)
          .then((data) => {
            setCatalogo([...catalogo, data]);
            setNuevoElemento({
                iqms1: 0,
                iqms2: 0,
                iqms3: 0,
                familia: "",
                molde1: "",
                molde2: "",
                foto: "",
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
                    IQMS1
                    <input
                        className="catalogo-input"
                        type="number"
                        placeholder="IQMS1"
                        value={nuevoElemento.iqms1}
                        onChange={(e) =>
                            setNuevoElemento({
                                ...nuevoElemento,
                                iqms1: parseInt(e.target.value),
                            })
                        }
                        name="iqms1"
                    />
                </label>
                <label>
                    IQMS2
                    <input
                        className="catalogo-input"
                        type="number"
                        placeholder="IQMS2"
                        value={nuevoElemento.iqms2}
                        onChange={(e) =>
                            setNuevoElemento({
                                ...nuevoElemento,
                                iqms2: parseInt(e.target.value),
                            })
                        }
                        name="iqms2"
                    />
                </label>
                <label>
                    IQMS3
                    <input
                        className="catalogo-input"
                        type="number"
                        placeholder="IQMS3"
                        value={nuevoElemento.iqms3}
                        onChange={(e) =>
                            setNuevoElemento({
                                ...nuevoElemento,
                                iqms3: parseInt(e.target.value),
                            })
                        }
                        name="iqms3" />
                </label>
                <label>
                    FAMILIA
                    <input
                        className="catalogo-input"
                        type="text"
                        placeholder="familia"
                        value={nuevoElemento.familia}
                        onChange={(e) =>
                            setNuevoElemento({
                                ...nuevoElemento,
                                familia: e.target.value,
                            })
                        }
                        name="familia" />
                </label>
                <label>
                    MOLDE1
                    <input
                        className="catalogo-input"
                        type="text"
                        placeholder="molde1"
                        value={nuevoElemento.molde1}
                        onChange={(e) =>
                            setNuevoElemento({
                                ...nuevoElemento,
                                molde1: e.target.value,
                            })
                        }
                        name="molde1"
                    />
                </label>
                <label>
                    MOLDE2
                    <input
                        className="catalogo-input"
                        type="text"
                        placeholder="molde2"
                        value={nuevoElemento.molde2}
                        onChange={(e) =>
                            setNuevoElemento({
                                ...nuevoElemento,
                                molde2: e.target.value,
                            })
                        }
                        name="molde2" />
                </label>
                <label>
                    FOTO
                    <input
                        className="catalogo-input"
                        type="text"
                        placeholder="imagen"
                        value={nuevoElemento.foto}
                        onChange={(e) =>
                            setNuevoElemento({
                                ...nuevoElemento,
                                foto: e.target.value,
                            })
                        }
                        name="imagen"
                    />
                </label>
            </form>
            <button className="catalogo-button-add" onClick={agregarElemento}>Agregar</button>

            <hr />
        </section>

    )
}
