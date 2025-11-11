import { WindowsState } from "./window";

export interface NavBarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  openNewWindow: (id: string) => void;
  closeAllWindows: () => void;
  onTriggerScreensaver: () => void;
  windows: WindowsState;
}
