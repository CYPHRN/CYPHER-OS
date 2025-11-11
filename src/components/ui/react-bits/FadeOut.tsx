import { useEffect, useState } from "react";

interface FadeOutProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  blur?: boolean;
  easing?: string;
  className?: string;
}

const FadeOut = ({
  children,
  duration = 1000,
  delay = 0,
  blur = false,
  easing = "ease-out",
  className = "",
}: FadeOutProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${duration}ms ${easing}, filter ${duration}ms ${easing}`,
        filter: blur ? (isVisible ? "blur(0px)" : "blur(10px)") : "none",
      }}
    >
      {children}
    </div>
  );
};

export default FadeOut;
