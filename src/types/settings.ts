export interface DesktopSettings {
  background: "hexagon" | "abstract" | "minimal";
  cursor: "default" | "pointer" | "funny";
  screensaver: {
    enabled: boolean;
    timeout: number;
  };
}
