import { Container } from "react-bootstrap";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import "./Catalogos.css";

export const Catalogos = () => {

  const role = localStorage.getItem("role");
  

  function addCatalogo() {
    return (
      <>
        <h2>Añadir Catalogos</h2>
        <section className="tipo-catalogo">
          <CustomButton
            text="Añadir Catalogo China"
            path="/catalogoChina"
          />
          <CustomButton
            text="Añadir Catalogo USA"
            path="/catalogousa"
          />
          <CustomButton
            text="Añadir Catalogo Queretaro"
            path="/catalogoqueretaro"
          />
        </section>
      </>
    )
  }

  return (
    <>
      <Header />
      <Title text="Lista de Catalogos" />
      <Container >
        <h2>Seleccionar Catalogo</h2>
        <section className="tipo-catalogo">
          <CustomButton
            text="Catalogo China"
            path="/chinasteps"
            storageKey="catalogo"
            storage="China"
          />
          <CustomButton
            text="Catalogo Estados Unidos"
            path="/usasteps"
            storageKey="catalogo"
            storage="USA"
          />
          <CustomButton
            text="Catalogo Queretaro"
            path="/queretarosteps"
            storageKey="catalogo"
            storage="Queretaro"
          />
        </section>
        <hr />

        {role == "admin" && addCatalogo() }
      </Container>
    </>
  );
};
