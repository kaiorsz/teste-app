import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Venda, deletarVenda, listarVendas } from "../../../api/vendas";

export const ListarVendas = () => {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const novasVendas = await listarVendas();
      setVendas(novasVendas);
    };

    fetchData();
  }, []);

  const handleExcluirVenda = async (id: string) => {
    try {
      await deletarVenda(Number(id));
      const novasVendas = vendas.filter((venda) => venda.id !== Number(id));
      setVendas(novasVendas);
      alert("Venda excluída com sucesso!");
    } catch (error) {
      alert("Erro ao excluir a venda.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Lista de Vendas</h2>
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() => navigate("/vendas/novo")}
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
          Cadastrar nova venda
        </button>

        <Link
          to={"/produtos"}
          style={{ display: "block", width: "100%", textAlign: "center" }}
        >
          <strong style={{ display: "block" }}>Gerenciar Produtos</strong>
        </Link>
      </div>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {vendas.map((venda) => (
          <li
            key={venda.id}
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
                  ID: {venda.id}
                </p>
                <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                  Cliente: {venda.cliente}
                </p>
                <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                  Valor Total: R$ {venda.valor_total.toFixed(2)}
                </p>
              </div>
              <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                <button
                  onClick={() => handleExcluirVenda(String(venda.id))}
                  style={{
                    border: "1px solid #dc3545",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    borderRadius: "5px",
                    cursor: "pointer", // Ajuste para tamanho do botão
                    marginRight: "10px", // Ajuste para separação entre os botões
                  }}
                >
                  Excluir
                </button>
                <Link
                  to={`/vendas/${venda.id}`}
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
