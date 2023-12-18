import "./Catalogo_USA_QRO.css"

export const Catalogo_USA_QRO_Form = () => {
    return (
        <section className="catalogo-usa-qro">
            <h2>Agregar Nuevo elemento</h2>
            <form className="catalogo-usa-qro-form">
                <label>
                    IQMS1
                    <input className="catalogo-input" type="text" name="" />
                </label>
                <label>
                    IQMS2
                    <input className="catalogo-input" type="text" name="" />
                </label>
                <label>
                    IQMS3
                    <input className="catalogo-input" type="text" name="" />
                </label>
                <label>
                    FAMILIA
                    <input className="catalogo-input" type="text" name="" />
                </label>
                <label>
                    MOLDE1
                    <input className="catalogo-input" type="text" name="" />
                </label>
                <label>
                    MOLDE2
                    <input className="catalogo-input" type="text" name="" />
                </label>
                <label>
                    FOTO
                    <input className="catalogo-input" type="file" name="" />
                </label>
            </form>
            <button className="catalogo-button-add">Agregar</button>

            <hr />

        </section>
    )
}
