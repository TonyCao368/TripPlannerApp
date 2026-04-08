// ============================================================
// TRIP DETAIL SCREEN — View destinations in a trip
// ============================================================

import React from "react";
import { Trip, Destination } from "../../models";
import { Theme, SharedStyles } from "../../theme";
import { DestinationCard } from "../components";

interface TripDetailProps {
  trip: Trip;
  allDestinations: Destination[];
  formatPrice: (usd: number) => string;
  onBack: () => void;
  onRemoveDestination: (tripId: string, destId: string) => void;
  totalCost: number;
}

export const TripDetailScreen: React.FC<TripDetailProps> = ({
  trip,
  allDestinations,
  formatPrice,
  onBack,
  onRemoveDestination,
  totalCost,
}) => {
  const tripDests = trip.destinations
    .map((did) => allDestinations.find((d) => d.id === did))
    .filter(Boolean) as Destination[];

  return (
    <div style={SharedStyles.screen}>
      <button style={SharedStyles.backBtn} onClick={onBack}>
        ← Back
      </button>
      <h1 style={SharedStyles.screenTitle}>{trip.name}</h1>
      <p
        style={{
          color: Theme.textMuted,
          fontSize: 13,
          marginBottom: 4,
        }}
      >
        {trip.numPeople} {trip.numPeople === 1 ? "person" : "people"} ·{" "}
        {trip.isPublic ? "Public" : "Private"}
      </p>
      {tripDests.length > 0 && (
        <p
          style={{
            color: Theme.accent,
            fontSize: 15,
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          Total estimated cost: {formatPrice(totalCost)}
        </p>
      )}

      {tripDests.length === 0 && (
        <p style={SharedStyles.mutedText}>
          No destinations added yet. Browse the Home tab to add some.
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {tripDests.map((d) => (
          <DestinationCard
            key={d.id}
            destination={d}
            priceLabel={`${formatPrice(d.price)}/person`}
            action={
              <button
                style={{
                  ...SharedStyles.chip,
                  background: "rgba(239,68,68,0.15)",
                  color: Theme.error,
                  fontSize: 11,
                  alignSelf: "center",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveDestination(trip.id, d.id);
                }}
              >
                Remove
              </button>
            }
          />
        ))}
      </div>
    </div>
  );
};
