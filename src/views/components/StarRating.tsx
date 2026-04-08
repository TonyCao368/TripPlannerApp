// ============================================================
// STAR RATING — Reusable interactive star picker
// ============================================================

import React from "react";
import { Theme, SharedStyles } from "../../theme";

interface StarRatingProps {
  rating: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onChange,
  readonly = false,
  size = 28,
}) => {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          onClick={() => !readonly && onChange?.(s)}
          style={{
            ...SharedStyles.starBtn,
            fontSize: size,
            color: s <= rating ? Theme.star : Theme.textDim,
            cursor: readonly ? "default" : "pointer",
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
};
