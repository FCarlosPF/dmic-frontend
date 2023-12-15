import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Catalogos } from "./pages/Catalogos/Catalogos";
import { CatalogoChina } from "./pages/CatalogoChina/CatalogoChina";
import { Account } from "./pages/Account/Account";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/catalogos" element={<Catalogos />} />
          <Route path="/catalogoChina" element={<CatalogoChina />} />
          <Route path="/cuenta" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
