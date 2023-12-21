import "./CatalogoQueretaro.css";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import { Catalogo_USA_QRO_Form } from "../../components/Catalogos/Catalogo_USA_QRO/Catalogo_USA_QRO_Form";
import { Catalogo_USA_QRO_Table } from "../../components/Catalogos/Catalogo_USA_QRO/Catalogo_USA_QRO_Table";


interface CatalogoItem {
  iqms: number;
  familia: string;
  molde: string;
  imagen: string;
}

export const CatalogoQueretaro = () => {
  
  return (
    <>
      <Header />
      <Title text="Catalogo Queretaro" />
      <Catalogo_USA_QRO_Form />
      <Catalogo_USA_QRO_Table />
    </>
  );
};
