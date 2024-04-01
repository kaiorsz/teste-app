import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  ProdutoNaoSalvo,
  updateProduto,
  encontrarProduto,
  Produto,
} from "../../../api/produtos";
import { FormProduto } from "./FormProduto";

export const EditarProduto = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState<Produto>();
  const navigate = useNavigate();

  useEffect(() => {
    const pesquisar = async () => {
      const prod = await encontrarProduto(Number(id));
      setProduto(prod);
    };

    pesquisar();
  }, []);

  const salvarNoBanco = async (produto: ProdutoNaoSalvo) => {
    await updateProduto(Number(id), produto);
    await navigate("/produtos");
  };

  return (
    <>{produto && <FormProduto value={produto} onSave={salvarNoBanco} />}</>
  );
};
