export type Currency = 'USD' | 'EUR' | 'COP'

export const formatMoney = (amount: number, currency: Currency) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
