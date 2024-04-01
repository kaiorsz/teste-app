import { useState, FormEvent } from "react";

import { Input } from "../../forms/Input";
import { Button } from "../../base/Button";
import { ProdutoNaoSalvo } from "../../../api/produtos";
import { Link } from "react-router-dom";

export interface Props {
  value?: ProdutoNaoSalvo;
  onSave?(produto: ProdutoNaoSalvo): void;
}

export const FormProduto = (props: Props) => {
  const [nome, setNome] = useState(props.value?.nome ?? "");
  const [desc, setDesc] = useState(props.value?.descricao ?? "");
  const [qtde, setQtde] = useState(props.value?.quantidade_disponivel ?? 0);
  const [valor, setValor] = useState(props.value?.valor_unitario ?? 0.0);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    props.onSave?.({
      nome: nome,
      descricao: desc,
      valor_unitario: valor,
      quantidade_disponivel: qtde,
    });
  };

  const handleValorChange = (val: string) => {
    // Verifica se o valor é válido (acima de 0,01) antes de atualizar o estado
    if (parseFloat(val) >= 0.01 || val === "") {
      setValor(parseFloat(val));
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        name="nome"
        label="Nome:"
        value={nome}
        required
        onChange={setNome}
      />
      <Input
        name="descricao"
        label="Descrição:"
        value={desc}
        onChange={setDesc}
      />
      <Input
        name="quantidade-disponivel"
        label="Quantidade disponível:"
        type="number"
        value={qtde}
        required
        min={1}
        onChange={(val) => setQtde(parseInt(val, 10))}
      />
      <Input
        name="valor-unitario"
        label="Valor unitário:"
        type="number"
        value={valor}
        required
        min={0.01} // Definindo valor mínimo
        step="0.01" // Definindo incremento
        onChange={handleValorChange}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="submit">Salvar</Button>

        <Link to={"/produtos"} style={{ width: "55%", textAlign: "right" }}>
          <Button style={{ width: "100%" }}>Cancelar</Button>
        </Link>
      </div>
    </form>
  );
};
