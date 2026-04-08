// ============================================================
// REVIEWS VIEWMODEL — Reads/writes reviews via Firestore
// ============================================================

import { useState, useCallback } from "react";
import { Review, Destination, ReviewSortField } from "../models";
import {
  getReviewsForDestination,
  getReviewsByUser,
  addReview as addReviewToDb,
  updateReview as updateReviewInDb,
  deleteReview as deleteReviewFromDb,
  hasUserReviewedDestination,
} from "../services/FirestoreService";

export function useReviewsViewModel() {
  // Local cache of reviews per destination
  const [reviewCache, setReviewCache] = useState<Record<string, Review[]>>({});

  // Fetch reviews for a destination from Firestore
  const fetchDestinationReviews = useCallback(
    async (destId: string): Promise<Review[]> => {
      const reviews = await getReviewsForDestination(destId);
      setReviewCache((prev) => ({ ...prev, [destId]: reviews }));
      return reviews;
    },
    []
  );

  const getDestinationReviews = useCallback(
    (destId: string): Review[] => {
      return reviewCache[destId] || [];
    },
    [reviewCache]
  );

  const addReview = useCallback(
    async (destId: string, review: Omit<Review, "id">) => {
      const newId = await addReviewToDb({ ...review, destId });
      const newReview: Review = { ...review, id: newId, destId };
      setReviewCache((prev) => ({
        ...prev,
        [destId]: [newReview, ...(prev[destId] || [])],
      }));
    },
    []
  );

  const updateReview = useCallback(
    async (updated: { id: string; rating: number; description: string }) => {
      await updateReviewInDb(updated.id, {
        rating: updated.rating,
        description: updated.description,
      });
      // Update local cache
      setReviewCache((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          next[k] = next[k].map((r) =>
            r.id === updated.id ? { ...r, ...updated } : r
          );
        });
        return next;
      });
    },
    []
  );

  const deleteReview = useCallback(async (reviewId: string) => {
    await deleteReviewFromDb(reviewId);
    setReviewCache((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        next[k] = next[k].filter((r) => r.id !== reviewId);
      });
      return next;
    });
  }, []);

  const deleteUserReviews = useCallback(
    async (userId: string) => {
      // Get all user reviews, then delete each
      const userReviews = await getReviewsByUser(userId);
      for (const r of userReviews) {
        await deleteReviewFromDb(r.id);
      }
      setReviewCache((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          next[k] = next[k].filter((r) => r.userId !== userId);
        });
        return next;
      });
    },
    []
  );

  const getUserReviews = useCallback(
    async (
      userId: string,
      destinations: Destination[],
      sortField: ReviewSortField = "date"
    ): Promise<Review[]> => {
      const reviews = await getReviewsByUser(userId);
      const enriched = reviews.map((r) => {
        const dest = destinations.find((d) => d.id === r.destId);
        return {
          ...r,
          destName: dest?.name || "Unknown",
          destLocation: dest?.location || "",
        };
      });
      return enriched.sort((a, b) => {
        if (sortField === "date") return b.timestamp - a.timestamp;
        if (sortField === "rating") return b.rating - a.rating;
        if (sortField === "location")
          return (a.destLocation || "").localeCompare(b.destLocation || "");
        return 0;
      });
    },
    []
  );

  const hasUserReviewed = useCallback(
    async (destId: string, userId: string): Promise<boolean> => {
      // Check local cache first
      const cached = reviewCache[destId];
      if (cached) {
        return cached.some((r) => r.userId === userId);
      }
      return await hasUserReviewedDestination(userId, destId);
    },
    [reviewCache]
  );

  const getReviewSummary = useCallback(
    (destId: string) => {
      const destReviews = reviewCache[destId] || [];
      const count = destReviews.length;
      const avg =
        count > 0
          ? (destReviews.reduce((s, r) => s + r.rating, 0) / count).toFixed(1)
          : "N/A";
      const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: destReviews.filter((r) => r.rating === star).length,
      }));
      return { count, avg, ratingCounts };
    },
    [reviewCache]
  );

  return {
    reviewCache,
    fetchDestinationReviews,
    getDestinationReviews,
    addReview,
    updateReview,
    deleteReview,
    deleteUserReviews,
    getUserReviews,
    hasUserReviewed,
    getReviewSummary,
  };
}
