// ============================================================
// REGISTER SCREEN
// ============================================================

import React, { useState } from "react";
import { Theme, SharedStyles, FONT_LINK } from "../../theme";

interface RegisterScreenProps {
  onRegister: (data: {
    email: string;
    password: string;
    displayName: string;
    location: string;
  }) => boolean;
  onSwitchToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegister,
  onSwitchToLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (!email || !password || !displayName || !location) {
      setError("All fields required.");
      return;
    }
    const success = onRegister({ email, password, displayName, location });
    if (!success) setError("Account with this email exists.");
  };

  return (
    <div
      style={{
        fontFamily: Theme.font,
        background: Theme.bg,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <link href={FONT_LINK} rel="stylesheet" />
      <div
        style={{
          background: Theme.surface,
          borderRadius: Theme.radius,
          padding: "40px 28px",
          width: "100%",
          maxWidth: 380,
          textAlign: "center",
          border: `1px solid ${Theme.border}`,
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 8 }}>✈️</div>
        <h1
          style={{
            fontFamily: Theme.fontDisplay,
            fontSize: 28,
            fontWeight: 800,
            color: Theme.text,
            margin: "0 0 4px",
          }}
        >
          Create Account
        </h1>
        <p style={{ ...SharedStyles.mutedText, marginBottom: 24 }}>
          Join and start planning trips
        </p>
        {error && <div style={SharedStyles.errorBanner}>{error}</div>}
        <input
          style={SharedStyles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <input
          style={SharedStyles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <input
          style={SharedStyles.input}
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <input
          style={SharedStyles.input}
          placeholder="Current Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button style={SharedStyles.primaryBtn} onClick={submit}>
          Create Account
        </button>
        <p style={{ ...SharedStyles.mutedText, marginTop: 16 }}>
          Have an account?{" "}
          <span style={SharedStyles.link} onClick={onSwitchToLogin}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};
