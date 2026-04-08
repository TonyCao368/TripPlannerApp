// ============================================================
// MODELS — All data types used across the app
// ============================================================

export interface User {
  id: string;
  email: string;
  password?: string; // Not stored in Firestore, handled by Firebase Auth
  displayName: string;
  location: string;
  joinDate: string;
  aboutYou: string;
  photo: string | null;
  currency: string;
}

export interface Profile {
  fullName: string;
  location: string;
  joinDate: string;
  photo: string | null;
  aboutYou: string;
  uploadedPhotos: string[];
}

export interface Destination {
  id: string;
  name: string;
  owner: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  price: number;
  tags: string[];
  favorites: number;
  thingsToDo: string[];
  languages: string[];
  ageRecommendation: string;
  photos: string[];
}

export interface Review {
  id: string;
  destId: string; // Links review to a destination in Firestore
  userId: string;
  userName: string;
  userPhoto: string | null;
  rating: number;
  description: string;
  timestamp: number;
  // Populated when joining with destination data (client-side)
  destName?: string;
  destLocation?: string;
}

export interface Trip {
  id: string;
  userId?: string; // Owner of the trip in Firestore
  name: string;
  numPeople: number;
  isPublic: boolean;
  destinations: string[]; // destination IDs
}

export interface Feedback {
  rating: number;
  description: string;
  timestamp: number;
}

export type SortField = "name" | "favorites" | "rating";
export type SortOrder = "asc" | "desc";
export type ReviewSortField = "date" | "rating" | "location";
export type TabId = "home" | "trips" | "profile" | "settings";

export interface ScreenState {
  type: "destination" | "tripDetail" | "editReview";
  data: any;
}

export type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY";

export interface CurrencyConfig {
  symbol: string;
  rate: number;
}
