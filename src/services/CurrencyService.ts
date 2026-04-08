// ============================================================
// CURRENCY SERVICE — Handles conversion and formatting
// ============================================================

import { CurrencyCode } from "../models";
import { CURRENCIES } from "../theme";

export function formatPrice(usdPrice: number, currency: CurrencyCode): string {
  const config = CURRENCIES[currency];
  const converted = usdPrice * config.rate;
  return `${config.symbol}${Math.round(converted)}`;
}
