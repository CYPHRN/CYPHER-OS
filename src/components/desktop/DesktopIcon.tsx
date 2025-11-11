"use client";

import { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { FileSystemItem } from "@/data/fileSystem";
import {
  Folder,
  FileText,
  FolderGit2,
  BookOpenText,
  Contact,
  FileCode2,
  Settings,
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { motion } from "framer-motion";

interface DesktopIconProps {
  item: FileSystemItem;
  position: { x: number; y: number };
  onOpen?: (id: string) => void;
  onDragStop?: (x: number, y: number) => void;
  onDelete?: (id: string) => void;
  onShowProperties?: (id: string) => void;
}

const iconMap: { [key: string]: any } = {
  "file-text": FileText,
  "folder-git-2": FolderGit2,
  "book-open-text": BookOpenText,
  contact: Contact,
  "file-code-2": FileCode2,
  folder: Folder,
  settings: Settings,
};

export default function DesktopIcon({
  item,
  position,
  onOpen,
  onDragStop,
  onDelete,
  onShowProperties,
}: DesktopIconProps) {
  const [selected, setSelected] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const Icon = iconMap[item.icon] || FileText;
  const isFolder = item.type === "file-explorer";

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(true);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen?.(item.id);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    onOpen?.(item.id);
  };

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, []);

  return (
    <ContextMenu>
      <Draggable
        nodeRef={nodeRef}
        position={position}
        onStop={(_e, data) => {
          onDragStop?.(data.x, data.y);
        }}
        disabled={isTouchDevice}
      >
        <div
          ref={nodeRef}
          className={`flex flex-col items-center justify-center w-24 cursor-pointer select-none rounded-lg p-2 transition-all
          ${
            selected
              ? "bg-yellow-500/20 ring-2 ring-yellow-500"
              : "hover:bg-white/10"
          }`}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onTouchStart={handleTouchStart}
          onBlur={() => setSelected(false)}
          tabIndex={0}
          style={{
            transition:
              "left 0.3s ease-out, top 0.3s ease-out background-color 0.2s, box-shadow 0.2s ",
            position: "absolute",
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.15 }}
          >
            <ContextMenuTrigger>
              <div className="flex justify-center items-center h-14 w-20 mb-2">
                <Icon
                  size="clamp(32px, 5vw, 44px)"
                  className={`transition-colors ${
                    isFolder
                      ? "text-yellow-500"
                      : selected
                      ? "text-yellow-500"
                      : "text-gray-200"
                  }`}
                />
              </div>
              <span
                className={`text-xs text-center text-white break-words line-clamp-2 ${
                  selected ? "font-medium" : ""
                }`}
              >
                {item.name}
              </span>
            </ContextMenuTrigger>
          </motion.div>
        </div>
      </Draggable>
      <ContextMenuContent className="bg-[#1d1c1c]">
        <ContextMenuItem
          className="hover:bg-[#3b3838]"
          onClick={() => onOpen?.(item.id)}
        >
          Open
        </ContextMenuItem>
        <ContextMenuItem
          className="hover:bg-[#3b3838]"
          onClick={() => onDelete?.(item.id)}
        >
          Delete
        </ContextMenuItem>
        <ContextMenuItem
          className="hover:bg-[#3b3838]"
          onClick={() => onShowProperties?.(item.id)}
        >
          Properties
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
