// ============================================================
// AUTH SERVICE — Firebase Authentication
// ============================================================

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  deleteUser,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "./FirebaseConfig";

// Sign up a new user
export async function registerUser(
  email: string,
  password: string,
  displayName: string
): Promise<FirebaseUser> {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(credential.user, { displayName });
  return credential.user;
}

// Sign in an existing user
export async function loginUser(
  email: string,
  password: string
): Promise<FirebaseUser> {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

// Sign out
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

// Delete the current user's account
export async function deleteCurrentUser(): Promise<void> {
  if (auth.currentUser) {
    await deleteUser(auth.currentUser);
  }
}

// Listen for auth state changes (login/logout)
export function onAuthChange(
  callback: (user: FirebaseUser | null) => void
): () => void {
  return onAuthStateChanged(auth, callback);
}

// Get the currently signed-in user
export function getCurrentUser(): FirebaseUser | null {
  return auth.currentUser;
}
