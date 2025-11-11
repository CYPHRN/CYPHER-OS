import { getChildren, getItemById, getPath } from "@/data/fileSystem";
import React from "react";

// Icons - File types
import { FileText, FileCode2, FileUser, FileDown } from "lucide-react";

// Icons - Folders
import { Folder, FolderGit2 } from "lucide-react";

// Icons - Navigation
import { ChevronLeft, ChevronRight } from "lucide-react";

// Icons - General
import {
  Briefcase,
  User,
  Contact,
  GraduationCap,
  Code,
  Mail,
  BookOpen,
  BookOpenText,
  BookUser,
  Gamepad2,
  Joystick,
  ScanSearch,
  Settings,
  ListChecks,
  ShieldCheck,
} from "lucide-react";

import ProjectCard from "@/components/projects/ProjectCard";
import { Project } from "@/components/projects/ProjectCard";
import { useEffect, useState } from "react";

interface FileExplorerProps {
  explorerData: {
    currentPath: string[];
    history: string[][];
    historyIndex: number;
  };
  onNavigateBack: () => void;
  onNavigateForward: () => void;
  onOpenItem: (id: string) => void;
  onNavigateToPath: (path: string[]) => void;
}

export default function FileExplorer(props: FileExplorerProps) {
  const parentId =
    props.explorerData.currentPath.length === 0
      ? null
      : props.explorerData.currentPath[
          props.explorerData.currentPath.length - 1
        ];

  const currentItems = getChildren(parentId);
  const rootItems = getChildren(null);

  function createBreadcrumbPath() {
    const breadcrumbs = [];

    breadcrumbs.push({ label: "C:", path: [] });

    for (let i = 0; i < props.explorerData.currentPath.length; i++) {
      const id = props.explorerData.currentPath[i];

      const label = getItemById(id)?.name ?? "Unknown";
      const path = props.explorerData.currentPath.slice(0, i + 1);
      breadcrumbs.push({ label: label, path: path });
    }

    return breadcrumbs;
  }

  const breadcrumbs = createBreadcrumbPath();
  const isBackDisabled = props.explorerData.historyIndex === 0;
  const isForwardDisabled =
    props.explorerData.historyIndex === props.explorerData.history.length - 1;

  const iconMap: {
    [key: string]: React.ComponentType<{ className?: string; size?: number }>;
  } = {
    // Folders
    folder: Folder,
    "folder-git-2": FolderGit2,

    // Files
    "file-text": FileText,
    "file-code-2": FileCode2,
    "file-user": FileUser,
    "file-down": FileDown,

    // General
    briefcase: Briefcase,
    user: User,
    contact: Contact,
    "graduation-cap": GraduationCap,
    code: Code,
    mail: Mail,

    // Books & Documentation
    "book-open": BookOpen,
    "book-open-text": BookOpenText,
    "book-user": BookUser,

    // Games
    "gamepad-2": Gamepad2,
    joystick: Joystick,

    // System & Tools
    "scan-search": ScanSearch,
    settings: Settings,
    "list-checks": ListChecks,
    "shield-check": ShieldCheck,
  };

  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  const currentFolder = parentId ? getItemById(parentId) : null;
  const isProjectsFolder = currentFolder?.id === "my-projects";

  useEffect(() => {
    if (!isProjectsFolder) return;
    setLoadingProjects(true);

    async function loadProjects() {
      try {
        const { getProjects } = await import("@/app/actions/projects");

        const result = await getProjects();
        if (result.success && result.data) {
          setProjects(result.data);
        } else {
          console.error("Error loading projects:", result.error);
        }
      } catch (err) {
        console.error("Error calling getProjects:", err);
      } finally {
        setLoadingProjects(false);
      }
    }
    loadProjects();
  }, [isProjectsFolder]);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, []);

  return (
    <div className="h-full flex">
      {/* Left Sidebar - Navigation */}
      <div className="w-20 md:w-56 bg-[#1a1a1a] border-r border-[#3b3838] overflow-auto flex-shrink-0">
        <div className="p-3">
          <h3 className="text-xs font-semibold text-gray-400 mb-2 px-2">
            QUICK ACCESS
          </h3>
          <div className="space-y-1">
            {rootItems.map((item) => {
              const IconComponent = iconMap[item.icon] || FileText;
              const isFolder = item.type === "file-explorer";
              const isActive =
                props.explorerData.currentPath.length === 1 &&
                props.explorerData.currentPath[0] === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (isFolder) {
                      props.onNavigateToPath([item.id]);
                    } else {
                      props.onOpenItem(item.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-colors ${
                    isActive
                      ? "bg-[#2d3138] text-yellow-500"
                      : "text-gray-300 hover:bg-[#2d3138]"
                  }`}
                >
                  <IconComponent
                    size={24}
                    className={isFolder ? "text-yellow-500" : "text-gray-400"}
                  />
                  <span className="text-sm truncate hidden md:block">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Side - Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navigation bar */}
        <div className="flex items-center gap-2 p-2 border-b border-[#3b3838] bg-[#1a1a1a]">
          <button
            onClick={props.onNavigateBack}
            disabled={isBackDisabled}
            className="p-2 rounded hover:bg-yellow-500/20 hover:text-yellow-500 active:bg-yellow-500/30 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors text-gray-400"
          >
            <ChevronLeft size={25} />
          </button>
          <button
            onClick={props.onNavigateForward}
            disabled={isForwardDisabled}
            className="p-2 rounded hover:bg-yellow-500/20 hover:text-yellow-500 active:bg-yellow-500/30 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors text-gray-400"
          >
            <ChevronRight size={25} />
          </button>
          <div className="flex items-center gap-1 ml-2">
            {breadcrumbs.map((segment, index) => (
              <React.Fragment key={index}>
                <button
                  onClick={() => props.onNavigateToPath(segment.path)}
                  className="px-2 py-1 rounded hover:bg-[#2d3138] transition-colors text-sm"
                >
                  {segment.label}
                </button>
                {index < breadcrumbs.length - 1 && (
                  <span className="text-gray-500"> \ </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content area - File grid */}
        <div className="flex-1 overflow-auto bg-[#141414] p-2 md:p-0">
          <div className="p-3 md:p-6 h-full">
            {isProjectsFolder ? (
              loadingProjects ? (
                <p className="text-gray-400">Loading projects...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )
            ) : (
              // fallback normal file explorer grid
              <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
                {currentItems.map((item) => {
                  const IconComponent = iconMap[item.icon] || FileText;
                  const isFolder = item.type === "file-explorer";

                  return (
                    <div
                      key={item.id}
                      className="flex flex-col items-center py-1 rounded cursor-pointer hover:bg-[#2d3138] active:bg-[#3d4148] transition-colors"
                      onDoubleClick={() => props.onOpenItem(item.id)}
                      onTouchStart={
                        isTouchDevice
                          ? (e) => {
                              e.stopPropagation();
                              props.onOpenItem(item.id);
                            }
                          : undefined
                      }
                    >
                      <IconComponent
                        className={`mb-2 w-[clamp(32px,5vw,44px)] h-[clamp(32px,5vw,48px)] ${
                          isFolder ? "text-yellow-500" : "text-gray-300"
                        }`}
                      />
                      <p className="text-center text-sm text-gray-200 line-clamp-2 w-full break-words px-1">
                        {item.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
