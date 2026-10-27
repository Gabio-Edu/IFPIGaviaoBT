// ============================================================================
// ERROS DE DOMÍNIO
// Hierarquia estruturada: a ViewModel só precisa testar `err instanceof DomainError`
// para decidir se a mensagem pode ser exibida diretamente ao usuário.
// ============================================================================

export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    // Necessário ao estender Error quando o código é transpilado (mantém o instanceof correto)
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "DomainError";
  }
}

/** Violação de uma regra de negócio ou dado de entrada inválido. */
export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

/** Falha ao acessar a fonte de dados (a causa técnica original não vaza para a UI). */
export class DataSourceError extends DomainError {
  readonly causa?: unknown;

  constructor(message: string, causa?: unknown) {
    super(message);
    this.name = "DataSourceError";
    this.causa = causa;
  }
}
