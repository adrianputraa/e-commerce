/**
 * format the value into localized currency value
 * @param value number
 * @param currency IDR | USD | CNY. defaults to IDR
 * @returns formatted number in string
 */
export function formatValueToCurrency(value: string | number, currency: "IDR" | "USD" | "CNY" = "IDR"): string {
    const _val = typeof value === "string" ? Number(value) : value
    const localFormat = new Intl.NumberFormat(
        currency === "CNY" ? "zh-ZH" 
        : currency === "USD" ? "en-US" 
        : "id-ID", { style: "currency", currency }
    )

    return localFormat.format(_val)
}