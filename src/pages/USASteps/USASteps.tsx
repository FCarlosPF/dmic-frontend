import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import "../Catalogos/Catalogos.css";


export const USASteps = () => {

  const navigate = useNavigate();

  const handleClickIncoming = () =>{
    navigate('/incoming')
    localStorage.setItem("catalogo","USA");
  }

  const handleClickEmbarque = () =>{
    navigate('/embarque')
    localStorage.setItem("catalogo","USA");
  }
  const handleClickEmpaquetado = () =>{
    navigate('/empaquetado')
    localStorage.setItem("catalogo","USA");
  }

  return (
    <>
    <Header />
    <Title text="Catalogo USA" />
    <section className="tipo-catalogo">
      <Button variant="dark" className="btn-catalogo" onClick={handleClickIncoming}>
        Incoming
      </Button>
      <Button variant="dark" className="btn-catalogo" onClick={handleClickEmpaquetado}>
        Empaque
      </Button>
      <Button variant="dark" className="btn-catalogo" onClick={handleClickEmbarque}>
        Embarque
      </Button>
    </section>
  </>
  );
};
