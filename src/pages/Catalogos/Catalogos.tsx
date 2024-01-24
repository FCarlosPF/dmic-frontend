import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import "./Catalogos.css";


export const Catalogos = () => {

  const navigate = useNavigate();

  const handleClickChina = () =>{
    navigate('/chinasteps')
    localStorage.setItem("catalogo","China");
  }

  const handleClickQueretaro = () =>{
    navigate('/queretarosteps')
    localStorage.setItem("catalogo","Queretaro");
  }

  const handleClickUsa = () =>{
    navigate('/usasteps')
    localStorage.setItem("catalogo","USA");
  }

  return (
    <>
    <Header />
    <Title text="Lista de Catalogos" />
    <section className="tipo-catalogo">
      
      <Button variant="dark" className="btn-catalogo" onClick={handleClickChina}>
        Catalogo China
      </Button>
      <Button variant="dark" className="btn-catalogo" onClick={handleClickQueretaro}>
        Catalogo Queretaro
      </Button>
      <Button variant="dark" className="btn-catalogo" onClick={handleClickUsa}>
        Catalogo Estados Unidos
      </Button>
    </section>
  </>
  );
};
