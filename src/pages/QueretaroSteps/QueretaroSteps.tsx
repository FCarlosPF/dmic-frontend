import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import "../Catalogos/Catalogos.css";


export const QueretaroSteps = () => {

  const navigate = useNavigate();

  const handleClickEmbarque = () =>{
    navigate('/embarque')
    localStorage.setItem("catalogo","Queretaro");
  }
  const handleClickEmpaquetado = () =>{
    navigate('/empaquetado')
    localStorage.setItem("catalogo","Queretaro");
  }

  return (
    <>
    <Header />
    <Title text="Catalogo Queretaro" />
    <section className="tipo-catalogo">      
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
