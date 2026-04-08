// ============================================================
// TAB BAR — Bottom navigation
// ============================================================

import React from "react";
import { TabId } from "../../models";
import { Theme } from "../../theme";

interface TabBarProps {
  active: TabId;
  onSelect: (tab: TabId) => void;
}

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "trips", label: "Trips", icon: "✈️" },
  { id: "profile", label: "Profile", icon: "👤" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

export const TabBar: React.FC<TabBarProps> = ({ active, onSelect }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 480,
        display: "flex",
        justifyContent: "space-around",
        background: "rgba(15,17,23,0.95)",
        backdropFilter: "blur(12px)",
        borderTop: `1px solid ${Theme.border}`,
        padding: "8px 0 12px",
        zIndex: 100,
      }}
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          style={{
            background: "none",
            border: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            padding: "4px 12px",
            fontFamily: Theme.font,
            color: active === tab.id ? Theme.accent : Theme.textDim,
          }}
        >
          <span style={{ fontSize: 20 }}>{tab.icon}</span>
          <span
            style={{
              fontSize: 10,
              marginTop: 2,
              fontWeight: active === tab.id ? 600 : 400,
            }}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};
