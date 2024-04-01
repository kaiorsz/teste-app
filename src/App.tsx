import { Outlet } from "react-router-dom";

import Message from "./Message";
import { CadastrarProduto, ListarProdutos } from "./components/pages/produtos";
import { Routes } from "./Routes";

function App() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
