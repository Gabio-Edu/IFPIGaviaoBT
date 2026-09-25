// ============================================================================
// SIMULAÇÃO DO BANCO DE DADOS LOCAL (IFPI GAVIÃO)
// ATENÇÃO: Este banco simula um atraso de rede/I/O assíncrono (como SQLite/API real)
// No padrão Big Tripe, as telas importam e manipulam diretamente estas funções e dados
// sem tipagem formal, repositórios ou ViewModels.
// ============================================================================

import { Category } from "../model/entities/Category";
import { Product } from "../model/entities/Product";

const DELAY_MS = 600; // Simula 600ms de latência de consulta local

export const BANCO_CATEGORIAS: Category[] = [
  {
    id: "comidas",
    nome: "Comidas",
    corBorda: "#501673",
    corSeta: "#501673",
    imagem: "categoria-comidas",
  },
  {
    id: "bebidas",
    nome: "Bebidas",
    corBorda: "#1b873f",
    corSeta: "#1b873f",
    imagem: "categoria-bebidas",
  },
];

export const BANCO_PRODUTOS: Product[] = [
  {
    id: "pastel-de-carne",
    categoriaId: "comidas",
    categoriaNome: "Comida",
    nome: "Pastel de Carne",
    preco: 6.0,
    descricao:
      "Pastel frito na hora bem crocante e sequinho, com recheio farto de carne moída selecionada, temperada com cheiro verde e azeitonas.",
    proteinas: "14g",
    carboidratos: "32g",
    gorduras: "18g",
    imagem: "pastel-de-carne",
    imagemGrande: "pastel-de-carne",
  },

  {
    id: "coxinha-de-frango",
    categoriaId: "comidas",
    categoriaNome: "Comida",
    nome: "Coxinha de Frango",
    preco: 7.0,
    descricao:
      "Clássica coxinha de frango com massa macia de batata, empanada crocante dourada por fora e recheio de peito de frango desfiado com requeijão.",
    proteinas: "18g",
    carboidratos: "38g",
    gorduras: "15g",
    imagem: "coxinha-de-frango",
    imagemGrande: "coxinha-de-frango",
  },

  {
    id: "cuscuz-com-ovo",
    categoriaId: "comidas",
    categoriaNome: "Comida",
    nome: "Cuscuz com Ovo",
    preco: 8.0,
    descricao:
      "Tradicional cuscuz nordestino de milho flocado feito no vapor, servido quentinho com ovo frito na manteiga da terra e uma pitada de sal.",
    proteinas: "12g",
    carboidratos: "40g",
    gorduras: "9g",
    imagem: "cuscuz-com-ovo",
    imagemGrande: "cuscuz-com-ovo",
  },

  {
    id: "arrumadinho-completo",
    categoriaId: "comidas",
    categoriaNome: "Comida",
    nome: "Arrumadinho Completo",
    preco: 14.0,
    descricao:
      "Carne de sol desfiada, arroz branco soltinho e creme de galinha caseiro.",
    proteinas: "22g",
    carboidratos: "45g",
    gorduras: "12g",
    imagem: "arrumadinho-completo",
    imagemGrande: "arrumadinho-completo-large",
  },

  {
    id: "suco-de-laranja",
    categoriaId: "bebidas",
    categoriaNome: "Bebida",
    nome: "Suco de Laranja",
    preco: 7.0,
    descricao:
      "Suco 100% natural de laranjas frescas espremidas na hora, sem conservantes, servido com gelo bem refrescante.",
    proteinas: "2g",
    carboidratos: "26g",
    gorduras: "0g",
    imagem: "suco-de-laranja",
    imagemGrande: "suco-de-laranja",
  },

  {
    id: "refrigerante-lata",
    categoriaId: "bebidas",
    categoriaNome: "Bebida",
    nome: "Refrigerante Lata",
    preco: 5.0,
    descricao:
      "Refrigerante geladíssimo em lata 350ml. Escolha entre Coca-Cola tradicional, Coca-Cola Zero ou Guaraná Antarctica.",
    proteinas: "0g",
    carboidratos: "37g",
    gorduras: "0g",
    imagem: "refrigerante",
    imagemGrande: "refrigerante",
  },

  {
    id: "cafe-expresso",
    categoriaId: "bebidas",
    categoriaNome: "Bebida",
    nome: "Café Expresso",
    preco: 4.0,
    descricao:
      "Café expresso curto encorpado e aromático, feito com grãos especiais moídos na hora, com crema espessa e sabor marcante.",
    proteinas: "0g",
    carboidratos: "1g",
    gorduras: "0g",
    imagem: "cafe-expresso",
    imagemGrande: "cafe-expresso",
  },

  {
    id: "suco-acerola",
    categoriaId: "bebidas",
    categoriaNome: "Bebida",
    nome: "Suco de Acerola",
    preco: 6.5,
    descricao:
      "Suco de acerola com polpa pura, fonte concentrada de vitamina C e antioxidantes, servido com pedras de gelo.",
    proteinas: "1g",
    carboidratos: "15g",
    gorduras: "0g",
    imagem: "suco-acerola",
    imagemGrande: "suco-acerola",
  },
];

// Funções de consulta com simulação de delay assíncrono (simulando IO de banco de dados)
export async function simularConsultaCategorias(): Promise<Category[]> {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  return [...BANCO_CATEGORIAS];
}

export async function simularConsultaProdutosPorCategoria(categoriaId: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  return BANCO_PRODUTOS.filter((p) => p.categoriaId === categoriaId);
}

export async function simularConsultaProdutoPorId(produtoId: string): Promise<Product | undefined> {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  return BANCO_PRODUTOS.find((p) => p.id === produtoId);
}
