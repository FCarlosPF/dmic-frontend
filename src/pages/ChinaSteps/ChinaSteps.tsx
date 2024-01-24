import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import "../Catalogos/Catalogos.css";


export const ChinaSteps = () => {

  const navigate = useNavigate();

  const handleClickIncoming = () =>{
    navigate('/incoming')
    localStorage.setItem("catalogo","China");
  }

  const handleClickEmbarque = () =>{
    navigate('/embarque')
    localStorage.setItem("catalogo","China");
  }


  return (
    <>
    <Header />
    <Title text="Catalogo China" />
    <section className="tipo-catalogo">
      <Button variant="dark" className="btn-catalogo" onClick={handleClickIncoming}>
        Incoming
      </Button>
      <Button variant="dark" className="btn-catalogo" onClick={handleClickEmbarque}>
        Embarque
      </Button>
    </section>
  </>
  );
};
