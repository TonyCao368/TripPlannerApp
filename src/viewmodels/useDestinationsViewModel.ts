// ============================================================
// DESTINATIONS VIEWMODEL — Fetches from Firestore
// ============================================================

import { useState, useEffect, useMemo } from "react";
import { Destination, SortField, SortOrder } from "../models";
import { getAllDestinations } from "../services/FirestoreService";

export function useDestinationsViewModel() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch destinations from Firestore on mount
  useEffect(() => {
    async function load() {
      try {
        const data = await getAllDestinations();
        setDestinations(data);
      } catch (error) {
        console.error("Failed to load destinations:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const filtered = useMemo(() => {
    return destinations
      .filter((d) => {
        const q = search.toLowerCase();
        const matchesSearch =
          !q ||
          d.name.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q);
        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.every((tag) => d.tags.includes(tag));
        return matchesSearch && matchesTags;
      })
      .sort((a, b) => {
        let cmp = 0;
        if (sortBy === "name") cmp = a.name.localeCompare(b.name);
        else if (sortBy === "favorites") cmp = a.favorites - b.favorites;
        else if (sortBy === "rating") cmp = a.rating - b.rating;
        return sortOrder === "desc" ? -cmp : cmp;
      });
  }, [destinations, search, selectedTags, sortBy, sortOrder]);

  return {
    destinations,
    filtered,
    loading,
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
  };
}
