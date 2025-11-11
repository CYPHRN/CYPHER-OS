import { useState, useRef, useEffect } from "react";
import DropdownMenu from "./DropdownMenu";

type DropdownId = "logo" | "cypher" | "alex" | null;

interface NavigationSideProps {
  openNewWindow: (id: string) => void;
  closeAllWindows: () => void;
  onTriggerScreensaver: () => void;
  onDropdownOpen?: () => void;
}

export default function NavigationSide({
  openNewWindow,
  closeAllWindows,
  onTriggerScreensaver,
  onDropdownOpen,
}: NavigationSideProps) {
  const [activeDropdown, setActiveDropdown] = useState<DropdownId>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const handleOpen = (id: DropdownId) => {
    setActiveDropdown(activeDropdown === id ? null : id);
    onDropdownOpen?.();
  };

  const handleHover = (id: DropdownId) => {
    if (activeDropdown !== null) {
      setActiveDropdown(id);
    }
  };

  return (
    <div className="flex items-center md:gap-4 py-2" ref={navRef}>
      <DropdownMenu
        trigger={<img src="/logo.svg" alt="Logo" className="w-18 h-18 " />}
        items={[
          {
            label: "About CYPHER OS",
            onClick: () => openNewWindow("about-cypher-os"),
          },
          {
            label: "About this Website",
            onClick: () => openNewWindow("about-this-website"),
            separator: true,
          },
          {
            label: "Display Options",
            onClick: () => openNewWindow("settings"),
          },
        ]}
        isOpen={activeDropdown === "logo"}
        onOpen={() => handleOpen("logo")}
        onClose={() => setActiveDropdown(null)}
        onMouseEnter={() => handleHover("logo")}
      />

      <DropdownMenu
        trigger={<span className="text-xs md:text-sm">CYPHER OS</span>}
        items={[
          {
            label: "Browse All Apps",
            onClick: () => openNewWindow("file-explorer"),
          },
          {
            label: "Start Screensaver",
            onClick: () => onTriggerScreensaver(),
            separator: true,
          },
          {
            label: "Close All Windows",
            onClick: () => closeAllWindows(),
          },
        ]}
        isOpen={activeDropdown === "cypher"}
        onOpen={() => handleOpen("cypher")}
        onClose={() => setActiveDropdown(null)}
        onMouseEnter={() => handleHover("cypher")}
      />

      <DropdownMenu
        trigger={<span className="text-xs md:text-sm">Alex Moise</span>}
        items={[
          {
            label: "Projects",
            onClick: () => openNewWindow("my-projects"),
            separator: true,
          },
          {
            label: "About Me",
            onClick: () => openNewWindow("about-me"),
          },
          { label: "Skills", onClick: () => openNewWindow("skills") },
          { label: "Experience", onClick: () => openNewWindow("experience") },
        ]}
        isOpen={activeDropdown === "alex"}
        onOpen={() => handleOpen("alex")}
        onClose={() => setActiveDropdown(null)}
        onMouseEnter={() => handleHover("alex")}
      />
    </div>
  );
}
