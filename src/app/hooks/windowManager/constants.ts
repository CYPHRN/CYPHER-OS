export const DEFAULT_SIZES = {
  "file-explorer": { width: 1500, height: 750 },
  md: { width: 1250, height: 700 },
  pdf: { width: 1500, height: 800 },
  settings: { width: 500, height: 500 },
  "contact-form": { width: 500, height: 585 },
};

export const DEFAULT_SIZES_MD = {
  "file-explorer": { width: 1200, height: 600 },
  md: { width: 1000, height: 600 },
  pdf: { width: 1200, height: 650 },
  settings: { width: 500, height: 500 },
  "contact-form": { width: 500, height: 585 },
};

export const DEFAULT_SIZES_SM = {
  "file-explorer": { width: 350, height: 500 },
  md: { width: 350, height: 500 },
  pdf: { width: 350, height: 550 },
  settings: { width: 350, height: 450 },
  "contact-form": { width: 350, height: 500 },
};

export const SNAP_THRESHOLD = 50;
export const NAVBAR_HEIGHT = 70;

export function calculateSize(
  windowType: keyof typeof DEFAULT_SIZES | keyof typeof DEFAULT_SIZES_MD,
  viewportWidth: number,
  viewportHeight: number
) {
  const w = viewportWidth;
  const h = viewportHeight;
  const isMobile = w < 768;
  const isTablet = w >= 768 && w < 1024;
  const isLaptop = w >= 1024 && w < 1920;

  const desktopSize = DEFAULT_SIZES[windowType as keyof typeof DEFAULT_SIZES];
  const laptopSize =
    DEFAULT_SIZES_MD[windowType as keyof typeof DEFAULT_SIZES_MD];

  const fallbackWidth = 100;
  const fallbackHeight = 100;

  if (isMobile) {
    return {
      width: w - 20,
      height: h - 90,
    };
  }

  if (isTablet) {
    return {
      width: Math.max(
        480,
        Math.min(w - 40, laptopSize?.width ?? fallbackWidth)
      ),
      height: Math.max(
        320,
        Math.min(h - 80, laptopSize?.height ?? fallbackHeight)
      ),
    };
  }

  if (isLaptop) {
    return {
      width: laptopSize?.width ?? fallbackWidth,
      height: laptopSize?.height ?? fallbackHeight,
    };
  }

  return {
    width: desktopSize?.width ?? fallbackWidth,
    height: desktopSize?.height ?? fallbackHeight,
  };
}
