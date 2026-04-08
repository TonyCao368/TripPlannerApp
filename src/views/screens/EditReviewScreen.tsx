// ============================================================
// EDIT REVIEW SCREEN
// ============================================================

import React, { useState } from "react";
import { Review } from "../../models";
import { Theme, SharedStyles } from "../../theme";
import { StarRating } from "../components";

interface EditReviewScreenProps {
  review: Review;
  onBack: () => void;
  onSave: (updated: { id: string; rating: number; description: string }) => void;
  onDelete: (reviewId: string) => void;
}

export const EditReviewScreen: React.FC<EditReviewScreenProps> = ({
  review,
  onBack,
  onSave,
  onDelete,
}) => {
  const [rating, setRating] = useState(review.rating);
  const [description, setDescription] = useState(review.description || "");

  return (
    <div style={SharedStyles.screen}>
      <button style={SharedStyles.backBtn} onClick={onBack}>
        ← Back
      </button>
      <h1 style={SharedStyles.screenTitle}>Edit Review</h1>
      <p
        style={{
          color: Theme.textMuted,
          fontSize: 13,
          marginBottom: 16,
        }}
      >
        {review.destName}
      </p>

      <p style={SharedStyles.label}>Rating</p>
      <div style={{ marginBottom: 16 }}>
        <StarRating rating={rating} onChange={setRating} />
      </div>

      <textarea
        style={{
          ...SharedStyles.input,
          minHeight: 100,
        }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Your review..."
      />

      <div style={{ display: "flex", gap: 8 }}>
        <button
          style={SharedStyles.primaryBtn}
          onClick={() => onSave({ id: review.id, rating, description })}
        >
          Save Changes
        </button>
        <button
          style={{ ...SharedStyles.primaryBtn, background: Theme.error }}
          onClick={() => onDelete(review.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
