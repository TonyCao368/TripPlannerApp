// ============================================================
// PROFILE SCREEN — View/edit profile, manage reviews
// ============================================================

import React, { useState } from "react";
import { User, Review, ReviewSortField } from "../../models";
import { Theme, SharedStyles } from "../../theme";
import { ReviewCard } from "../components";

interface ProfileScreenProps {
  user: User;
  userReviews: Review[];
  onUpdateUser: (data: Partial<User>) => void;
  onEditReview: (r: Review) => void;
  onDeleteAccount: () => void;
  reviewSort: ReviewSortField;
  setReviewSort: (s: ReviewSortField) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  userReviews,
  onUpdateUser,
  onEditReview,
  onDeleteAccount,
  reviewSort,
  setReviewSort,
}) => {
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [aboutYou, setAboutYou] = useState(user.aboutYou || "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const saveProfile = () => {
    onUpdateUser({ displayName, aboutYou });
    setEditing(false);
  };

  return (
    <div style={SharedStyles.screen}>
      <h1 style={SharedStyles.screenTitle}>Profile</h1>

      <div
        style={{
          ...SharedStyles.filterPanel,
          marginBottom: 20,
          textAlign: "center" as const,
        }}
      >
        <div style={{ ...SharedStyles.avatarLg, margin: "0 auto 12px" }}>
          {user.displayName?.charAt(0) || "?"}
        </div>

        {editing ? (
          <>
            <input
              style={SharedStyles.input}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display Name"
            />
            <textarea
              style={{
                ...SharedStyles.input,
                minHeight: 60,
              }}
              value={aboutYou}
              onChange={(e) => setAboutYou(e.target.value)}
              placeholder="About you..."
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button style={SharedStyles.primaryBtn} onClick={saveProfile}>
                Save
              </button>
              <button
                style={SharedStyles.secondaryBtn}
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2
              style={{
                color: Theme.text,
                fontSize: 20,
                fontFamily: Theme.fontDisplay,
                margin: "0 0 4px",
              }}
            >
              {user.displayName}
            </h2>
            <p
              style={{
                color: Theme.textMuted,
                fontSize: 13,
                margin: "0 0 4px",
              }}
            >
              {user.email}
            </p>
            <p
              style={{
                color: Theme.textDim,
                fontSize: 12,
                margin: "0 0 4px",
              }}
            >
              📍 {user.location}
            </p>
            <p
              style={{
                color: Theme.textDim,
                fontSize: 12,
                margin: "0 0 12px",
              }}
            >
              Joined {new Date(user.joinDate).toLocaleDateString()}
            </p>
            {user.aboutYou && (
              <p
                style={{
                  color: Theme.textMuted,
                  fontSize: 13,
                  margin: "0 0 12px",
                }}
              >
                {user.aboutYou}
              </p>
            )}
            <button
              style={SharedStyles.secondaryBtn}
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>

      {/* Reviews */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h3 style={SharedStyles.sectionTitle}>
          Your Reviews ({userReviews.length})
        </h3>
        <div style={{ display: "flex", gap: 4 }}>
          {(["date", "rating", "location"] as ReviewSortField[]).map((s) => (
            <button
              key={s}
              onClick={() => setReviewSort(s)}
              style={{
                ...SharedStyles.chip,
                background:
                  reviewSort === s ? Theme.accent : Theme.surfaceAlt,
                color: reviewSort === s ? "#fff" : Theme.textMuted,
                fontSize: 11,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {userReviews.length === 0 && (
        <p style={SharedStyles.mutedText}>
          You haven't written any reviews yet.
        </p>
      )}
      {userReviews.map((r) => (
        <ReviewCard
          key={r.id}
          review={r}
          showDestName
          onClick={() => onEditReview(r)}
        />
      ))}

      {/* Delete Account */}
      <div
        style={{
          marginTop: 24,
          paddingTop: 16,
          borderTop: `1px solid ${Theme.border}`,
        }}
      >
        {showDeleteConfirm ? (
          <div
            style={{
              ...SharedStyles.filterPanel,
              background: "rgba(239,68,68,0.08)",
            }}
          >
            <p
              style={{
                color: Theme.error,
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Delete your account?
            </p>
            <p
              style={{
                color: Theme.textMuted,
                fontSize: 13,
                marginBottom: 12,
              }}
            >
              This removes all your data permanently.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                style={{
                  ...SharedStyles.primaryBtn,
                  background: Theme.error,
                }}
                onClick={onDeleteAccount}
              >
                Confirm Delete
              </button>
              <button
                style={SharedStyles.secondaryBtn}
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            style={{
              ...SharedStyles.secondaryBtn,
              color: Theme.error,
              borderColor: Theme.error,
            }}
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Account
          </button>
        )}
      </div>
    </div>
  );
};
