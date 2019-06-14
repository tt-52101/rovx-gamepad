const pln_formatter = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
  minimumFractionDigits: 0
});
const usd_formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});
const euro_formatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0
});

export function formatPrice(price, original_currency = 'usd') {
  if (original_currency === 'pln') {
    return pln_formatter.format(price);
  }
  if (original_currency === 'euro') {
    return euro_formatter.format(price);
  }
  if (original_currency === 'usd') {
    return usd_formatter.format(price);
  }
  return `${price} ${original_currency}`;
}
export function exchangeCurrency(
  price,
  original_currency,
  userCurrency = 'usd'
) {
  const rates = {
    usd_euro: 3.6 / 4.2,
    usd_pln: 3.6 / 1,
    euro_pln: 4.2 / 1,
    euro_usd: 4.2 / 3.6,
    pln_usd: 1 / 3.6,
    pln_euro: 1 / 4.2
  };
  const rate = rates[`${original_currency}_${userCurrency}`];
  if (rate) {
    return price * rate;
  }
  return '-';
}
