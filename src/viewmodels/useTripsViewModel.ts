// ============================================================
// TRIPS VIEWMODEL — Reads/writes trips via Firestore
// ============================================================

import { useState, useCallback } from "react";
import { Trip, Destination } from "../models";
import {
  getTripsByUser,
  createTrip as createTripInDb,
  deleteTrip as deleteTripFromDb,
  toggleTripPrivacy as toggleTripPrivacyInDb,
  addDestinationToTrip as addDestToTripInDb,
  removeDestinationFromTrip as removeDestFromTripInDb,
} from "../services/FirestoreService";

export function useTripsViewModel() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all trips for the current user
  const fetchTrips = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      const data = await getTripsByUser(userId);
      setTrips(data);
    } catch (error) {
      console.error("Failed to load trips:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTrip = useCallback(
    async (
      userId: string,
      data: { name: string; numPeople: number; isPublic: boolean }
    ) => {
      const newId = await createTripInDb(userId, data);
      const newTrip: Trip = {
        id: newId,
        userId,
        name: data.name,
        numPeople: data.numPeople,
        isPublic: data.isPublic,
        destinations: [],
      };
      setTrips((prev) => [...prev, newTrip]);
    },
    []
  );

  const deleteTrip = useCallback(async (tripId: string) => {
    await deleteTripFromDb(tripId);
    setTrips((prev) => prev.filter((t) => t.id !== tripId));
  }, []);

  const togglePrivacy = useCallback(async (tripId: string) => {
    const trip = trips.find((t) => t.id === tripId);
    if (!trip) return;
    await toggleTripPrivacyInDb(tripId, trip.isPublic);
    setTrips((prev) =>
      prev.map((t) =>
        t.id === tripId ? { ...t, isPublic: !t.isPublic } : t
      )
    );
  }, [trips]);

  const addDestinationToTrip = useCallback(
    async (tripId: string, destId: string) => {
      await addDestToTripInDb(tripId, destId);
      setTrips((prev) =>
        prev.map((t) =>
          t.id === tripId && !t.destinations.includes(destId)
            ? { ...t, destinations: [...t.destinations, destId] }
            : t
        )
      );
    },
    []
  );

  const removeDestinationFromTrip = useCallback(
    async (tripId: string, destId: string) => {
      await removeDestFromTripInDb(tripId, destId);
      setTrips((prev) =>
        prev.map((t) =>
          t.id === tripId
            ? { ...t, destinations: t.destinations.filter((d) => d !== destId) }
            : t
        )
      );
    },
    []
  );

  const getTripById = useCallback(
    (tripId: string): Trip | undefined => {
      return trips.find((t) => t.id === tripId);
    },
    [trips]
  );

  const calculateTripCost = useCallback(
    (trip: Trip, allDestinations: Destination[]): number => {
      const tripDests = trip.destinations
        .map((did) => allDestinations.find((d) => d.id === did))
        .filter(Boolean) as Destination[];
      return (
        tripDests.reduce((sum, d) => sum + d.price, 0) *
        (trip.numPeople || 1)
      );
    },
    []
  );

  return {
    trips,
    loading,
    fetchTrips,
    createTrip,
    deleteTrip,
    togglePrivacy,
    addDestinationToTrip,
    removeDestinationFromTrip,
    getTripById,
    calculateTripCost,
  };
}
