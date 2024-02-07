import { AxiosError } from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useState } from 'react';
import Logo from "../../assets/img/LOGO_Demic.png";
import TrazabilidadGateway from '../../gateways/TrazabilidadGateway';

interface Trazabilidad {
    hora: string,
    fecha: string,
    id_user: string,
    iqms: string,
    catalogo: string,
    stage: string
}

export default function Label(props : {stageNumber}) {

    let trazabilidadGateway = new TrazabilidadGateway();
    const [data, setData] = useState<Trazabilidad | null>();

    localStorage.setItem("traza", "1");
    let idTraza = localStorage.getItem("traza");


    useEffect(() => {
       
        idTraza == null ? console.error("El Id de traza es null") :
            trazabilidadGateway
                .getTrazaById(idTraza)
                .then((response: any) => {
                    console.log(response)
                    setData(response)
                })
                .catch((error: AxiosError) =>
                    console.error("Error al obtener elementos del catálogo:", error)
                );
    }, [])


    function info() {

        return (
            `
          id_incoming: ${idTraza}
          Hora: ${data?.hora}
          Fecha: ${data?.fecha}
          Id_user: ${data?.id_user}
          Estación : ${data?.stage}
        `
        )
    }

    

    return (
        <div className="printable" style={{ pageBreakAfter: 'always' }}>
            <section>
                <p>Estación</p>
                <p>
                    {props.stageNumber}
                </p>
            </section>
            <section>
                <QRCodeCanvas value={info()}
                    imageSettings={{
                        src: `${Logo}`,
                        x: undefined,
                        y: undefined,
                        height: 24,
                        width: 24,
                        excavate: true,
                    }} />
            </section>
        </div>
    )
}
