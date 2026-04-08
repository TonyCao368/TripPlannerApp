// ============================================================
// FIRESTORE SERVICE — All database reads and writes
// ============================================================

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  addDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";
import { db } from "./FirebaseConfig";
import {
  User,
  Destination,
  Review,
  Trip,
  Feedback,
} from "../models";

// ─── USERS ────────────────────────────────────────────────

export async function createUserProfile(user: User): Promise<void> {
  await setDoc(doc(db, "users", user.id), {
    email: user.email,
    displayName: user.displayName,
    location: user.location,
    joinDate: user.joinDate,
    aboutYou: user.aboutYou || "",
    photo: user.photo || null,
    currency: user.currency || "USD",
  });
}

export async function getUserProfile(userId: string): Promise<User | null> {
  const snap = await getDoc(doc(db, "users", userId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as User;
}

export async function updateUserProfile(
  userId: string,
  data: Partial<User>
): Promise<void> {
  await updateDoc(doc(db, "users", userId), data);
}

export async function deleteUserProfile(userId: string): Promise<void> {
  await deleteDoc(doc(db, "users", userId));
}

// ─── DESTINATIONS ─────────────────────────────────────────

export async function getAllDestinations(): Promise<Destination[]> {
  const snap = await getDocs(collection(db, "destinations"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Destination));
}

export async function getDestinationById(
  destId: string
): Promise<Destination | null> {
  const snap = await getDoc(doc(db, "destinations", destId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Destination;
}

// ─── REVIEWS ──────────────────────────────────────────────

export async function getReviewsForDestination(
  destId: string
): Promise<Review[]> {
  const q = query(
    collection(db, "reviews"),
    where("destId", "==", destId),
    orderBy("timestamp", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Review));
}

export async function getReviewsByUser(userId: string): Promise<Review[]> {
  const q = query(
    collection(db, "reviews"),
    where("userId", "==", userId),
    orderBy("timestamp", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Review));
}

export async function addReview(
  review: Omit<Review, "id">
): Promise<string> {
  const docRef = await addDoc(collection(db, "reviews"), {
    ...review,
    timestamp: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateReview(
  reviewId: string,
  data: { rating: number; description: string }
): Promise<void> {
  await updateDoc(doc(db, "reviews", reviewId), data);
}

export async function deleteReview(reviewId: string): Promise<void> {
  await deleteDoc(doc(db, "reviews", reviewId));
}

export async function hasUserReviewedDestination(
  userId: string,
  destId: string
): Promise<boolean> {
  const q = query(
    collection(db, "reviews"),
    where("userId", "==", userId),
    where("destId", "==", destId)
  );
  const snap = await getDocs(q);
  return !snap.empty;
}

// ─── TRIPS ────────────────────────────────────────────────

export async function getTripsByUser(userId: string): Promise<Trip[]> {
  const q = query(
    collection(db, "trips"),
    where("userId", "==", userId)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Trip));
}

export async function createTrip(
  userId: string,
  data: { name: string; numPeople: number; isPublic: boolean }
): Promise<string> {
  const docRef = await addDoc(collection(db, "trips"), {
    userId,
    name: data.name,
    numPeople: data.numPeople,
    isPublic: data.isPublic,
    destinations: [],
  });
  return docRef.id;
}

export async function deleteTrip(tripId: string): Promise<void> {
  await deleteDoc(doc(db, "trips", tripId));
}

export async function toggleTripPrivacy(
  tripId: string,
  currentValue: boolean
): Promise<void> {
  await updateDoc(doc(db, "trips", tripId), {
    isPublic: !currentValue,
  });
}

export async function addDestinationToTrip(
  tripId: string,
  destId: string
): Promise<void> {
  await updateDoc(doc(db, "trips", tripId), {
    destinations: arrayUnion(destId),
  });
}

export async function removeDestinationFromTrip(
  tripId: string,
  destId: string
): Promise<void> {
  await updateDoc(doc(db, "trips", tripId), {
    destinations: arrayRemove(destId),
  });
}

// ─── FEEDBACK ─────────────────────────────────────────────

export async function submitFeedback(
  feedback: Omit<Feedback, "timestamp"> & { userId: string }
): Promise<void> {
  await addDoc(collection(db, "feedback"), {
    ...feedback,
    timestamp: Timestamp.now(),
  });
}
