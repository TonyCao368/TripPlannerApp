// ============================================================
// SETTINGS SCREEN — Currency, feedback, logout
// ============================================================

import React, { useState } from "react";
import { CurrencyCode } from "../../models";
import { Theme, SharedStyles, CURRENCIES } from "../../theme";
import { StarRating } from "../components";

interface SettingsScreenProps {
  currency: CurrencyCode;
  onChangeCurrency: (c: CurrencyCode) => void;
  onLogout: () => void;
  onSubmitFeedback: (data: { rating: number; description: string }) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  currency,
  onChangeCurrency,
  onLogout,
  onSubmitFeedback,
}) => {
  const [fbRating, setFbRating] = useState(0);
  const [fbText, setFbText] = useState("");
  const [fbSent, setFbSent] = useState(false);

  const submitFeedback = () => {
    if (fbRating === 0) return;
    onSubmitFeedback({ rating: fbRating, description: fbText });
    setFbSent(true);
    setFbRating(0);
    setFbText("");
  };

  return (
    <div style={SharedStyles.screen}>
      <h1 style={SharedStyles.screenTitle}>Settings</h1>

      {/* Currency */}
      <div style={{ ...SharedStyles.filterPanel, marginBottom: 16 }}>
        <h3 style={SharedStyles.sectionTitle}>Currency</h3>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
            <button
              key={c}
              onClick={() => onChangeCurrency(c)}
              style={{
                ...SharedStyles.chip,
                background:
                  currency === c ? Theme.accent : Theme.surfaceAlt,
                color: currency === c ? "#fff" : Theme.textMuted,
              }}
            >
              {CURRENCIES[c].symbol} {c}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback */}
      <div style={{ ...SharedStyles.filterPanel, marginBottom: 16 }}>
        <h3 style={SharedStyles.sectionTitle}>App Feedback</h3>
        {fbSent ? (
          <p style={{ color: Theme.success, fontSize: 14 }}>
            Thanks for your feedback!
          </p>
        ) : (
          <>
            <p style={SharedStyles.label}>Rating</p>
            <div style={{ marginBottom: 12 }}>
              <StarRating rating={fbRating} onChange={setFbRating} />
            </div>
            <textarea
              style={{
                ...SharedStyles.input,
                minHeight: 60,
              }}
              placeholder="Tell us what you think (optional)"
              value={fbText}
              onChange={(e) => setFbText(e.target.value)}
            />
            <button style={SharedStyles.primaryBtn} onClick={submitFeedback}>
              Submit Feedback
            </button>
          </>
        )}
      </div>

      {/* Logout */}
      <button
        style={{
          ...SharedStyles.secondaryBtn,
          color: Theme.error,
          borderColor: Theme.error,
        }}
        onClick={onLogout}
      >
        Log Out
      </button>
    </div>
  );
};
