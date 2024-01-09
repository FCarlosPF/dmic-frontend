import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import { Catalogo_USA_QRO_Form } from "../../components/Catalogos/Catalogo_USA_QRO/Catalogo_USA_QRO_Form";
import { Catalogo_USA_QRO_Table } from "../../components/Catalogos/Catalogo_USA_QRO/Catalogo_USA_QRO_Table";
import { QrCodeScanner } from "../../components/QrCodeScanner";
import { Search } from "../../components/Search/search";



export const CatalogoUSA = () => {
 
  return (
    <>
      <Header />
      <Title text="Catalogo USA" />
      <Catalogo_USA_QRO_Form />
      <Search />
      <Catalogo_USA_QRO_Table />
      
     
      
    </>
  );
};
