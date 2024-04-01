import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  ProdutoNaoSalvo,
  updateProduto,
  encontrarProduto,
  Produto,
} from "../../../api/produtos";
import { FormVenda } from "./FormVenda";
import {
  Venda,
  VendaNaoSalvo,
  encontrarVenda,
  updateVenda,
} from "../../../api/vendas";

export const EditarVenda = () => {
  const { id } = useParams();
  const [venda, setVenda] = useState<Venda>();
  const navigate = useNavigate();

  useEffect(() => {
    const pesquisar = async () => {
      const vendaRealizada = await encontrarVenda(Number(id));
      setVenda(vendaRealizada);
    };

    pesquisar();
  }, []);

  const salvarNoBanco = async (venda: VendaNaoSalvo) => {
    await updateVenda(Number(id), venda);
    await navigate("/vendas");
  };

  return <>{venda && <FormVenda value={venda} onSave={salvarNoBanco} />}</>;
};
