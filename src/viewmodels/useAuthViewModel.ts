// ============================================================
// AUTH VIEWMODEL — Now uses Firebase Auth + Firestore
// ============================================================

import { useState, useEffect, useCallback } from "react";
import { User } from "../models";
import {
  registerUser,
  loginUser,
  logoutUser,
  deleteCurrentUser,
  onAuthChange,
} from "../services/AuthService";
import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../services/FirestoreService";

interface AuthState {
  isLoggedIn: boolean;
  currentUser: User | null;
  showRegister: boolean;
  loading: boolean;
}

export function useAuthViewModel() {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
    currentUser: null,
    showRegister: false,
    loading: true, // True while checking auth state on app launch
  });

  // Listen for Firebase auth changes on mount
  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in. Fetch their Firestore profile.
        const profile = await getUserProfile(firebaseUser.uid);
        if (profile) {
          setState({
            isLoggedIn: true,
            currentUser: profile,
            showRegister: false,
            loading: false,
          });
        } else {
          // Auth exists but no Firestore profile (edge case)
          setState({
            isLoggedIn: false,
            currentUser: null,
            showRegister: false,
            loading: false,
          });
        }
      } else {
        // No user signed in
        setState({
          isLoggedIn: false,
          currentUser: null,
          showRegister: false,
          loading: false,
        });
      }
    });
    return unsubscribe;
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        const firebaseUser = await loginUser(email, password);
        const profile = await getUserProfile(firebaseUser.uid);
        if (profile) {
          setState({
            isLoggedIn: true,
            currentUser: profile,
            showRegister: false,
            loading: false,
          });
          return true;
        }
        return false;
      } catch (error) {
        console.error("Login failed:", error);
        return false;
      }
    },
    []
  );

  const register = useCallback(
    async (data: {
      email: string;
      password: string;
      displayName: string;
      location: string;
    }): Promise<boolean> => {
      try {
        const firebaseUser = await registerUser(
          data.email,
          data.password,
          data.displayName
        );
        const newUser: User = {
          id: firebaseUser.uid,
          email: data.email,
          displayName: data.displayName,
          location: data.location,
          joinDate: new Date().toISOString(),
          aboutYou: "",
          photo: null,
          currency: "USD",
        };
        await createUserProfile(newUser);
        setState({
          isLoggedIn: true,
          currentUser: newUser,
          showRegister: false,
          loading: false,
        });
        return true;
      } catch (error) {
        console.error("Registration failed:", error);
        return false;
      }
    },
    []
  );

  const logout = useCallback(async () => {
    await logoutUser();
    setState({
      isLoggedIn: false,
      currentUser: null,
      showRegister: false,
      loading: false,
    });
  }, []);

  const deleteAccount = useCallback(async () => {
    if (!state.currentUser) return;
    try {
      await deleteUserProfile(state.currentUser.id);
      await deleteCurrentUser();
      setState({
        isLoggedIn: false,
        currentUser: null,
        showRegister: false,
        loading: false,
      });
    } catch (error) {
      console.error("Delete account failed:", error);
    }
  }, [state.currentUser]);

  const updateUser = useCallback(
    async (data: Partial<User>) => {
      if (!state.currentUser) return;
      await updateUserProfile(state.currentUser.id, data);
      setState((prev) => ({
        ...prev,
        currentUser: prev.currentUser
          ? { ...prev.currentUser, ...data }
          : null,
      }));
    },
    [state.currentUser]
  );

  const setShowRegister = useCallback((show: boolean) => {
    setState((prev) => ({ ...prev, showRegister: show }));
  }, []);

  return {
    ...state,
    login,
    register,
    logout,
    deleteAccount,
    updateUser,
    setShowRegister,
  };
}
