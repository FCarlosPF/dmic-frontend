import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Catalogos } from "./pages/Catalogos/Catalogos";
import { CatalogoChina } from "./pages/CatalogoChina/CatalogoChina";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/catalogos" element={<Catalogos />} />
          <Route path="/catalogoChina" element={<CatalogoChina />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
