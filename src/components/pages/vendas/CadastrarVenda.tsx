import React from "react";
import { useNavigate } from "react-router-dom";
import { FormVenda } from "./FormVenda";
import { VendaNaoSalvo, VendaPorProduto, criarVenda } from "../../../api/vendas";

export const CadastrarVenda: React.FC = () => {
  const navigate = useNavigate();

  const salvarNoBanco = async (venda: VendaNaoSalvo) => {
    await criarVenda(venda);
    navigate("/vendas");
  };

  return <FormVenda onSave={salvarNoBanco} />;
};
