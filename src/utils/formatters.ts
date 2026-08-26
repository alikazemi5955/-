/**
 * Formats a number to Tomans with thousands separators and Persian/English numbers support
 */
export function formatPrice(amount: number, showCurrency = true): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '۰ ' + (showCurrency ? 'تومان' : '');
  }
  const formatted = Math.round(amount).toLocaleString('fa-IR');
  return showCurrency ? `${formatted} تومان` : formatted;
}

/**
 * Convert Latin digits to Persian digits
 */
export function toPersianDigits(input: string | number): string {
  if (input === null || input === undefined) return '';
  const str = input.toString();
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, (w) => persianDigits[parseInt(w, 10)]);
}

/**
 * Calculates percentage of discount
 */
export function calculateDiscount(price: number, oldPrice?: number): number {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

/**
 * Formats a Gregorian date or ISO string to Persian readable date
 */
export function formatPersianDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Generates a unique tracking code for Iranian orders
 */
export function generateTrackingCode(): string {
  const prefix = 'PZK';
  const randomNum = Math.floor(10000000 + Math.random() * 90000000);
  return `${prefix}-${randomNum}`;
}
