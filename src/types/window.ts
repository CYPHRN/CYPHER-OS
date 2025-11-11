export interface WindowState {
  type: "md" | "pdf" | "file-explorer" | "settings" | "contact-form";
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;

  isMinimized?: boolean;
  isMaximized?: boolean;
  previousX?: number;
  previousY?: number;
  previousWidth?: number;
  previousHeight?: number;

  content?: string;
  pdfUrl?: string;
  fileId?: string;

  explorerData?: {
    currentPath: string[];
    history: string[][];
    historyIndex: number;
  };

  snapState?: "left" | "right" | "maximized" | null;
  preSnapPosition?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface WindowsState {
  [key: string]: WindowState;
}
