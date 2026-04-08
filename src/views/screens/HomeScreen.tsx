// ============================================================
// HOME SCREEN — Destination browsing with search/filter/sort
// ============================================================

import React from "react";
import { Destination } from "../../models";
import { Theme, SharedStyles, TAGS_LIST } from "../../theme";
import { DestinationCard } from "../components";

interface HomeScreenProps {
  destinations: Destination[];
  formatPrice: (usd: number) => string;
  onSelectDestination: (d: Destination) => void;
  // From ViewModel
  search: string;
  setSearch: (v: string) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  sortBy: string;
  setSortBy: (v: any) => void;
  sortOrder: string;
  toggleSortOrder: () => void;
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  destinations,
  formatPrice,
  onSelectDestination,
  search,
  setSearch,
  selectedTags,
  toggleTag,
  sortBy,
  setSortBy,
  sortOrder,
  toggleSortOrder,
  showFilters,
  setShowFilters,
}) => {
  return (
    <div style={SharedStyles.screen}>
      <h1 style={SharedStyles.screenTitle}>Explore</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          style={{ ...SharedStyles.input, flex: 1, marginBottom: 0 }}
          placeholder="Search by name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          style={{
            ...SharedStyles.smallBtn,
            background: showFilters ? Theme.accent : Theme.surfaceAlt,
          }}
          onClick={() => setShowFilters(!showFilters)}
        >
          ⚙
        </button>
      </div>

      {showFilters && (
        <div style={{ ...SharedStyles.filterPanel, marginBottom: 12 }}>
          <p style={{ ...SharedStyles.label, marginBottom: 8 }}>
            Filter by tags
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 12,
            }}
          >
            {TAGS_LIST.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  ...SharedStyles.chip,
                  background: selectedTags.includes(tag)
                    ? Theme.accent
                    : Theme.surfaceAlt,
                  color: selectedTags.includes(tag) ? "#fff" : Theme.textMuted,
                }}
              >
                {tag}
              </button>
            ))}
          </div>
          <p style={{ ...SharedStyles.label, marginBottom: 8 }}>Sort by</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {(["name", "favorites", "rating"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                style={{
                  ...SharedStyles.chip,
                  background: sortBy === s ? Theme.accent : Theme.surfaceAlt,
                  color: sortBy === s ? "#fff" : Theme.textMuted,
                }}
              >
                {s}
              </button>
            ))}
            <button
              onClick={toggleSortOrder}
              style={{
                ...SharedStyles.chip,
                background: Theme.surfaceAlt,
                color: Theme.textMuted,
              }}
            >
              {sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
            </button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {destinations.length === 0 && (
          <p style={SharedStyles.mutedText}>No destinations found.</p>
        )}
        {destinations.map((d) => (
          <DestinationCard
            key={d.id}
            destination={d}
            onClick={() => onSelectDestination(d)}
          />
        ))}
      </div>
    </div>
  );
};
