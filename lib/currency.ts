/**
 * Máscara de moeda em tempo real (BRL, USD, EUR).
 * Input aceita só números; valor salvo sem formatação (ex: 1234.56).
 */

export type CurrencyId = 0 | 1 | 2; // 0 = BRL, 1 = USD, 2 = EUR

const MAX_DIGITS = 12;

/** Extrai apenas dígitos do que o usuário digitou (máx 12 = até 99.999.999.999,99) */
export function parseDigitsFromInput(raw: string): string {
    return raw.replace(/\D/g, "").slice(0, MAX_DIGITS);
}

/** Converte string de dígitos (centavos) para número (valor real para salvar) */
export function digitsToNumber(digits: string): number {
    if (!digits) return 0;
    return Math.round(parseInt(digits, 10)) / 100;
}

/** Converte número (valor real) para string de dígitos (para exibir no input) */
export function numberToDigits(num: number): string {
    if (num <= 0 || Number.isNaN(num)) return "";
    return Math.round(num * 100).toString();
}

/**
 * Formata a string de dígitos para exibição conforme a moeda.
 * Sempre 2 casas decimais; máscara muda enquanto o usuário digita.
 *
 * BRL: 1.234,56  (milhar: . decimal: ,)
 * USD: 1,234.56  (milhar: , decimal: .)
 * EUR: 1.234,56 (milhar: . decimal: ,)
 */
export function formatCurrencyFromDigits(digits: string, currencyId: CurrencyId): string {
    if (!digits) {
        return currencyId === 1 ? "0.00" : "0,00";
    }
    const len = digits.length;
    const cents = len <= 2 ? digits.padStart(2, "0") : digits.slice(-2);
    const intPart = len <= 2 ? "0" : digits.slice(0, -2).replace(/^0+/, "") || "0";
    const withThousand =
        intPart === "0"
            ? "0"
            : intPart.replace(/\B(?=(\d{3})+(?!\d))/g, currencyId === 1 ? "," : ".");
    const decimal = currencyId === 1 ? "." : ",";
    return `${withThousand}${decimal}${cents}`;
}
