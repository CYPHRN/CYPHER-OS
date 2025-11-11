import { DesktopSettings } from "@/types";
import { useEffect, useState, useCallback, useRef } from "react";

interface UseIdleDetectionReturn {
  isActive: boolean;
  triggerManually: () => void;
  dismiss: () => void;
}

export default function useIdleDetection(
  screensaverSettings: DesktopSettings["screensaver"]
): UseIdleDetectionReturn {
  const [isIdle, setIsIdle] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef(Date.now());

  const isActive = screensaverSettings.enabled && (isIdle || isManual);

  const resetTimer = useCallback(() => {
    if (!screensaverSettings.enabled) return;

    const timeoutMin = screensaverSettings.timeout;
    if (!timeoutMin || timeoutMin <= 0) {
      return;
    }

    const timeoutMs = timeoutMin * 60 * 1000;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsIdle(true);
    }, timeoutMs);
  }, [screensaverSettings.enabled, screensaverSettings.timeout]);

  const handleActivity = useCallback(() => {
    const now = Date.now();
    lastActivityRef.current = now;

    if (isIdle || isManual) {
      setIsIdle(false);
      setIsManual(false);
    }

    resetTimer();
  }, [isIdle, isManual, resetTimer]);

  useEffect(() => {
    const events = ["mousemove", "mousedown", "keydown", "touchstart"];
    events.forEach((e) => document.addEventListener(e, handleActivity));

    // Wait until settings are loaded before starting
    if (screensaverSettings.enabled && screensaverSettings.timeout > 0) {
      resetTimer();
    }

    return () => {
      events.forEach((e) => document.removeEventListener(e, handleActivity));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [
    handleActivity,
    resetTimer,
    screensaverSettings.enabled,
    screensaverSettings.timeout,
  ]);

  const triggerManually = () => {
    setIsManual(true);
  };

  const dismiss = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsIdle(false);
    setIsManual(false);
    resetTimer();
  };

  return { isActive, triggerManually, dismiss };
}
