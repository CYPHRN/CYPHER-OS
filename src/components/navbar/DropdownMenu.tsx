import { useRef, useEffect } from "react";

interface DropdownMenuItem {
  label: string;
  onClick: () => void;
  separator?: boolean;
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onMouseEnter: () => void;
}

export default function DropdownMenu({
  trigger,
  items,
  isOpen,
  onOpen,
  onClose,
  onMouseEnter,
}: DropdownMenuProps) {
  const handleItemClick = (onClick: () => void) => {
    onClick();
    onClose();
  };

  return (
    <div className="relative" onMouseEnter={onMouseEnter}>
      <button
        onClick={onOpen}
        className={`px-4 h-10 flex items-center text-sm font-medium transition-colors rounded-lg ${
          isOpen
            ? "text-white bg-[#1d1c1c]"
            : "text-gray-200 hover:bg-white/10 rounded-lg"
        }`}
      >
        {trigger}
      </button>

      {isOpen && (
        <div className="absolute top-full left-2 mt-2 min-w-[200px] bg-[#1d1c1c] border border-[#353030] rounded-t-none rounded-md shadow-lg z-50">
          {items.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => handleItemClick(item.onClick)}
                className="w-full text-left px-4 py-2 text-xs md:text-sm text-gray-200 hover:bg-[#3b3838] hover:text-white transition-colors"
              >
                {item.label}
              </button>
              {item.separator && (
                <div className="border-t border-[#3b3838] my-1" />
              )}{" "}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
