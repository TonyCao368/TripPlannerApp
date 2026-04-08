// ============================================================
// TRIPS SCREEN — List, create, manage trips
// ============================================================

import React, { useState } from "react";
import { Trip, Destination } from "../../models";
import { Theme, SharedStyles } from "../../theme";

interface TripsScreenProps {
  trips: Trip[];
  destinations: Destination[];
  formatPrice: (usd: number) => string;
  onCreateTrip: (data: {
    name: string;
    numPeople: number;
    isPublic: boolean;
  }) => void;
  onDeleteTrip: (id: string) => void;
  onTogglePrivacy: (id: string) => void;
  onSelectTrip: (trip: Trip) => void;
  calculateTripCost: (trip: Trip, dests: Destination[]) => number;
}

export const TripsScreen: React.FC<TripsScreenProps> = ({
  trips,
  destinations,
  formatPrice,
  onCreateTrip,
  onDeleteTrip,
  onTogglePrivacy,
  onSelectTrip,
  calculateTripCost,
}) => {
  const [showCreate, setShowCreate] = useState(false);
  const [tripName, setTripName] = useState("");
  const [numPeople, setNumPeople] = useState("1");
  const [isPublic, setIsPublic] = useState(true);

  const createTrip = () => {
    if (!tripName) return;
    onCreateTrip({
      name: tripName,
      numPeople: parseInt(numPeople) || 1,
      isPublic,
    });
    setTripName("");
    setNumPeople("1");
    setShowCreate(false);
  };

  return (
    <div style={SharedStyles.screen}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h1 style={SharedStyles.screenTitle}>My Trips</h1>
        <button
          style={SharedStyles.primaryBtnSm}
          onClick={() => setShowCreate(!showCreate)}
        >
          + New
        </button>
      </div>

      {showCreate && (
        <div style={{ ...SharedStyles.filterPanel, marginBottom: 16 }}>
          <input
            style={SharedStyles.input}
            placeholder="Trip name"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
          />
          <input
            style={SharedStyles.input}
            placeholder="Number of people"
            type="number"
            min="1"
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <span style={{ color: Theme.textMuted, fontSize: 13 }}>
              Visibility:
            </span>
            <button
              onClick={() => setIsPublic(!isPublic)}
              style={{
                ...SharedStyles.chip,
                background: isPublic ? Theme.success : Theme.textDim,
                color: "#fff",
              }}
            >
              {isPublic ? "Public" : "Private"}
            </button>
          </div>
          <button style={SharedStyles.primaryBtn} onClick={createTrip}>
            Create Trip
          </button>
        </div>
      )}

      {trips.length === 0 && (
        <p style={SharedStyles.mutedText}>
          No trips yet. Create one to get started.
        </p>
      )}

      {trips.map((trip) => {
        const tripDests = trip.destinations
          .map((did) => destinations.find((d) => d.id === did))
          .filter(Boolean) as Destination[];
        const totalCost = calculateTripCost(trip, destinations);

        return (
          <div
            key={trip.id}
            style={{
              background: Theme.surface,
              border: `1px solid ${Theme.border}`,
              borderRadius: Theme.radius,
              padding: 16,
              marginBottom: 12,
              cursor: "pointer",
            }}
            onClick={() => onSelectTrip(trip)}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <h3
                  style={{
                    color: Theme.text,
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: Theme.fontDisplay,
                    margin: "0 0 4px",
                  }}
                >
                  {trip.name}
                </h3>
                <p
                  style={{
                    color: Theme.textMuted,
                    fontSize: 12,
                    margin: 0,
                  }}
                >
                  {trip.numPeople}{" "}
                  {trip.numPeople === 1 ? "person" : "people"} ·{" "}
                  {tripDests.length} destinations
                </p>
              </div>
              <span
                style={{
                  ...SharedStyles.chip,
                  background: trip.isPublic
                    ? "rgba(52,211,153,0.15)"
                    : "rgba(139,143,163,0.15)",
                  color: trip.isPublic ? Theme.success : Theme.textMuted,
                  fontSize: 11,
                }}
              >
                {trip.isPublic ? "Public" : "Private"}
              </span>
            </div>
            {tripDests.length > 0 && (
              <p
                style={{
                  color: Theme.accent,
                  fontSize: 13,
                  fontWeight: 600,
                  margin: "8px 0 0",
                }}
              >
                Total: {formatPrice(totalCost)}
              </p>
            )}
            <div
              style={{ display: "flex", gap: 6, marginTop: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                style={{
                  ...SharedStyles.chip,
                  background: Theme.surfaceAlt,
                  color: Theme.textMuted,
                  fontSize: 11,
                }}
                onClick={() => onTogglePrivacy(trip.id)}
              >
                Toggle {trip.isPublic ? "Private" : "Public"}
              </button>
              <button
                style={{
                  ...SharedStyles.chip,
                  background: "rgba(239,68,68,0.15)",
                  color: Theme.error,
                  fontSize: 11,
                }}
                onClick={() => onDeleteTrip(trip.id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
