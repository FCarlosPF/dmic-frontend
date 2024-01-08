import React from "react";
import imagen from "../../assets/img/Etiqueta 1_page-0001.jpg";
import "./Impresion.css";

const Impresion: React.FC = () => {
  const printImage = () => {
    const image = new Image();
    image.src = imagen;
    image.onload = () => {
      const win = window.open("", "_blank");
      if (win) {
        win.document.write(
          `<html><head><title>Print Image</title></head><body style="margin: 0;"><img src="${imagen}" style="width: 100%; height: auto;" onload="window.print();window.close()" /></body></html>`
        );
        win.document.close();
      }
    };
  };

  return (
    <>
      <div className="print-container">
        <img
          id="imageToPrint"
          src={imagen}
          alt="Imagen a imprimir"
          style={{ display: "none" }}
        />
        <button className="print-button" onClick={printImage}>
          Imprimir
        </button>
      </div>
    </>
  );
};

export default Impresion;
