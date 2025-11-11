"use client";

import { FileSystemItem, getItemById, formatSize } from "@/data/fileSystem";
import { X } from "lucide-react";
import Draggable from "react-draggable";
import { useRef } from "react";

interface PropertiesModalProps {
  item: FileSystemItem | null;
  onClose: () => void;
}

export default function PropertiesModal({
  item,
  onClose,
}: PropertiesModalProps) {
  if (!item) return null;

  const getFullPath = (item: FileSystemItem): string => {
    const pathParts: string[] = [];
    let currentItem: FileSystemItem | undefined = item;

    while (currentItem) {
      pathParts.unshift(currentItem.name);
      if (currentItem.parentId) {
        currentItem = getItemById(currentItem.parentId);
      } else {
        break;
      }
    }

    return "C:\\" + pathParts.join("\\");
  };

  const getTypeLabel = (type: string): string => {
    switch (type) {
      case "file-explorer":
        return "Folder";
      case "md":
        return "Markdown Document";
      case "pdf":
        return "PDF Document";
      case "app":
        return "Application";
      default:
        return "File";
    }
  };
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed inset-0 z-[9999]" onClick={onClose}>
      <Draggable
        nodeRef={nodeRef}
        handle=".drag-handle"
        defaultPosition={{ x: 0, y: 0 }}
      >
        <div
          ref={nodeRef}
          className="bg-[#1d1c1c] rounded-lg shadow-2xl border border-[#3b3838] w-full max-w-md cursor-default absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="drag-handle flex items-center justify-between px-6 py-4 border-b border-[#3b3838] cursor-move">
            <h2 className="text-lg font-semibold text-white">
              {item.name} Properties
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-[#3b3838] rounded"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-6 py-4 space-y-4">
            <div className="grid grid-cols-[100px_1fr] gap-3 text-sm">
              <span className="text-gray-400 font-medium">Name:</span>
              <span className="text-white">{item.name}</span>

              <span className="text-gray-400 font-medium">Type:</span>
              <span className="text-white">{getTypeLabel(item.type)}</span>

              <span className="text-gray-400 font-medium">Path:</span>
              <span className="text-white font-mono text-xs break-all">
                {getFullPath(item)}
              </span>

              {item.size && (
                <>
                  <span className="text-gray-400 font-medium">Size:</span>
                  <span className="text-white">{formatSize(item.size)}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-end px-6 py-4 border-t border-gray-700/50">
            <button
              onClick={onClose}
              className="px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </Draggable>
    </div>
  );
}
