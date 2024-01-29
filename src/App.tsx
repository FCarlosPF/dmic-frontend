import { Route, Routes } from "react-router-dom";
import { Account } from "./pages/Account/Account";
import { CatalogoChina } from "./pages/CatalogoChina/CatalogoChina";
import { CatalogoQueretaro } from "./pages/CatalogoQueretaro/CatalogoQueretaro";
import { CatalogoUSA } from "./pages/CatalogoUSA/CatalogoUSA";
import { Catalogos } from "./pages/Catalogos/Catalogos";
import { ChinaSteps } from "./pages/ChinaSteps/ChinaSteps";
import Embarque from "./pages/Embarque/Embarque";
import Empaquetado from "./pages/Empaquetado/Empaquetado";
import Impresion from "./pages/Impresion/Impresion";
import Incoming from "./pages/Incoming/Incoming";
import { Login } from "./pages/Login/Login";
import { QueretaroSteps } from "./pages/QueretaroSteps/QueretaroSteps";
import { USASteps } from "./pages/USASteps/USASteps";


function App() {
  return (
    <>
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
        <Route path="/chinasteps" element={<ChinaSteps />} />
        <Route path="/queretarosteps" element={<QueretaroSteps />} />
        <Route path="/usasteps" element={<USASteps />} />
      </Routes>
    </>
  );
}

export default App;
