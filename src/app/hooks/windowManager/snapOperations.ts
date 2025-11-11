import { WindowsState, WindowState } from "@/types";
import { NAVBAR_HEIGHT } from "./constants";

export function detectSnapPosition(
  x: number,
  windowWidth: number
): "left" | "right" | null {
  if (typeof window === "undefined") return null;

  const viewportWidth = window.innerWidth;

  if (viewportWidth < 1024) {
    return null;
  }

  if (x <= 0) {
    return "left";
  }

  const rightEdge = x + windowWidth;
  if (rightEdge >= viewportWidth) {
    return "right";
  }

  return null;
}

export function snapWindow(
  windows: WindowsState,
  id: string,
  direction: "left" | "right"
): WindowsState {
  const win = windows[id];
  if (!win) return windows;

  if (typeof window === "undefined") return windows;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const preSnapPosition = win.snapState
    ? win.preSnapPosition
    : {
        x: win.x,
        y: win.y,
        width: win.width,
        height: win.height,
      };

  const snappedWindow: WindowState = {
    ...win,
    x: direction === "left" ? 0 : viewportWidth / 2,
    y: NAVBAR_HEIGHT,
    width: viewportWidth / 2,
    height: viewportHeight - NAVBAR_HEIGHT,
    snapState: direction,
    preSnapPosition,
    isMaximized: false,
  };

  return {
    ...windows,
    [id]: snappedWindow,
  };
}

export function unsnapWindow(windows: WindowsState, id: string): WindowsState {
  const win = windows[id];
  if (!win || !win.snapState || !win.preSnapPosition) return windows;

  return {
    ...windows,
    [id]: {
      ...win,
      x: win.preSnapPosition.x,
      y: win.preSnapPosition.y,
      width: win.preSnapPosition.width,
      height: win.preSnapPosition.height,
      snapState: null,
      preSnapPosition: undefined,
    },
  };
}
