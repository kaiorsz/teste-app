import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { ReactNode } from "react";

import App from "./App";
import {
  CadastrarProduto,
  ListarProdutos,
  EditarProduto,
} from "./components/pages/produtos";
import { ListarVendas } from "./components/pages/vendas/ListarVendas";
import { CadastrarVenda } from "./components/pages/vendas/CadastrarVenda";
import { EditarVenda } from "./components/pages/vendas/EditarVenda";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "produtos", element: <ListarProdutos /> },
      { path: "produtos/novo", element: <CadastrarProduto /> },
      { path: "produtos/:id", element: <EditarProduto /> },
      { path: "vendas", element: <ListarVendas /> },
      { path: "vendas/novo", element: <CadastrarVenda /> },
      { path: "vendas/:id", element: <EditarVenda /> },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
