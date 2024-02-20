// This function takes in an amount (in decimal form), a unit (also decimal),
// and a currency code, and returns the amount formatted as a string
// with the specified currency symbol.
export function formatAmountForDisplay(
  amo: number,  // The amount to be formatted
  unt: number,  // The unit of the amount
  currency: string // The currency code (e.g. "USD")
): string {
  // Create a new Intl.NumberFormat object to format the number as currency
  // with the specified currency code. The 'e,n-US' argument is the locale
  // for the formatting, in this case using the comma as the decimal separator
  // and the period as the thousand separator (suitable for en-US locale).
  let numberFormat = new Intl.NumberFormat(['e,n-US'], {
    style: 'currency',
    currency, // currency code
    currencyDisplay: 'symbol', // display the currency symbol
  })
  // Format the amount using the Intl.NumberFormat object and return the result
  return numberFormat.format(amount)
}

// This function takes in an amount (in decimal form) and a currency code,
// and returns the amount formatted as a number (not a string)
// with the specified currency code. If the currency is a zero-decimal currency,
// the amount will be returned as-is. Otherwise, the amount will be rounded to
// the nearest integer.
export function formatAmountForStripe(
  amount: number, // The amount to be formatted
  currency: string // The currency code (e.g. "USD")
): number {
  // Create a new Intl.NumberFormat object to format the number as currency
  // with the specified currency code. The 'en-US' argument is the locale
  // for the formatting, in this case using the period as the decimal separator
  // and the comma as the thousand separator (suitable for en-US locale).
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
   
