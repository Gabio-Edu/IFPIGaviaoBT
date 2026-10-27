import { DomainError } from "@/model/errors";

/** Params do expo-router podem chegar como string | string[] | undefined. */
export function normalizarParametro(valor: string | string[] | undefined): string {
  return (Array.isArray(valor) ? valor[0] : valor) ?? "";
}

/** Erros de domínio têm mensagem segura para o usuário; os demais usam a mensagem padrão. */
export function mensagemDeErro(erro: unknown, mensagemPadrao: string): string {
  return erro instanceof DomainError ? erro.message : mensagemPadrao;
}

export function formatarPreco(valor: number): string {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}
