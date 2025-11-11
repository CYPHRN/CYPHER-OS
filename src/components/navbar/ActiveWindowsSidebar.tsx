import { WindowsState } from "@/types";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { ChevronRight } from "lucide-react";

interface ActiveWindowsSidebarProps {
  windows: WindowsState;
  isOpen: boolean;
  onClose: () => void;
  onRestore?: (id: string) => void;
  onCloseAll?: () => void;
}

export default function ActiveWindowsSidebar(props: ActiveWindowsSidebarProps) {
  return (
    <Sheet open={props.isOpen} onOpenChange={props.onClose}>
      <SheetContent side="right" className="flex flex-col ">
        <div className="flex justify-between px-4 py-2 mx-2 ">
          <SheetTitle className="text-md mt-1 md:text-xl">
            Active Windows
          </SheetTitle>
          <div className="flex gap-2 justify-between px-2">
            <button
              onClick={() => {
                props.onCloseAll?.();
                props.onClose();
              }}
              className="text-xs md:text-base p-2 border border-transparent hover:border-[#554a4a] hover:bg-[#554a4a]/80 rounded-lg"
            >
              Close All
            </button>
            <button
              className="p-1 border border-transparent hover:border-[#554a4a] hover:bg-[#554a4a]/80 rounded-lg"
              onClick={() => props.onClose()}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {Object.entries(props.windows).map(([id, window]) => (
            <div key={id} className="px-3">
              <div className="flex flex-col border rounded-sm">
                <button
                  className={`flex w-full py-1 px-6 ${
                    window.isMinimized
                      ? "italic text-gray-400"
                      : "text-gray-200 bg-[#272525]"
                  }`}
                  onClick={() => {
                    props.onRestore?.(id);
                    props.onClose();
                  }}
                >
                  {window.title}
                </button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
