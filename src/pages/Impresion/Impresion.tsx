import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import label1 from "../../assets/img/Etiqueta 1_page-0001.jpg";
import label3 from "../../assets/img/Etiqueta 3_page-0001.jpg";
import label2 from "../../assets/img/Etiqueta2.png";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import { useReactToPrint } from "react-to-print";
import "./Impresion.css";
import { QRCodeCanvas } from 'qrcode.react';
import Label from "./Label";



const Impresion: React.FC = () => {
  const navigate = useNavigate();
  const { stage } = useParams();
  console.log(stage)
  const componentRef = useRef(null);

  const catalogo = localStorage.getItem("catalogo");

  function label() {
    if (stage === "Incoming") {
      return "1";
    } else if (stage === "Empaquetado") {
      return "2";
    } else {
      return "3";
    }
  }

  const handleSuccess = () => {
    Swal.fire({
      title: "Proceso Exitoso",
      text: "Proceso completado con éxito",
      icon: "success",
    });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,

    pageStyle: `
    @page {
      size: 2.84in 4in; /* Puede cambiar 'auto' a 'letter' u otro tamaño si es necesario */
      margin: auto; /* Puede ajustar los márgenes según sea necesario */
      orientation: landscape; /* Cambiar a 'portrait' si se desea orientación vertical */
    }
  `,
  });

  const handleNextStage = () => {
    switch (catalogo) {
      case "USA":
        handleSuccess();
        navigate("/usasteps");
        break;

      case "China":
        handleSuccess();
        navigate("/chinasteps");
        break;

      case "Queretaro":
        handleSuccess();
        navigate("/queretarosteps");
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Header />
      <Title text="Imprimir etiqueta" />
      <div className="print-container">
        <div ref={componentRef}>
          <Label stageNumber={label} />
        </div>

        <button className="print-button" onClick={handlePrint}>
          Imprimir
        </button>

        <button className="print-button" onClick={handleNextStage}>
          Siguiente
        </button>
      </div>
    </>
  );
};

export default Impresion;