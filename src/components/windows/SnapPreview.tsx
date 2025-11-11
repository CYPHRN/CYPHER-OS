interface SnapPreviewProps {
  snapPosition: "left" | "right" | null;
  navbarHeight: number;
}

export default function SnapPreview({
  snapPosition,
  navbarHeight,
}: SnapPreviewProps) {
  if (!snapPosition) return null;

  const isLeft = snapPosition === "left";

  return (
    <div
      className="fixed pointer-events-none z-[9998] transition-all duration-200 ease-out"
      style={{
        top: `${navbarHeight}px`,
        bottom: 0,
        left: isLeft ? 0 : "50%",
        right: isLeft ? "50%" : 0,
        backgroundColor: "rgba(249, 186, 21, 0.2)",
        border: "2px solid rgba(249, 186, 21, 0.3)",
      }}
    />
  );
}
