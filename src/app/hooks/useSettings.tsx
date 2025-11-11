"use client";

import { DesktopSettings } from "@/types";
import { useEffect, useState } from "react";

const DEFAULT_SETTINGS: DesktopSettings = {
  background: "hexagon",
  cursor: "default",
  screensaver: {
    enabled: true,
    timeout: 1,
  },
};

export default function useSettings() {
  const [settings, setSettings] = useState<DesktopSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const stored = localStorage.getItem("os-settings");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const merged: DesktopSettings = {
          ...DEFAULT_SETTINGS,
          ...parsed,
          screensaver: {
            ...DEFAULT_SETTINGS.screensaver,
            ...(parsed.screensaver || {}),
          },
        };

        setSettings(merged);
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("os-settings", JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (updates: Partial<DesktopSettings>) => {
    setSettings((current) => ({
      ...current,
      ...updates,
      screensaver: updates.screensaver
        ? { ...current.screensaver, ...updates.screensaver }
        : current.screensaver,
    }));
  };
  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return { settings, updateSettings, resetSettings };
}
