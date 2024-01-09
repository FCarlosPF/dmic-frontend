import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { QrCodeScanner } from "../../components/QrCodeScanner";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import "./Catalogos.css";
import { Search } from "../../components/Search/search";
import BarcodeScanner from "../../components/BarCodeScanner";
import BanderaChina from "../../assets/img/bandera_de_china.webp"


export const Catalogos = () => {

  const navigate = useNavigate();

  const handleClickChina = () =>{
    navigate('/incoming')
  }

  const handleClickQueretaro = () =>{
    navigate('/catalogoQueretaro')
  }

  const handleClickUsa = () =>{
    navigate('/catalogoUsa')
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
