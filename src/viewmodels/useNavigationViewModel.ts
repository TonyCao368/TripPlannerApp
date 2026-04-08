// ============================================================
// NAVIGATION VIEWMODEL — Active tab and sub-screen state
// ============================================================

import { useState, useCallback } from "react";
import { TabId, ScreenState } from "../models";

export function useNavigationViewModel() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [screen, setScreen] = useState<ScreenState | null>(null);

  const navigateTab = useCallback((tab: TabId) => {
    setActiveTab(tab);
    setScreen(null);
  }, []);

  const pushScreen = useCallback((screenState: ScreenState) => {
    setScreen(screenState);
  }, []);

  const popScreen = useCallback(() => {
    setScreen(null);
  }, []);

  return {
    activeTab,
    screen,
    navigateTab,
    pushScreen,
    popScreen,
  };
}
