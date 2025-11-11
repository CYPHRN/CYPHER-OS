export interface DesktopIcon {
  id: string;
  title: string;
  icon: string;
  type: "file-explorer" | "md" | "pdf" | "settings";
}

export interface IconPosition {
  x: number;
  y: number;
}

export interface IconPositions {
  [id: string]: IconPosition;
}

export interface DesktopProps {
  onOpenItem?: (id: string) => void;
}
