import { WindowsState, WindowState } from "@/types";
import { calculateSize, NAVBAR_HEIGHT } from "./constants";

function pathsAreEqual(path1: string[], path2: string[]): boolean {
  if (path1.length !== path2.length) return false;
  return path1.every((id, index) => id === path2[index]);
}

export function openFileExplorer(
  windows: WindowsState,
  targetPath: string[]
): { windows: WindowsState; shouldFocus?: string } {
  const explorerId = "file-explorer";

  if (windows[explorerId]) {
    const currentExplorerData = windows[explorerId].explorerData!;

    if (pathsAreEqual(currentExplorerData.currentPath, targetPath)) {
      return { windows, shouldFocus: explorerId };
    }

    const currentIndex = currentExplorerData.historyIndex;
    const sliceHistory = currentExplorerData.history.slice(0, currentIndex + 1);
    const newHistory = [...sliceHistory, targetPath];
    const newHistoryIndex = newHistory.length - 1;
    const highestZ = Math.max(
      ...Object.values(windows).map((w) => w.zIndex),
      0
    );
    const zIndex = highestZ + 1;

    return {
      windows: {
        ...windows,
        [explorerId]: {
          ...windows[explorerId],
          explorerData: {
            currentPath: targetPath,
            history: newHistory,
            historyIndex: newHistoryIndex,
          },
          zIndex,
          isMinimized: false,
        },
      },
    };
  } else {
    const size = calculateSize(
      "file-explorer",
      window.innerWidth,
      window.innerHeight
    );
    const isMobile = window.innerWidth < 768;
    const x = (window.innerWidth - size.width) / 2;
    const y = isMobile
      ? NAVBAR_HEIGHT
      : (window.innerHeight - size.height) / 2 + 30;
    const highestZ = Math.max(
      ...Object.values(windows).map((w) => w.zIndex),
      0
    );
    const zIndex = highestZ + 1;

    const newFileExplorer: WindowState = {
      type: "file-explorer",
      title: "File Explorer",
      x,
      y,
      width: size.width,
      height: size.height,
      zIndex,
      isMinimized: false,
      explorerData: {
        currentPath: targetPath,
        history: [targetPath],
        historyIndex: 0,
      },
    };

    return {
      windows: {
        ...windows,
        [explorerId]: newFileExplorer,
      },
    };
  }
}

export function navigateBack(windows: WindowsState): WindowsState {
  const explorerId = "file-explorer";
  const explorerWindow = windows[explorerId];

  if (!explorerWindow?.explorerData) return windows;

  const explorerData = explorerWindow.explorerData;
  if (explorerData.historyIndex <= 0) return windows;

  const newIndex = explorerData.historyIndex - 1;
  const newPath = explorerData.history[newIndex];

  return {
    ...windows,
    [explorerId]: {
      ...windows[explorerId],
      explorerData: {
        ...explorerData,
        currentPath: newPath,
        historyIndex: newIndex,
      },
    },
  };
}

export function navigateForward(windows: WindowsState): WindowsState {
  const explorerId = "file-explorer";
  const explorerWindow = windows[explorerId];

  if (!explorerWindow?.explorerData) return windows;

  const explorerData = explorerWindow.explorerData;
  if (explorerData.historyIndex >= explorerData.history.length - 1)
    return windows;

  const newIndex = explorerData.historyIndex + 1;
  const newPath = explorerData.history[newIndex];

  return {
    ...windows,
    [explorerId]: {
      ...windows[explorerId],
      explorerData: {
        ...explorerData,
        currentPath: newPath,
        historyIndex: newIndex,
      },
    },
  };
}
