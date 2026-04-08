// ============================================================
// APP.TSX — Root component. Wires ViewModels to Views.
// ============================================================

import React, { useCallback, useState, useEffect } from "react";
import { FONT_LINK, Theme } from "./theme";
import { formatPrice } from "./services/CurrencyService";
import { Review, ReviewSortField } from "./models";

// ViewModels
import {
  useAuthViewModel,
  useDestinationsViewModel,
  useReviewsViewModel,
  useTripsViewModel,
  useSettingsViewModel,
  useNavigationViewModel,
} from "./viewmodels";

// Views
import { TabBar } from "./views/navigation/TabBar";
import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  DestinationDetailScreen,
  TripsScreen,
  TripDetailScreen,
  ProfileScreen,
  EditReviewScreen,
  SettingsScreen,
} from "./views/screens";

export default function App() {
  // ── ViewModels ──────────────────────────────────────────
  const auth = useAuthViewModel();
  const destinations = useDestinationsViewModel();
  const reviewsVM = useReviewsViewModel();
  const tripsVM = useTripsViewModel();
  const settingsVM = useSettingsViewModel();
  const nav = useNavigationViewModel();

  // Local UI state
  const [reviewSort, setReviewSort] = useState<ReviewSortField>("date");
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [userHasReviewed, setUserHasReviewed] = useState(false);

  // ── Load trips when user logs in ────────────────────────
  useEffect(() => {
    if (auth.isLoggedIn && auth.currentUser) {
      tripsVM.fetchTrips(auth.currentUser.id);
    }
  }, [auth.isLoggedIn, auth.currentUser?.id]);

  // ── Load user reviews when profile tab is active ────────
  useEffect(() => {
    if (
      auth.isLoggedIn &&
      auth.currentUser &&
      nav.activeTab === "profile"
    ) {
      reviewsVM
        .getUserReviews(
          auth.currentUser.id,
          destinations.destinations,
          reviewSort
        )
        .then((reviews) => {
          setUserReviews(reviews);
        })
        .catch((err) => {
          console.error("Failed to load user reviews:", err);
          setUserReviews([]);
        });
    }
  }, [
    auth.isLoggedIn,
    auth.currentUser?.id,
    nav.activeTab,
    reviewSort,
    destinations.destinations,
  ]);

  // ── Load reviews when viewing a destination ─────────────
  useEffect(() => {
    if (nav.screen?.type === "destination" && auth.currentUser) {
      const destId = nav.screen.data.id;
      reviewsVM.fetchDestinationReviews(destId);
      reviewsVM
        .hasUserReviewed(destId, auth.currentUser.id)
        .then(setUserHasReviewed)
        .catch(() => setUserHasReviewed(false));
    }
  }, [nav.screen?.type, nav.screen?.data?.id, auth.currentUser?.id]);

  // ── Derived helpers ─────────────────────────────────────
  const priceFormatter = useCallback(
    (usd: number) => formatPrice(usd, settingsVM.currency),
    [settingsVM.currency]
  );

  // ── Auth gate ───────────────────────────────────────────
  if (auth.loading) {
    return (
      <div
        style={{
          fontFamily: Theme.font,
          background: Theme.bg,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: Theme.textMuted,
        }}
      >
        <link href={FONT_LINK} rel="stylesheet" />
        Loading...
      </div>
    );
  }

  if (!auth.isLoggedIn) {
    if (auth.showRegister) {
      return (
        <RegisterScreen
          onRegister={auth.register}
          onSwitchToLogin={() => auth.setShowRegister(false)}
        />
      );
    }
    return (
      <LoginScreen
        onLogin={auth.login}
        onSwitchToRegister={() => auth.setShowRegister(true)}
      />
    );
  }

  const currentUser = auth.currentUser!;

  // ── Handlers ────────────────────────────────────────────
  const handleLogout = () => {
    auth.logout();
    nav.navigateTab("home");
  };

  const handleDeleteAccount = async () => {
    await reviewsVM.deleteUserReviews(currentUser.id);
    await auth.deleteAccount();
    nav.navigateTab("home");
  };

  const handleCreateTrip = async (tripData: {
    name: string;
    numPeople: number;
    isPublic: boolean;
  }) => {
    await tripsVM.createTrip(currentUser.id, tripData);
  };

  const handleChangeCurrency = (code: any) => {
    settingsVM.changeCurrency(code, currentUser.id);
  };

  const handleSubmitFeedback = (data: {
    rating: number;
    description: string;
  }) => {
    settingsVM.submitFeedback(currentUser.id, data);
  };

  // ── Sub-screen rendering ────────────────────────────────
  const renderContent = () => {
    // Destination Detail
    if (nav.screen?.type === "destination") {
      const d = nav.screen.data;
      const destReviews = reviewsVM.getDestinationReviews(d.id);
      return (
        <DestinationDetailScreen
          destination={d}
          reviews={destReviews}
          trips={tripsVM.trips}
          currentUser={currentUser}
          formatPrice={priceFormatter}
          onBack={nav.popScreen}
          onAddReview={async (destId, review) => {
            await reviewsVM.addReview(destId, review);
            setUserHasReviewed(true);
          }}
          onAddToTrip={tripsVM.addDestinationToTrip}
          userHasReviewed={userHasReviewed}
          reviewSummary={reviewsVM.getReviewSummary(d.id)}
        />
      );
    }

    // Trip Detail
    if (nav.screen?.type === "tripDetail") {
      const trip = tripsVM.getTripById(nav.screen.data.id);
      if (!trip) {
        nav.popScreen();
        return null;
      }
      return (
        <TripDetailScreen
          trip={trip}
          allDestinations={destinations.destinations}
          formatPrice={priceFormatter}
          onBack={nav.popScreen}
          onRemoveDestination={tripsVM.removeDestinationFromTrip}
          totalCost={tripsVM.calculateTripCost(
            trip,
            destinations.destinations
          )}
        />
      );
    }

    // Edit Review
    if (nav.screen?.type === "editReview") {
      return (
        <EditReviewScreen
          review={nav.screen.data}
          onBack={nav.popScreen}
          onSave={async (updated) => {
            await reviewsVM.updateReview(updated);
            nav.popScreen();
          }}
          onDelete={async (id) => {
            await reviewsVM.deleteReview(id);
            nav.popScreen();
          }}
        />
      );
    }

    // ── Tab screens ─────────────────────────────────────
    switch (nav.activeTab) {
      case "home":
        return (
          <HomeScreen
            destinations={destinations.filtered}
            formatPrice={priceFormatter}
            onSelectDestination={(d) =>
              nav.pushScreen({ type: "destination", data: d })
            }
            search={destinations.search}
            setSearch={destinations.setSearch}
            selectedTags={destinations.selectedTags}
            toggleTag={destinations.toggleTag}
            sortBy={destinations.sortBy}
            setSortBy={destinations.setSortBy}
            sortOrder={destinations.sortOrder}
            toggleSortOrder={destinations.toggleSortOrder}
            showFilters={destinations.showFilters}
            setShowFilters={destinations.setShowFilters}
          />
        );

      case "trips":
        return (
          <TripsScreen
            trips={tripsVM.trips}
            destinations={destinations.destinations}
            formatPrice={priceFormatter}
            onCreateTrip={handleCreateTrip}
            onDeleteTrip={tripsVM.deleteTrip}
            onTogglePrivacy={tripsVM.togglePrivacy}
            onSelectTrip={(t) =>
              nav.pushScreen({ type: "tripDetail", data: t })
            }
            calculateTripCost={tripsVM.calculateTripCost}
          />
        );

      case "profile":
        return (
          <ProfileScreen
            user={currentUser}
            userReviews={userReviews}
            onUpdateUser={auth.updateUser}
            onEditReview={(r) =>
              nav.pushScreen({ type: "editReview", data: r })
            }
            onDeleteAccount={handleDeleteAccount}
            reviewSort={reviewSort}
            setReviewSort={setReviewSort}
          />
        );

      case "settings":
        return (
          <SettingsScreen
            currency={settingsVM.currency}
            onChangeCurrency={handleChangeCurrency}
            onLogout={handleLogout}
            onSubmitFeedback={handleSubmitFeedback}
          />
        );

      default:
        return null;
    }
  };

  // ── Layout ──────────────────────────────────────────────
  return (
    <div
      style={{
        fontFamily: Theme.font,
        background: Theme.bg,
        minHeight: "100vh",
        maxWidth: 480,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        color: Theme.text,
      }}
    >
      <link href={FONT_LINK} rel="stylesheet" />
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 72 }}>
        {renderContent()}
      </div>
      <TabBar active={nav.activeTab} onSelect={nav.navigateTab} />
    </div>
  );
}
