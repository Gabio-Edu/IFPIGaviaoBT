// Simula a latência de I/O assíncrono (como SQLite/API real).
export const DELAY_MS = 600;

export function atraso(ms: number = DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
