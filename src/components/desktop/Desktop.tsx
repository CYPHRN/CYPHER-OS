"use client";

import { useState, useEffect, useMemo } from "react";
import { FileSystemItem, getChildren } from "@/data/fileSystem";
import DesktopIcon from "./DesktopIcon";
import PropertiesModal from "./PropertiesModal";
import { DesktopSettings, IconPositions } from "@/types";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface DesktopProps {
  onOpenItem?: (id: string) => void;
  settings: DesktopSettings;
}

export default function Desktop({ onOpenItem, settings }: DesktopProps) {
  const [iconPositions, setIconPositions] = useState<IconPositions>({});
  const [windowWidth, setWindowWidth] = useState(0);
  const [deletedItems, setDeletedItems] = useState<string[]>([]);
  const [propertiesItem, setPropertiesItem] = useState<FileSystemItem | null>(
    null
  );

  const rootItems = useMemo(() => getChildren(null), []);
  const isMobile = windowWidth < 768;

  const calculateDefaultPositions = (
    items: FileSystemItem[],
    viewportWidth: number,
    isMobile: boolean
  ): IconPositions => {
    const positions: IconPositions = {};

    if (isMobile) {
      items.forEach((item, index) => {
        positions[item.id] = { x: 10, y: 20 + index * 120 };
      });
    } else {
      const folders = items.filter((item) => item.type === "file-explorer");
      const files = items.filter((item) => item.type !== "file-explorer");

      folders.forEach((item, index) => {
        positions[item.id] = { x: 30, y: 25 + index * 140 };
      });

      files.forEach((item, index) => {
        positions[item.id] = {
          x: Math.max(viewportWidth - 140, 160),
          y: 25 + index * 140,
        };
      });
    }

    return positions;
  };

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);

      const newPositions = calculateDefaultPositions(
        rootItems,
        newWidth,
        newWidth < 768
      );
      setIconPositions(newPositions);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [rootItems]);

  const handleDragStop = (id: string, x: number, y: number) => {
    setIconPositions((current) => ({
      ...current,
      [id]: { x, y },
    }));
  };

  const handleResetIcons = () => {
    setIconPositions(
      calculateDefaultPositions(rootItems, windowWidth, isMobile)
    );
  };

  const handleDeleteIcon = (id: string) => {
    setDeletedItems((current) => [...current, id]);
  };

  const handleShowProperties = (id: string) => {
    const item = rootItems.find((item) => item.id === id);
    if (item) {
      setPropertiesItem(item);
    }
  };

  const handleRestoreDeleted = () => {
    setDeletedItems([]);
  };

  const backgroundClasses = {
    hexagon: "bg-hexagon",
    abstract: "bg-abstract",
    minimal: "bg-minimal",
  };

  const bgClass = backgroundClasses[settings.background];

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="fixed inset-0 top-14 pointer-events-none overflow-hidden">
            <div
              className={`relative w-full h-full pointer-events-auto ${bgClass}`}
            >
              {rootItems
                .filter((items) => !deletedItems.includes(items.id))
                .map((item) => {
                  const pos = iconPositions[item.id];
                  if (!pos) return null;

                  return (
                    <DesktopIcon
                      key={item.id}
                      item={item}
                      position={pos}
                      onOpen={onOpenItem}
                      onDragStop={(x, y) => handleDragStop(item.id, x, y)}
                      onDelete={handleDeleteIcon}
                      onShowProperties={handleShowProperties}
                    />
                  );
                })}
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="bg-[#1d1c1c]">
          <ContextMenuItem
            className="hover:bg-[#3b3838]"
            onClick={() => onOpenItem?.("about-this-website")}
          >
            About this Website
          </ContextMenuItem>
          <ContextMenuItem
            className="hover:bg-[#3b3838]"
            onClick={() => onOpenItem?.("settings")}
          >
            Display Options
          </ContextMenuItem>
          <ContextMenuItem
            className="hover:bg-[#3b3838]"
            onClick={handleResetIcons}
          >
            Reset Icon Position
          </ContextMenuItem>
          <ContextMenuItem
            className="hover:bg-[#3b3838]"
            onClick={handleRestoreDeleted}
          >
            Restore Deleted Items
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <PropertiesModal
        item={propertiesItem}
        onClose={() => setPropertiesItem(null)}
      />
    </>
  );
}
