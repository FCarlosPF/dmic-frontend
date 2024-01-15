import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Account } from "./pages/Account/Account";
import { CatalogoChina } from "./pages/CatalogoChina/CatalogoChina";
import { CatalogoQueretaro } from "./pages/CatalogoQueretaro/CatalogoQueretaro";
import { CatalogoUSA } from "./pages/CatalogoUSA/CatalogoUSA";
import { Catalogos } from "./pages/Catalogos/Catalogos";
import Impresion from "./pages/Impresion/Impresion";
import Incoming from "./pages/Incoming/Incoming";
import { Login } from "./pages/Login/Login";
import Empaquetado from "./pages/Empaquetado/Empaquetado";
import Embarque from "./pages/Embarque/Embarque";


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
          <Route path="/etiqueta/:stage" element={<Impresion />} />
          <Route path="/incoming" element={<Incoming />} />
          <Route path="/empaquetado" element={<Empaquetado />} />
          <Route path="/embarque" element={<Embarque />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
