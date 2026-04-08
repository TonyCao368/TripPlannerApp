// ============================================================
// DESTINATION DETAIL SCREEN
// ============================================================

import React, { useState } from "react";
import { Destination, Review, Trip, User } from "../../models";
import { Theme, SharedStyles } from "../../theme";
import { StarRating, ReviewCard } from "../components";

interface DestinationDetailProps {
  destination: Destination;
  reviews: Review[];
  trips: Trip[];
  currentUser: User;
  formatPrice: (usd: number) => string;
  onBack: () => void;
  onAddReview: (destId: string, review: Review) => void;
  onAddToTrip: (tripId: string, destId: string) => void;
  userHasReviewed: boolean;
  reviewSummary: {
    count: number;
    avg: string;
    ratingCounts: { star: number; count: number }[];
  };
}

export const DestinationDetailScreen: React.FC<DestinationDetailProps> = ({
  destination: d,
  reviews: destReviews,
  trips,
  currentUser,
  formatPrice,
  onBack,
  onAddReview,
  onAddToTrip,
  userHasReviewed,
  reviewSummary,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showTripPicker, setShowTripPicker] = useState(false);

  const submitReview = () => {
    if (reviewRating === 0) return;
    onAddReview(d.id, {
      id: `r_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.displayName,
      userPhoto: currentUser.photo,
      rating: reviewRating,
      description: reviewText,
      timestamp: Date.now(),
    });
    setShowReviewForm(false);
    setReviewRating(0);
    setReviewText("");
  };

  return (
    <div style={SharedStyles.screen}>
      <button style={SharedStyles.backBtn} onClick={onBack}>
        ← Back
      </button>

      {/* Hero */}
      <div style={{ marginBottom: 16 }}>
        {d.image?.startsWith("http") ? (
          <img
            src={d.image}
            alt={d.name}
            style={{
              width: "100%",
              height: 200,
              borderRadius: Theme.radiusSm,
              objectFit: "cover",
              marginBottom: 12,
            }}
          />
        ) : (
          <div style={{ fontSize: 56, marginBottom: 12 }}>{d.image}</div>
        )}
        <h1
          style={{
            fontFamily: Theme.fontDisplay,
            fontSize: 26,
            fontWeight: 800,
            color: Theme.text,
            margin: "0 0 4px",
          }}
        >
          {d.name}
        </h1>
        <p style={{ color: Theme.textMuted, fontSize: 12, margin: "2px 0 0" }}>
          📍 {d.location}
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 8,
            alignItems: "center",
          }}
        >
          <span style={SharedStyles.ratingBadge}>★ {d.rating}</span>
          <span style={{ color: Theme.textMuted, fontSize: 13 }}>
            ♥ {d.favorites} favorites
          </span>
          <span
            style={{ color: Theme.accent, fontWeight: 600, fontSize: 14 }}
          >
            {formatPrice(d.price)}/person
          </span>
        </div>
      </div>

      <p
        style={{
          color: Theme.textMuted,
          fontSize: 14,
          lineHeight: 1.6,
          marginBottom: 16,
        }}
      >
        {d.description}
      </p>

      {/* Photos */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          overflowX: "auto",
        }}
      >
        {d.photos.map((p, i) => (
          <div
            key={i}
            style={{
              width: 56,
              height: 56,
              borderRadius: Theme.radiusSm,
              background: Theme.surfaceAlt,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              flexShrink: 0,
            }}
          >
            {p}
          </div>
        ))}
      </div>

      {/* Add to Trip */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <button
          style={SharedStyles.primaryBtn}
          onClick={() => setShowTripPicker(!showTripPicker)}
        >
          + Add to Trip
        </button>
      </div>

      {showTripPicker && (
        <div style={{ ...SharedStyles.filterPanel, marginBottom: 16 }}>
          <p style={SharedStyles.label}>Select a trip:</p>
          {trips.length === 0 && (
            <p style={SharedStyles.mutedText}>
              No trips yet. Create one in the Trips tab.
            </p>
          )}
          {trips.map((t) => (
            <button
              key={t.id}
              style={{
                ...SharedStyles.chip,
                display: "block",
                marginBottom: 6,
                background: Theme.surfaceAlt,
                color: Theme.text,
              }}
              onClick={() => {
                onAddToTrip(t.id, d.id);
                setShowTripPicker(false);
              }}
            >
              {t.name}{" "}
              {t.destinations.includes(d.id) ? "(already added)" : ""}
            </button>
          ))}
        </div>
      )}

      {/* Things to Do */}
      <div style={{ marginBottom: 20 }}>
        <h3 style={SharedStyles.sectionTitle}>Things To Do</h3>
        {d.thingsToDo.map((thing, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 0",
              borderBottom: `1px solid ${Theme.border}`,
            }}
          >
            <span style={{ color: Theme.accent, marginRight: 8 }}>•</span>
            <span style={{ color: Theme.text, fontSize: 14 }}>{thing}</span>
          </div>
        ))}
      </div>

      {/* Info */}
      <div style={{ ...SharedStyles.filterPanel, marginBottom: 20 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span style={SharedStyles.mutedText}>Languages</span>
          <span style={{ color: Theme.text, fontSize: 13 }}>
            {d.languages.join(", ")}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span style={SharedStyles.mutedText}>Age</span>
          <span style={{ color: Theme.text, fontSize: 13 }}>
            {d.ageRecommendation}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={SharedStyles.mutedText}>By</span>
          <span style={{ color: Theme.text, fontSize: 13 }}>{d.owner}</span>
        </div>
      </div>

      {/* Reviews Section */}
      <h3 style={SharedStyles.sectionTitle}>
        Reviews ({reviewSummary.count})
      </h3>

      {/* Review Summary */}
      <div style={{ ...SharedStyles.filterPanel, marginBottom: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 12,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: Theme.text,
                fontFamily: Theme.fontDisplay,
              }}
            >
              {reviewSummary.avg}
            </div>
            <div style={{ color: Theme.star }}>
              {"★".repeat(Math.round(Number(reviewSummary.avg) || 0))}
            </div>
            <div style={{ color: Theme.textDim, fontSize: 11 }}>
              {reviewSummary.count} reviews
            </div>
          </div>
          <div style={{ flex: 1 }}>
            {reviewSummary.ratingCounts.map(({ star, count }) => (
              <div
                key={star}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 3,
                }}
              >
                <span
                  style={{
                    color: Theme.textMuted,
                    fontSize: 12,
                    width: 12,
                  }}
                >
                  {star}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 6,
                    background: Theme.surfaceAlt,
                    borderRadius: 3,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: reviewSummary.count
                        ? `${(count / reviewSummary.count) * 100}%`
                        : "0%",
                      background: Theme.star,
                      borderRadius: 3,
                    }}
                  />
                </div>
                <span
                  style={{
                    color: Theme.textDim,
                    fontSize: 11,
                    width: 16,
                  }}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review */}
      {!userHasReviewed && (
        <button
          style={{ ...SharedStyles.secondaryBtn, marginBottom: 16 }}
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          Write a Review
        </button>
      )}

      {showReviewForm && (
        <div style={{ ...SharedStyles.filterPanel, marginBottom: 16 }}>
          <p style={SharedStyles.label}>Your rating</p>
          <div style={{ marginBottom: 12 }}>
            <StarRating rating={reviewRating} onChange={setReviewRating} />
          </div>
          <textarea
            style={{
              ...SharedStyles.input,
              minHeight: 80,
              resize: "vertical" as const,
            }}
            placeholder="Write your review (optional)..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button style={SharedStyles.primaryBtn} onClick={submitReview}>
            Submit Review
          </button>
        </div>
      )}

      {/* Review List */}
      {destReviews.map((r) => (
        <ReviewCard key={r.id} review={r} />
      ))}
    </div>
  );
};
