import axiosInstance from "./axios";

export interface VendaPorProduto {
  quantidade: number;
  id: number;
}

export interface VendaNaoSalvo {
  cliente: string;
  venda_produtos: VendaPorProduto[];
}

export interface Venda extends VendaNaoSalvo {
  id: number;
  valor_total: number;
}

export const listarVendas = async (): Promise<Venda[]> => {
  const response = await axiosInstance.get("/vendas");

  return response.data;
};

export const encontrarVenda = async (id: number): Promise<Venda> => {
  const response = await axiosInstance.get(`/vendas/${id}`);

  return response.data;
};

export const criarVenda = async (venda: VendaNaoSalvo): Promise<void> => {
  await axiosInstance.post("/vendas", { ...venda });
};

export const updateVenda = async (
  id: number,
  venda: VendaNaoSalvo
): Promise<void> => {
  await axiosInstance.put(`/vendas/${id}`, venda);
};

export const deletarVenda = async (id: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/vendas/${id}`);
    if (response.status !== 200) {
      throw new Error("Erro ao excluir a venda");
    }
  } catch (error) {
    throw new Error("Erro ao excluir a venda");
  }
};
