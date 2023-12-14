import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { QrCodeScanner } from "../../components/QrCodeScanner";

export const Catalogos = () => {
  const navigate = useNavigate();

  const handleClickChina = () =>{
    navigate('/catalogoChina')
  }

  const handleClickQueretaro = () =>{
    navigate('/catalogoQueretaro')
  }

  console.log("prueba")

  return (
    <>
      <h1>Lista de Catalogos</h1>

      <Button variant="dark" className="catalogo" onClick={handleClickChina}>
        Catalogo China
      </Button>
      <Button variant="dark" className="catalogo" onClick={handleClickQueretaro}>
        Catalogo Queretaro
      </Button>
      <QrCodeScanner/>
    </>
  );
};
