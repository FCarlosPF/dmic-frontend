import { Container } from "react-bootstrap";
import { Catalogo_USA_QRO_Form } from "../../components/Catalogos/Catalogo_USA_QRO/Catalogo_USA_QRO_Form";
import { Catalogo_USA_QRO_Table } from "../../components/Catalogos/Catalogo_USA_QRO/Catalogo_USA_QRO_Table";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import "./CatalogoQueretaro.css";


export const CatalogoQueretaro = () => {

  return (
    <>
      <Header />
      <Title text="Catalogo Queretaro" />
      <Container className="contendor-catalogoChina">

        <Catalogo_USA_QRO_Form />
        <Catalogo_USA_QRO_Table />
      </Container>

    </>
  );
};
