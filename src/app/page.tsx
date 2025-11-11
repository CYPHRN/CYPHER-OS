"use client";

import NavBar from "@/components/navbar/NavBar";
import Desktop from "@/components/desktop/Desktop";
import { useEffect, useState } from "react";
import BootScreen from "@/components/bootscreen/BootScreen";
import { getItemById } from "@/data/fileSystem";
import Window from "@/components/windows/Window";
import DocumentViewer from "@/components/windows/DocumentViewer";
import useWindowManager from "@/app/hooks/useWindowManager";
import FileExplorer from "@/components/windows/FileExplorer";
import PdfViewer from "@/components/windows/PdfViewer";
import ActiveWindowsSidebar from "@/components/navbar/ActiveWindowsSidebar";
import useSettings from "@/app/hooks/useSettings";
import SettingsWindow from "@/components/windows/SettingsWindow";
import useIdleDetection from "@/app/hooks/useIdleDetection";
import Screensaver from "@/components/screensaver/Screensaver";
import { AnimatePresence } from "framer-motion";
import ContactForm from "@/components/windows/ContactForm";
import SnapPreview from "@/components/windows/SnapPreview";

export default function Home() {
  const {
    windows,
    snapPreview,
    setSnapPreview,
    detectSnapPosition,
    openWindow,
    closeWindow,
    closeAllWindows,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    snapWindow,
    unsnapWindow,
    openFileExplorer,
    navigateBack,
    navigateForward,
    navigateToPath,
  } = useWindowManager();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const { settings, updateSettings, resetSettings } = useSettings();
  const { isActive, triggerManually, dismiss } = useIdleDetection(
    settings.screensaver
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 5000); // 5000 at launch

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isBooting === false) {
      const timer = setTimeout(() => {
        openWindow("welcome");
      }, 1400);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isBooting]);

  const handleOpenItem = (id: string) => {
    const item = getItemById(id);
    if (!item) return;

    switch (item.type) {
      case "file-explorer":
        openFileExplorer([id]);
        break;

      case "md":
      case "pdf":
      case "settings":
      case "contact-form":
        openWindow(id);
        break;

      default:
        console.warn(`Unsupported item type: ${item.type}`);
    }
  };

  useEffect(() => {
    document.body.classList.remove(
      "cursor-default",
      "cursor-large",
      "cursor-funny"
    );

    if (settings.cursor === "default") {
      document.body.classList.add("cursor-default");
    } else if (settings.cursor === "pointer") {
      document.body.classList.add("cursor-large");
    } else if (settings.cursor === "funny") {
      document.body.classList.add("cursor-funny");
    }
  }, [settings.cursor]);

  const [hasSeenMinimizeTip, setHasSeenMinimizeTip] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("hasSeenMinimizeTip") === "true";
    }
    return false;
  });

  const [showMinimizeTip, setShowMinimizeTip] = useState(false);

  const handleMinimize = (id: string) => {
    minimizeWindow(id);

    if (!hasSeenMinimizeTip) {
      setShowMinimizeTip(true);
      setHasSeenMinimizeTip(true);
      localStorage.setItem("hasSeenMinimizeTip", "true");

      setTimeout(() => setShowMinimizeTip(false), 5000);
    }
  };

  return (
    <main className="">
      {isBooting ? (
        <BootScreen />
      ) : (
        <>
          <NavBar
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            windows={windows}
            openNewWindow={(id) => {
              const item = id;
              if (item === "file-explorer") {
                openFileExplorer([]);
              } else {
                openWindow(id);
              }
            }}
            closeAllWindows={closeAllWindows}
            onTriggerScreensaver={triggerManually}
            showMinimizeTip={showMinimizeTip}
            onDismissTip={() => setShowMinimizeTip(false)}
            openForm={handleOpenItem}
          />
          <Desktop onOpenItem={handleOpenItem} settings={settings} />

          <ActiveWindowsSidebar
            windows={windows}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onRestore={(id) => restoreWindow(id)}
            onCloseAll={closeAllWindows}
          />

          {/* Snap Preview Overlay */}
          <SnapPreview snapPosition={snapPreview} navbarHeight={60} />

          <div className="fixed inset-0 pointer-events-none">
            <div className="pointer-events-auto">
              <AnimatePresence>
                {Object.entries(windows)
                  .filter(([id, window]) => windows[id].isMinimized !== true)
                  .map(([id, window]) => (
                    <Window
                      key={id}
                      id={id}
                      title={window.title}
                      x={window.x}
                      y={window.y}
                      width={window.width}
                      height={window.height}
                      zIndex={window.zIndex}
                      isMaximized={window.isMaximized}
                      isMinimized={window.isMinimized}
                      snapState={window.snapState}
                      onClose={closeWindow}
                      onMaximize={maximizeWindow}
                      onMinimize={handleMinimize}
                      onRestore={restoreWindow}
                      onDrag={updateWindowPosition}
                      onResize={updateWindowSize}
                      onFocus={focusWindow}
                      snapPreview={snapPreview}
                      setSnapPreview={setSnapPreview}
                      detectSnapPosition={detectSnapPosition}
                      onSnap={snapWindow}
                      onUnsnap={unsnapWindow}
                    >
                      {window.type === "md" && window.content ? (
                        <DocumentViewer
                          onOpenItem={handleOpenItem}
                          content={window.content}
                        />
                      ) : (
                        <p></p>
                      )}
                      {window.type === "file-explorer" &&
                        window.explorerData && (
                          <FileExplorer
                            explorerData={window.explorerData}
                            onNavigateBack={navigateBack}
                            onNavigateForward={navigateForward}
                            onOpenItem={handleOpenItem}
                            onNavigateToPath={navigateToPath}
                          />
                        )}
                      {window.type === "pdf" && <PdfViewer />}

                      {window.type === "settings" && (
                        <SettingsWindow
                          settings={settings}
                          onUpdateSettings={updateSettings}
                          onResetSettings={resetSettings}
                          onTriggerScreensaver={triggerManually}
                        />
                      )}

                      {window.type === "contact-form" && <ContactForm />}
                    </Window>
                  ))}
              </AnimatePresence>
            </div>
          </div>
        </>
      )}
      {isActive && <Screensaver onDismiss={dismiss} />}
    </main>
  );
}
