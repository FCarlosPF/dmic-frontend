import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Catalogos } from "./pages/Catalogos/Catalogos";
import { CatalogoChina } from "./pages/CatalogoChina/CatalogoChina";
import { Account } from "./pages/Account/Account";
import { CatalogoQueretaro } from "./pages/CatalogoQueretaro/CatalogoQueretaro";
import { CatalogoUSA } from "./pages/CatalogoUSA/CatalogoUSA";
import  Impresion  from "./pages/Impresion/Impresion";
import { Incoming } from "./components/Stages/Incoming/Incoming";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/catalogos" element={<Catalogos />} />
          <Route path="/catalogoChina" element={<CatalogoChina />} />
          <Route path="/cuenta" element={<Account />} />
          <Route path="/catalogoqueretaro" element={<CatalogoQueretaro />} />
          <Route path="/catalogousa" element={<CatalogoUSA />} />
          <Route path="/etiquetaincoming" element={<Impresion />} />
          <Route path="/incoming" element={<Incoming />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
