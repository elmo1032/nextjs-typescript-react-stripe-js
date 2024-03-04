/**
 * Formats an amount for display in a human-readable format with the specified currency.
 * This function uses the Intl.NumberFormat object to format the amount according to the en-US locale.
 * It returns the formatted amount as a string.
 *
 * @param amount - The amount to format, as a number.
 * @param currency - The currency to use for formatting, as a string.
 * @returns The formatted amount as a string.
 */
export function formatAmountForDisplay(amount: number, currency: string): string {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  });
  return numberFormat.format(amount);
}

/**
 * Formats an amount for use with Stripe's API, which requires amounts to be represented as integers
 * (in cents) for currencies with a decimal fraction, and as integers (without decimal fraction)
 * for currencies without a decimal fraction. This function uses the Intl.NumberFormat object to
 * determine whether the currency has a decimal fraction, and formats the amount accordingly.
 * It returns the formatted amount as a number.
 *
 * @param amount - The amount to format, as a number.
 * @param currency - The currency to use for formatting, as a string.
 * @returns The formatted amount as a number.
 */
export function formatAmountForStripe(amount: number, currency: string): number {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}
