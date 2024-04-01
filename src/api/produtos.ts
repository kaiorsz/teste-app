import axiosInstance from "./axios";

export interface ProdutoNaoSalvo {
  nome: string;
  descricao: string;
  quantidade_disponivel: number;
  valor_unitario: number;
}

export interface Produto extends ProdutoNaoSalvo {
  id: number;
}

export const listarProdutos = async (
  disponivel: boolean
): Promise<Produto[]> => {
  const response = await axiosInstance.get("/produtos", {
    params: { disponivel },
  });

  return response.data;
};

export const encontrarProduto = async (id: number): Promise<Produto> => {
  const response = await axiosInstance.get(`/produtos/${id}`);

  return response.data;
};

export const criarProduto = async (produto: ProdutoNaoSalvo): Promise<void> => {
  await axiosInstance.post("/produtos", produto);
};

export const updateProduto = async (
  id: number,
  produto: ProdutoNaoSalvo
): Promise<void> => {
  await axiosInstance.put(`/produtos/${id}`, produto);
};

export const deletarProduto = async (id: number): Promise<void> => {
  const response = await axiosInstance.delete(`/produtos/${id}`);
};
