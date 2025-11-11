// src/app/hooks/useWindowManager.ts

import { useState } from "react";
import { WindowsState } from "@/types";
import * as windowOps from "./windowManager/windowOperations";
import * as positionOps from "./windowManager/windowPositioning";
import * as snapOps from "./windowManager/snapOperations";
import * as explorerOps from "./windowManager/fileExplorerOperations";

export default function useWindowManager() {
  const [windows, setWindows] = useState<WindowsState>({});
  const [snapPreview, setSnapPreview] = useState<"left" | "right" | null>(null);

  // Window operations
  async function openWindow(id: string) {
    const result = await windowOps.createWindow(windows, id);

    if (result.shouldOpenExplorer) {
      openFileExplorer(result.shouldOpenExplorer);
      return;
    }

    if (result.windows[id]) {
      // New window created
      setWindows(result.windows);
    } else if (windows[id]) {
      // Window exists - restore or focus
      if (windows[id].isMinimized) {
        restoreWindow(id);
      } else {
        focusWindow(id);
      }
    }
  }

  function closeWindow(id: string) {
    setWindows((current) => windowOps.closeWindow(current, id));
  }

  function minimizeWindow(id: string) {
    setWindows((current) => windowOps.minimizeWindow(current, id));
  }

  function maximizeWindow(id: string) {
    setWindows((current) => windowOps.maximizeWindow(current, id));
  }

  function restoreWindow(id: string) {
    setWindows((current) => windowOps.restoreWindow(current, id));
  }

  function closeAllWindows() {
    setWindows(windowOps.closeAllWindows());
  }

  // Position operations
  function updateWindowPosition(id: string, x: number, y: number) {
    setWindows((current) =>
      positionOps.updateWindowPosition(current, id, x, y)
    );
  }

  function updateWindowSize(id: string, width: number, height: number) {
    setWindows((current) =>
      positionOps.updateWindowSize(current, id, width, height)
    );
  }

  function focusWindow(id: string) {
    setWindows((current) => positionOps.focusWindow(current, id));
  }

  // Snap operations
  function detectSnapPosition(x: number, width: number) {
    return snapOps.detectSnapPosition(x, width);
  }

  function snapWindow(id: string, direction: "left" | "right") {
    setWindows((current) => snapOps.snapWindow(current, id, direction));
    setSnapPreview(null);
  }

  function unsnapWindow(id: string) {
    setWindows((current) => snapOps.unsnapWindow(current, id));
  }

  // File Explorer operations
  function openFileExplorer(targetPath: string[]) {
    const result = explorerOps.openFileExplorer(windows, targetPath);

    if (result.shouldFocus) {
      focusWindow(result.shouldFocus);
    } else {
      setWindows(result.windows);
    }
  }

  function navigateBack() {
    setWindows((current) => explorerOps.navigateBack(current));
  }

  function navigateForward() {
    setWindows((current) => explorerOps.navigateForward(current));
  }

  function navigateToPath(path: string[]) {
    openFileExplorer(path);
  }

  return {
    windows,
    snapPreview,
    setSnapPreview,
    detectSnapPosition,
    openWindow,
    closeWindow,
    closeAllWindows,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    snapWindow,
    unsnapWindow,
    openFileExplorer,
    navigateBack,
    navigateForward,
    navigateToPath,
  };
}
