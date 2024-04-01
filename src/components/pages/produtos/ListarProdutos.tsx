import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Produto, deletarProduto, listarProdutos } from "../../../api/produtos";

export const ListarProdutos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const novosProdutos = await listarProdutos(false);
      setProdutos(novosProdutos);
    };

    fetchData();
  }, []);

  const handleExcluirProduto = async (id: string) => {
    try {
      await deletarProduto(Number(id));
      const novosProdutos = produtos.filter(
        (produto) => produto.id !== Number(id)
      );
      setProdutos(novosProdutos);
      alert("Produto excluído com sucesso!");
    } catch (error: any) {
      alert("Erro ao excluir o produto: " + error.response.data ?? "Erro desconhecido");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Lista de Produtos</h2>
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() => navigate("/produtos/novo")}
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "10px",
            width: "100%",
          }}
        >
          Cadastrar novo produto
        </button>

        <Link
          to={"/vendas"}
          style={{ display: "block", width: "100%", textAlign: "center" }}
        >
          <strong style={{ display: "block" }}>Gerenciar Vendas</strong>
        </Link>
      </div>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {produtos.map((produto) => (
          <li
            key={produto.id}
            style={{
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              backgroundColor: "#f9f9f9",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                  ID: {produto.id}
                </p>
                <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                  Nome: {produto.nome}
                </p>

                <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                  Descrição: {produto.descricao}
                </p>

                <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                  Preço: R$ {produto.valor_unitario}
                </p>
                <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                  Estoque: {produto.quantidade_disponivel} unidades
                </p>
              </div>
              <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                <button
                  onClick={() => handleExcluirProduto(produto.id)}
                  style={{
                    border: "1px solid #dc3545",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Excluir
                </button>
                <Link
                  to={String(produto.id)}
                  style={{
                    backgroundColor: "#007bff",
                    display: "inline",
                    color: "#fff",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  <strong>Editar</strong>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
