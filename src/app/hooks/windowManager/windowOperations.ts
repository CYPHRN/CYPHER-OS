import { WindowsState, WindowState } from "@/types";
import { getItemById } from "@/data/fileSystem";
import { calculateSize, NAVBAR_HEIGHT } from "./constants";

export async function createWindow(
  windows: WindowsState,
  id: string
): Promise<{ windows: WindowsState; shouldOpenExplorer?: string[] }> {
  const outputFile = getItemById(id);
  if (!outputFile) {
    console.error(`File with ID "${id}" not found`);
    return { windows };
  }

  let windowType: "md" | "pdf" | "file-explorer" | "settings" | "contact-form";
  let content = undefined;

  switch (outputFile.type) {
    case "md":
      windowType = "md";
      break;
    case "pdf":
      windowType = "pdf";
      break;
    case "settings":
      windowType = "settings";
      break;
    case "file-explorer":
      return { windows, shouldOpenExplorer: [id] };
    case "contact-form":
      windowType = "contact-form";
      break;
    default:
      console.error(`Unsupported file type: "${outputFile.type}"`);
      return { windows };
  }

  if (outputFile.type === "md") {
    try {
      const response = await fetch(`/content/${outputFile.contentPath}`);
      content = await response.text();
    } catch (error) {
      console.error(`Failed to load content for ${id}:`, error);
      content = "Failed to load content.";
    }
  }

  // If window already exists, just focus it
  if (windows[id]) {
    return { windows }; // Caller should handle focus/restore
  }

  const size = calculateSize(windowType, window.innerWidth, window.innerHeight);
  const centerX = (window.innerWidth - size.width) / 2;
  const centerY = (window.innerHeight - size.height) / 2;

  const isMobile = window.innerWidth < 768;
  const offset = isMobile ? 0 : Object.keys(windows).length * 30;
  const x = centerX + offset;
  const y = Math.max(centerY + offset, NAVBAR_HEIGHT);

  const highestZ = Math.max(...Object.values(windows).map((w) => w.zIndex), 0);
  const zIndex = highestZ + 1;

  const newWindow: WindowState = {
    type: windowType,
    title: outputFile.name,
    x,
    y,
    width: size.width,
    height: size.height,
    zIndex,
    content,
    pdfUrl: outputFile.pdfUrl,
    fileId: id,
    isMinimized: false,
  };

  return {
    windows: {
      ...windows,
      [id]: newWindow,
    },
  };
}

export function closeWindow(windows: WindowsState, id: string): WindowsState {
  const { [id]: removed, ...rest } = windows;
  return rest;
}

export function minimizeWindow(
  windows: WindowsState,
  id: string
): WindowsState {
  if (!windows[id]) return windows;

  return {
    ...windows,
    [id]: {
      ...windows[id],
      isMinimized: true,
    },
  };
}

export function maximizeWindow(
  windows: WindowsState,
  id: string
): WindowsState {
  const win = windows[id];
  if (!win) return windows;

  if (win.isMaximized) {
    // Restore
    return {
      ...windows,
      [id]: {
        ...win,
        isMaximized: false,
        x: win.previousX ?? win.x,
        y: win.previousY ?? win.y,
        width: win.previousWidth ?? win.width,
        height: win.previousHeight ?? win.height,
      },
    };
  } else {
    // Maximize
    return {
      ...windows,
      [id]: {
        ...win,
        isMaximized: true,
        previousX: win.x,
        previousY: win.y,
        previousWidth: win.width,
        previousHeight: win.height,
        x: 0,
        y: NAVBAR_HEIGHT,
        width: window.innerWidth,
        height: window.innerHeight - NAVBAR_HEIGHT,
      },
    };
  }
}

export function restoreWindow(windows: WindowsState, id: string): WindowsState {
  if (!windows[id]) return windows;

  const highestZ = Math.max(...Object.values(windows).map((w) => w.zIndex), 0);

  return {
    ...windows,
    [id]: {
      ...windows[id],
      isMinimized: false,
      zIndex: highestZ + 1,
    },
  };
}

export function closeAllWindows(): WindowsState {
  return {};
}
