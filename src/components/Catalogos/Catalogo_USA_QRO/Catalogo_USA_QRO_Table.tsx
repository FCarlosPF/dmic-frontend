import { useEffect, useState } from "react";

interface CatalogoItem_USA_QRO {
  map?(arg0: (elemento: any, index: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
  iqms1: number;
  iqms2: number;
  iqms3: number;
  familia: string;
  molde1: string;
  molde2: string;
  foto: string;
  onSearch?: (iqms: number) => void
}



export const Catalogo_USA_QRO_Table: React.FC<CatalogoItem_USA_QRO> = (CatalogoItem_USA_QRO) => {


  const [catalogo, setCatalogo] = useState(CatalogoItem_USA_QRO || []);

  useEffect(() => {
    setCatalogo(CatalogoItem_USA_QRO);
  }, [])
  
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

          {/* {catalogo ? catalogo.map((elemento, index) => {
            console.log(elemento.imagen);

            return (
              <tr key={index}>
                <td className="table-element">{elemento.iqms1}</td>
                <td className="table-element">{elemento.iqms2}</td>
                <td className="table-element">{elemento.iqms3}</td>
                <td className="table-element"><a href={elemento.imagen}>{elemento.imagen}</a></td>
                <td className="table-element">
                  <a href="https://ibb.co/s3Jy9hg"><img src={elemento.imagen} /></a>
                </td>
                                    <td>
                      <BarCode additionalProp={elemento.iqms} />
                    </td> 

              </tr>


            )
          })}*/}
        </tbody>
      </table>
    </section>
  )
}
