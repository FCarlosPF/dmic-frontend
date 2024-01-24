import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import label1 from "../../assets/img/Etiqueta 1_page-0001.jpg";
import label3 from "../../assets/img/Etiqueta 3_page-0001.jpg";
import label2 from "../../assets/img/Etiqueta2.png";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import "./Impresion.css";
import Swal from "sweetalert2";


const Impresion: React.FC = () => {
  const navigate = useNavigate()
  const { stage } = useParams();

  const catalogo = localStorage.getItem("catalogo");
  console.log(catalogo, stage);



  function labelImage() {

    if (stage == "Incoming") {
      return label1
    } else if (stage == "Empaquetado") {
      return label2
    } else
      return label3

  }

  const printImage = () => {
    const image = new Image();
    image.src = labelImage();
    image.onload = () => {
      const win = window.open("", "_blank");
      if (win) {
        win.document.write(
          `<html><head><title>Print Image</title></head><body style="margin: 0;"><img src="${labelImage()}" style="width: 100%; height: auto;" onload="window.print();window.close()" /></body></html>`
        );
        win.document.close();
      }
    };
  };

  function NextStage() {
    switch (catalogo) {
      case "USA":

        if (stage == "Incoming") {
          navigate('/empaquetado')
        } else if (stage == "Empaquetado") {
          navigate('/embarque')
        } else {
          Swal.fire({
            title: "Proceso Exitoso",
            text: "Proceso completado con exito",
            icon: "success"
          });
          navigate('/catalogos')
        }
        break;

      case "China":

        if (stage == "Incoming") {
          navigate('/embarque')
        } else if (stage == "Embarque") {
          Swal.fire({
            title: "Proceso Exitoso",
            text: "Proceso completado con exito",
            icon: "success"
          });
          navigate('/catalogos')
        }

        break;

      case "Queretaro":
       
      if (stage == "Empaquetado") {
          navigate('/embarque')
        } else if (stage == "Embarque") {
          Swal.fire({
            title: "Proceso Exitoso",
            text: "Proceso completado con exito",
            icon: "success"
          });
          navigate('/catalogos')
        }

        break;


      default:
        break;
    }
  }

  return (
    <>
      <Header />
      <Title text="Imprimir etiqueta" />
      <div className="print-container">
        <img
          id="imageToPrint"
          src={labelImage()}
          alt="Imagen a imprimir"
          style={{ display: "none" }}
        />
        <button className="print-button" onClick={printImage}>
          Imprimir
        </button>

        <button className="print-button" onClick={NextStage}>
          Siguiente
        </button>
      </div>
    </>
  );
};

export default Impresion;