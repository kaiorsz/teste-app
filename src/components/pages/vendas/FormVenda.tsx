import React, { useState, useMemo, FormEvent, useEffect } from "react";
import { Input } from "../../forms/Input";
import { Button } from "../../base/Button";
import { VendaNaoSalvo, VendaPorProduto } from "../../../api/vendas";
import { Produto, listarProdutos } from "../../../api/produtos";
import { Link } from "react-router-dom";

interface Props {
  value?: VendaNaoSalvo;
  onSave?(venda: VendaNaoSalvo): void;
}

const QUANTIDADE_PADRAO = 1;

export const FormVenda: React.FC<Props> = (props) => {
  const [cliente, setCliente] = useState(props.value?.cliente ?? "");
  const [vendaProdutos, setVendaProdutos] = useState<VendaPorProduto[]>(
    props.value?.venda_produtos ?? []
  );

  const [produtoIdAdd, setProdutoIdAdd] = useState<string>();
  const [_quantidadeAdd, setQuantidadeAdd] = useState<string | number>(
    QUANTIDADE_PADRAO
  );

  const quantidadeAdd = useMemo(
    () => parseInt(String(_quantidadeAdd), 10) || 0,
    [_quantidadeAdd]
  );

  const [produtosDisponiveis, setProdutosDisponiveis] = useState<Produto[]>([]);
  const produtosPorCodigo = useMemo(() => {
    const produtosPorCodigo: Record<number, Produto> = {};

    for (const produto of produtosDisponiveis) {
      produtosPorCodigo[produto.id] = produto;
    }

    return produtosPorCodigo;
  }, [produtosDisponiveis]);

  useEffect(() => {
    const pesquisarProdutos = async () => {
      const produtosDispon = await listarProdutos(true);
      setProdutosDisponiveis(produtosDispon);
    };

    pesquisarProdutos();
  }, []);

  const onSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();

      const venda: VendaNaoSalvo = {
        cliente: cliente,
        venda_produtos: vendaProdutos,
      };
  
      await props.onSave?.(venda);
    } catch (error: any) {
      alert("Erro ao salvar venda: " + error.response.data ?? "Erro desconhecido");
    }
  };

  const adicionarProduto = (event: FormEvent) => {
    event.preventDefault();

    if (!produtoIdAdd) {
      return;
    }

    const novoProduto: VendaPorProduto = {
      quantidade: Number(quantidadeAdd),
      id: Number(produtoIdAdd),
    };

    const prod = produtosPorCodigo[Number(produtoIdAdd)];

    if (prod?.quantidade_disponivel < quantidadeAdd) {
      return;
    }

    setVendaProdutos((oldVendas) => [
      ...oldVendas.filter((p) => p.id !== novoProduto.id),
      novoProduto,
    ]);

    setProdutoIdAdd("");
    setQuantidadeAdd(QUANTIDADE_PADRAO);
  };

  return (
    <div>
      <h1>Adicionar venda:</h1>
      <form id="form-venda" onSubmit={onSubmit}>
        <Input
          required
          name="cliente"
          label="Cliente"
          value={cliente}
          onChange={setCliente}
        />

        <div style={{ margin: "20px 0" }}>
          <h4>Produtos:</h4>

          {vendaProdutos.length === 0 ||
          Object.keys(produtosPorCodigo).length === 0 ? (
            <em>Nenhum produto adicionado</em>
          ) : (
            <table style={{ width: "100%", display: "inline-table" }}>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade adicionada</th>
                  <th>Remover</th>
                </tr>
              </thead>
              <tbody>
                {vendaProdutos.map((produto, index) => (
                  <tr key={`${produto.id}-${produto.quantidade}`}>
                    <td>{produtosPorCodigo[produto.id]?.nome}</td>
                    <td>{produto.quantidade}</td>
                    <td>
                      <button
                        style={{
                          border: "none",
                          background: "none",
                          color: "red",
                          textDecoration: "none",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setVendaProdutos((oldVendas) =>
                            oldVendas.filter((v, i) => i !== index)
                          )
                        }
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </form>

      <form
        id="form-produto"
        onSubmit={adicionarProduto}
        style={{ marginBottom: "20px" }}
      >
        <h3>Adicionar/Atualizar produto:</h3>

        <select
          name="codigo"
          required
          value={produtoIdAdd}
          onChange={(event) => setProdutoIdAdd(event.target.value)}
        >
          <option value="" hidden>
            Selecione
          </option>

          {produtosDisponiveis.map((produto) => (
            <option key={produto.id} value={produto.id}>
              {produto.nome} (Disponível {produto.quantidade_disponivel}{" "}
              unidade(s))
            </option>
          ))}
        </select>

        <Input
          name="quantidade"
          label="Quantidade"
          required
          min={1}
          value={_quantidadeAdd}
          type="number"
          onChange={setQuantidadeAdd}
        />

        <Button type="submit" form="form-produto">
          Adicionar/Atualizar produto
        </Button>
      </form>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onSubmit} form="form-venda" style={{ width: "48%" }}>
          Salvar
        </Button>

        <Link to={"/vendas"} style={{ width: "55%", textAlign: "center" }}>
          <Button style={{ width: "100%" }}>Cancelar</Button>
        </Link>
      </div>
    </div>
  );
};
