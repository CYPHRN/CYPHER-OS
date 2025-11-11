import { NavBarProps } from "@/types/navbar";
import NavigationSide from "./NavigationSide";
import { LayoutGrid, MessageSquareMore, Menu } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface NavBarPropsExtended extends NavBarProps {
  showMinimizeTip: boolean;
  onDismissTip: () => void;
  openForm: (id: string) => void;
}

export default function NavBar({
  isSidebarOpen,
  onToggleSidebar,
  windows,
  openNewWindow,
  closeAllWindows,
  onTriggerScreensaver,
  showMinimizeTip,
  onDismissTip,
  openForm,
}: NavBarPropsExtended) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#1d1c1c] text-gray-200 flex items-center justify-between px-2 md:px-30 border-1 border-[#3b3838] relative z-[9999]">
      {/* Left side - Always show, logo hidden on mobile via NavigationSide */}
      <NavigationSide
        openNewWindow={openNewWindow}
        closeAllWindows={closeAllWindows}
        onTriggerScreensaver={onTriggerScreensaver}
        onDropdownOpen={() => setIsMobileMenuOpen(false)}
      />

      {/* Right side - Desktop: Show both buttons */}
      <div className="hidden md:flex gap-6">
        <Popover
          open={showMinimizeTip}
          onOpenChange={(open) => !open && onDismissTip()}
        >
          <PopoverTrigger asChild>
            <button
              onClick={onToggleSidebar}
              className="relative flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <LayoutGrid size={20} />
              <span>Active Windows</span>

              {Object.keys(windows).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {Object.keys(windows).length}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            align="center"
            sideOffset={16}
            className="relative bg-[#1d1c1c] border border-yellow-500 text-white w-56 p-3 rounded-lg shadow-lg
           before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2
           before:-translate-y-full before:border-8 before:border-transparent before:border-b-yellow-500"
          >
            <p className="text-sm text-center">
              Minimized windows appear here. Click to restore them.
            </p>
          </PopoverContent>
        </Popover>

        <button
          onClick={() => openForm("contactForm")}
          className="rounded-lg relative flex items-center gap-2 px-4 py-2 hover:bg-white/10 transition-colors"
        >
          <MessageSquareMore size={20} />
          <span>Contact Me</span>
        </button>
      </div>

      {/* Mobile: Hamburger menu */}
      <div className="md:hidden relative">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-[#1d1c1c] border border-[#353030] rounded-md shadow-lg z-50">
            <button
              onClick={() => {
                onToggleSidebar();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-xs md:text-sm hover:bg-[#3b3838] flex items-center gap-2"
            >
              <LayoutGrid size={18} />
              Active Windows
              {Object.keys(windows).length > 0 && (
                <span className="ml-auto bg-yellow-500 text-black text-2xs md:text-xs font-bold rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                  {Object.keys(windows).length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                openForm("contactForm");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-xs md:text-sm hover:bg-[#3b3838] flex items-center gap-2"
            >
              <MessageSquareMore size={18} />
              Contact Me
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
