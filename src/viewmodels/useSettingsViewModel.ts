// ============================================================
// SETTINGS VIEWMODEL — Currency + Firestore feedback
// ============================================================

import { useState, useCallback } from "react";
import { CurrencyCode } from "../models";
import { submitFeedback as submitFeedbackToDb } from "../services/FirestoreService";
import { updateUserProfile } from "../services/FirestoreService";

export function useSettingsViewModel() {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  const changeCurrency = useCallback(
    async (code: CurrencyCode, userId?: string) => {
      setCurrency(code);
      // Persist to Firestore if userId provided
      if (userId) {
        await updateUserProfile(userId, { currency: code });
      }
    },
    []
  );

  const submitFeedback = useCallback(
    async (userId: string, data: { rating: number; description: string }) => {
      await submitFeedbackToDb({ ...data, userId });
    },
    []
  );

  return {
    currency,
    changeCurrency,
    submitFeedback,
  };
}
