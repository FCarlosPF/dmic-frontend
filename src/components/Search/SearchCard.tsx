

export default function SearchCard(props: { resultadoBusqueda: any }) {
    return (
        <section className="search-card">
            <aside className="search-card-col-img">
                {props.resultadoBusqueda.imagen &&
                    typeof props.resultadoBusqueda.imagen === "object" &&
                    "type" in props.resultadoBusqueda.imagen &&
                    props.resultadoBusqueda.imagen.type === "Buffer" &&
                    "data" in props.resultadoBusqueda.imagen ? (
                    <img
                        src={URL.createObjectURL(
                            new Blob([
                                new Uint8Array(props.resultadoBusqueda.imagen.data),
                            ])
                        )}
                        alt={`Imagen ${props.resultadoBusqueda.iqms_aka}`}
                    />
                ) : (
                    "Imagen no válida"
                )}
            </aside>
            <aside className="search-card-col-info">
                <table>
                    <thead>
                        <tr>
                            <th className="table-header">IQMS_AKA</th>
                            <th className="table-header">FAMILIA_DG</th>
                            <th className="table-header">MOLDE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="table-element">
                                {props.resultadoBusqueda.iqms_aka}
                            </td>
                            <td className="table-element">{props.resultadoBusqueda.iqms_dg}</td>
                            <td className="table-element">{props.resultadoBusqueda.molde}</td>

                        </tr>
                    </tbody>
                </table>
            </aside>
        </section >
    )
}
