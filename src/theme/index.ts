// ============================================================
// THEME — Design tokens and reusable style objects
// ============================================================

import { CurrencyCode, CurrencyConfig } from "../models";

// Color palette & tokens
export const Theme = {
  bg: "#0F1117",
  surface: "#1A1D27",
  surfaceAlt: "#242836",
  accent: "#FF6B35",
  accentSoft: "rgba(255,107,53,0.12)",
  accentGlow: "rgba(255,107,53,0.3)",
  text: "#F0F0F5",
  textMuted: "#8B8FA3",
  textDim: "#5A5E72",
  border: "#2A2E3D",
  success: "#34D399",
  error: "#EF4444",
  star: "#FBBF24",
  radius: 14,
  radiusSm: 8,
  font: "'DM Sans', sans-serif",
  fontDisplay: "'Bricolage Grotesque', sans-serif",
} as const;

// Currency data
export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "€", rate: 0.92 },
  GBP: { symbol: "£", rate: 0.79 },
  JPY: { symbol: "¥", rate: 149.5 },
};

// Available filter tags
export const TAGS_LIST = [
  "nature",
  "historic",
  "culture",
  "music",
  "adventure",
  "food",
  "beach",
  "nightlife",
];

// Google Fonts link for injection
export const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap";

// ============================================================
// SHARED STYLE OBJECTS
// ============================================================

const T = Theme;

export const SharedStyles = {
  // Layout
  screen: {
    padding: "20px 16px",
  } as React.CSSProperties,

  screenTitle: {
    fontFamily: T.fontDisplay,
    fontSize: 28,
    fontWeight: 800,
    color: T.text,
    margin: "0 0 16px",
    letterSpacing: -0.5,
  } as React.CSSProperties,

  sectionTitle: {
    fontFamily: T.fontDisplay,
    fontSize: 18,
    fontWeight: 700,
    color: T.text,
    margin: "0 0 12px",
  } as React.CSSProperties,

  // Inputs
  input: {
    width: "100%",
    padding: "12px 14px",
    background: T.surfaceAlt,
    border: `1px solid ${T.border}`,
    borderRadius: T.radiusSm,
    color: T.text,
    fontSize: 14,
    fontFamily: T.font,
    marginBottom: 12,
    outline: "none",
    boxSizing: "border-box" as const,
  } as React.CSSProperties,

  // Buttons
  primaryBtn: {
    width: "100%",
    padding: "12px 20px",
    background: T.accent,
    color: "#fff",
    border: "none",
    borderRadius: T.radiusSm,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: T.font,
    cursor: "pointer",
  } as React.CSSProperties,

  primaryBtnSm: {
    padding: "8px 16px",
    background: T.accent,
    color: "#fff",
    border: "none",
    borderRadius: T.radiusSm,
    fontSize: 13,
    fontWeight: 600,
    fontFamily: T.font,
    cursor: "pointer",
  } as React.CSSProperties,

  secondaryBtn: {
    width: "100%",
    padding: "12px 20px",
    background: "transparent",
    color: T.text,
    border: `1px solid ${T.border}`,
    borderRadius: T.radiusSm,
    fontSize: 14,
    fontWeight: 500,
    fontFamily: T.font,
    cursor: "pointer",
  } as React.CSSProperties,

  smallBtn: {
    padding: "10px 14px",
    border: `1px solid ${T.border}`,
    borderRadius: T.radiusSm,
    fontSize: 16,
    cursor: "pointer",
    color: T.text,
  } as React.CSSProperties,

  // Chip/Tag
  chip: {
    padding: "6px 12px",
    borderRadius: 20,
    border: "none",
    fontSize: 12,
    fontWeight: 500,
    fontFamily: T.font,
    cursor: "pointer",
  } as React.CSSProperties,

  // Cards
  card: {
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderRadius: T.radius,
    padding: 14,
  } as React.CSSProperties,

  filterPanel: {
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderRadius: T.radius,
    padding: 14,
  } as React.CSSProperties,

  // Text
  mutedText: {
    color: T.textMuted,
    fontSize: 13,
  } as React.CSSProperties,

  label: {
    color: T.textMuted,
    fontSize: 12,
    fontWeight: 600,
    margin: "0 0 4px",
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
  } as React.CSSProperties,

  link: {
    color: T.accent,
    cursor: "pointer",
    fontWeight: 600,
  } as React.CSSProperties,

  errorBanner: {
    background: "rgba(239,68,68,0.12)",
    color: T.error,
    padding: "10px 14px",
    borderRadius: T.radiusSm,
    fontSize: 13,
    marginBottom: 12,
  } as React.CSSProperties,

  backBtn: {
    background: "none",
    border: "none",
    color: T.accent,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: T.font,
    cursor: "pointer",
    padding: "0 0 12px",
  } as React.CSSProperties,

  starBtn: {
    background: "none",
    border: "none",
    fontSize: 28,
    cursor: "pointer",
    padding: 2,
  } as React.CSSProperties,

  // Avatars
  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: T.accentSoft,
    color: T.accent,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    fontWeight: 700,
    flexShrink: 0,
  } as React.CSSProperties,

  avatarLg: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: T.accentSoft,
    color: T.accent,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 28,
    fontWeight: 700,
  } as React.CSSProperties,

  // Destination-specific
  ratingBadge: {
    background: T.accentSoft,
    color: T.accent,
    padding: "3px 8px",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
  } as React.CSSProperties,

  tagSmall: {
    background: T.surfaceAlt,
    color: T.textDim,
    padding: "2px 8px",
    borderRadius: 4,
    fontSize: 11,
  } as React.CSSProperties,
};
