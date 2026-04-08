// ============================================================
// LOGIN SCREEN
// ============================================================

import React, { useState } from "react";
import { Theme, SharedStyles, FONT_LINK } from "../../theme";

interface LoginScreenProps {
  onLogin: (email: string, password: string) => boolean;
  onSwitchToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onSwitchToRegister,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (!email || !password) {
      setError("All fields required.");
      return;
    }
    const success = onLogin(email, password);
    if (!success) setError("Invalid credentials. Register first.");
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
          TripPlanner
        </h1>
        <p style={{ ...SharedStyles.mutedText, marginBottom: 24 }}>
          Sign in to plan your next adventure
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
        <button style={SharedStyles.primaryBtn} onClick={submit}>
          Sign In
        </button>
        <p style={{ ...SharedStyles.mutedText, marginTop: 16 }}>
          No account?{" "}
          <span style={SharedStyles.link} onClick={onSwitchToRegister}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};
