// ============================================================
// DESTINATION CARD — Used in Home list and Trip detail
// ============================================================

import React from "react";
import { Destination } from "../../models";
import { Theme, SharedStyles } from "../../theme";

interface DestinationCardProps {
  destination: Destination;
  onClick?: () => void;
  priceLabel?: string;
  action?: React.ReactNode;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination: d,
  onClick,
  priceLabel,
  action,
}) => {
  return (
    <div
      style={{
        background: Theme.surface,
        border: `1px solid ${Theme.border}`,
        borderRadius: Theme.radius,
        padding: 14,
        display: "flex",
        gap: 14,
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      {d.image?.startsWith("http") ? (
        <img
          src={d.image}
          alt={d.name}
          style={{
            width: 60,
            height: 60,
            borderRadius: Theme.radiusSm,
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
      ) : (
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: Theme.radiusSm,
            background: Theme.surfaceAlt,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            flexShrink: 0,
          }}
        >
          {d.image}
        </div>
      )}
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              color: Theme.text,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: Theme.fontDisplay,
              margin: 0,
            }}
          >
            {d.name}
          </h3>
          <span style={SharedStyles.ratingBadge}>★ {d.rating}</span>
        </div>
        <p style={{ color: Theme.textMuted, fontSize: 12, margin: "2px 0 0" }}>
          📍 {d.location}
        </p>
        {priceLabel && (
          <p
            style={{
              color: Theme.accent,
              fontSize: 13,
              fontWeight: 600,
              margin: "4px 0 0",
            }}
          >
            {priceLabel}
          </p>
        )}
        <div
          style={{
            display: "flex",
            gap: 4,
            marginTop: 6,
            flexWrap: "wrap",
          }}
        >
          {d.tags.map((tag) => (
            <span key={tag} style={SharedStyles.tagSmall}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      {action}
    </div>
  );
};
