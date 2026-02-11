/**
 * Remove tudo que não for dígito
 */
export function stripNonDigits(value: string): string {
    return value.replace(/\D/g, "");
}

/**
 * Máscara CPF: 000.000.000-00 (máx 11 dígitos)
 */
export function formatCPF(value: string): string {
    const digits = stripNonDigits(value).slice(0, 11);
    return digits
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

/**
 * Máscara CNPJ: 00.000.000/0000-00 (máx 14 dígitos)
 */
export function formatCNPJ(value: string): string {
    const digits = stripNonDigits(value).slice(0, 14);
    return digits
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

/**
 * Aplica máscara conforme tipo: "cpf" | "cnpj" | "other"
 * "other" retorna o valor sem máscara (apenas strip se quiser, ou deixa livre)
 */
export function formatDocument(
    value: string,
    type: "cpf" | "cnpj" | "other"
): string {
    if (type === "cpf") return formatCPF(value);
    if (type === "cnpj") return formatCNPJ(value);
    return value;
}

/**
 * Para campos só número: aceita apenas dígitos no input
 */
export function onlyDigits(value: string): string {
    return stripNonDigits(value);
}
