// ============================================================
// REVIEW CARD — Displays a single review
// ============================================================

import React from "react";
import { Review } from "../../models";
import { Theme } from "../../theme";

interface ReviewCardProps {
  review: Review;
  onClick?: () => void;
  showDestName?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review: r,
  onClick,
  showDestName = false,
}) => {
  return (
    <div
      style={{
        background: Theme.surface,
        border: `1px solid ${Theme.border}`,
        borderRadius: Theme.radius,
        padding: 14,
        marginBottom: 10,
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      {showDestName ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <span
              style={{ color: Theme.text, fontSize: 14, fontWeight: 600 }}
            >
              {r.destName}
            </span>
            <span style={{ color: Theme.star, fontSize: 12 }}>
              {"★".repeat(r.rating)}
            </span>
          </div>
          <p
            style={{
              color: Theme.textDim,
              fontSize: 11,
              margin: "0 0 4px",
            }}
          >
            {r.destLocation} ·{" "}
            {new Date(r.timestamp).toLocaleDateString()}
          </p>
          {r.description && (
            <p
              style={{
                color: Theme.textMuted,
                fontSize: 13,
                margin: 0,
              }}
            >
              {r.description}
            </p>
          )}
          {onClick && (
            <span
              style={{
                color: Theme.accent,
                fontSize: 11,
                marginTop: 6,
                display: "inline-block",
              }}
            >
              Tap to edit →
            </span>
          )}
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(255,107,53,0.12)",
                color: Theme.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {r.userPhoto || r.userName.charAt(0)}
            </div>
            <div>
              <div
                style={{
                  color: Theme.text,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {r.userName}
              </div>
              <div style={{ color: Theme.textDim, fontSize: 11 }}>
                {new Date(r.timestamp).toLocaleDateString()}
              </div>
            </div>
            <div
              style={{
                marginLeft: "auto",
                color: Theme.star,
                fontSize: 13,
              }}
            >
              {"★".repeat(r.rating)}
              {"☆".repeat(5 - r.rating)}
            </div>
          </div>
          {r.description && (
            <p
              style={{
                color: Theme.textMuted,
                fontSize: 13,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {r.description}
            </p>
          )}
        </>
      )}
    </div>
  );
};
