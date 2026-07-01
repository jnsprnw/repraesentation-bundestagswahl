const formatterAbsolute = new Intl.NumberFormat('de-DE', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});
const formatterPercent = new Intl.NumberFormat('de-DE', {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});
const formatterPercentRound = new Intl.NumberFormat('de-DE', {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export function formatNumber(num: number): string {
  return formatterAbsolute.format(num);
}

function narrowNoBreakBeforePercent(value: string): string {
  return value.replace(/\s+%/, '\u202F%');
}

export function formatPercent(num: number): string {
  return narrowNoBreakBeforePercent(formatterPercent.format(num));
}

export function formatPercentRound(num: number): string {
  return narrowNoBreakBeforePercent(formatterPercentRound.format(num));
}
