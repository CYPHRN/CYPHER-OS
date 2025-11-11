import { WindowsState } from "@/types";

export function updateWindowPosition(
  windows: WindowsState,
  id: string,
  x: number,
  y: number
): WindowsState {
  if (!windows[id]) return windows;

  return {
    ...windows,
    [id]: {
      ...windows[id],
      x,
      y,
    },
  };
}

export function updateWindowSize(
  windows: WindowsState,
  id: string,
  width: number,
  height: number
): WindowsState {
  if (!windows[id]) return windows;

  return {
    ...windows,
    [id]: {
      ...windows[id],
      width,
      height,
    },
  };
}

export function focusWindow(windows: WindowsState, id: string): WindowsState {
  if (!windows[id]) return windows;

  const highestZ = Math.max(...Object.values(windows).map((w) => w.zIndex), 0);
  const zIndex = highestZ + 1;

  return {
    ...windows,
    [id]: {
      ...windows[id],
      zIndex,
    },
  };
}
