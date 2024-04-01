import { useState } from "react"

import { ProdutoNaoSalvo, criarProduto } from "../../../api/produtos"
import { FormProduto } from "./FormProduto"
import { useNavigate } from "react-router-dom";

export const CadastrarProduto = () => {
    const navigate = useNavigate();

    const salvarNoBanco = async (produto: ProdutoNaoSalvo) => {
        await criarProduto(produto);
        await navigate("/produtos");
    };

    return <FormProduto onSave={salvarNoBanco} />
}