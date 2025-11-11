import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ScreensaverProps {
  onDismiss: () => void;
}

interface LogoState {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
}

export default function Screensaver({ onDismiss }: ScreensaverProps) {
  const [logo, setLogo] = useState<LogoState>({
    x: 0,
    y: 0,
    velocityX: 2,
    velocityY: 1.5,
  });
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const logoWidth = vw * 0.15;
    const logoHeight = logoWidth * 0.5;

    const x = Math.random() * (vw - logoWidth);
    const y = Math.random() * (vh - logoHeight);

    setLogo((prev) => ({ ...prev, x, y }));
  }, []);

  const animate = useCallback(() => {
    setLogo((prev) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Tailwind breakpoints
      const isMd = vw >= 768;
      const logoWidth = vw * (isMd ? 0.15 : 0.3);
      const logoHeight = logoWidth * 0.5;

      let newX = prev.x + prev.velocityX;
      let newY = prev.y + prev.velocityY;
      let newVelocityX = prev.velocityX;
      let newVelocityY = prev.velocityY;

      if (newX <= 0 || newX + logoWidth >= vw) {
        newVelocityX = -prev.velocityX + (Math.random() * 0.5 - 0.2);
        newX = newX <= 0 ? 0 : vw - logoWidth;
      }

      if (newY <= 0 || newY + logoHeight >= vh) {
        newVelocityY = -prev.velocityY + (Math.random() * 0.5 - 0.2);
        newY = newY <= 0 ? 0 : vh - logoHeight;
      }

      return {
        x: newX,
        y: newY,
        velocityX: newVelocityX,
        velocityY: newVelocityY,
      };
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  useEffect(() => {
    const body = document.body;
    const previousCursorClasses = Array.from(body.classList).filter((cls) =>
      ["cursor-default", "cursor-large", "cursor-funny"].includes(cls)
    );

    previousCursorClasses.forEach((cls) => body.classList.remove(cls));

    body.classList.add("cursor-none");

    return () => {
      body.classList.remove("cursor-none");

      previousCursorClasses.forEach((cls) => body.classList.add(cls));
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black z-[10099] cursor-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeIn" }}
          onClick={onDismiss}
          onMouseMove={onDismiss}
        >
          <motion.div
            className="absolute w-[30vw] md:w-[15vw] h-auto"
            style={{
              left: `${logo.x}px`,
              top: `${logo.y}px`,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/logo.svg"
              alt="CYPHER OS"
              width={200}
              height={100}
              className="w-full h-auto"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
