import { Rnd, DraggableData } from "react-rnd";
import { X, Minus, Square, Shrink } from "lucide-react";
import { motion } from "framer-motion";

interface WindowProps {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMaximized?: boolean;
  isMinimized?: boolean;
  snapState?: "left" | "right" | "maximized" | null;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onRestore: (id: string) => void;
  onDrag: (id: string, x: number, y: number) => void;
  onResize: (id: string, width: number, height: number) => void;
  onFocus: (id: string) => void;
  children: React.ReactNode;

  // Snap-related props
  snapPreview: "left" | "right" | null;
  setSnapPreview: (preview: "left" | "right" | null) => void;
  detectSnapPosition: (x: number, width: number) => "left" | "right" | null;
  onSnap: (id: string, direction: "left" | "right") => void;
  onUnsnap: (id: string) => void;
}

export default function Window(props: WindowProps) {
  const NAVBAR_HEIGHT = 70;

  const handleDrag = (e: any, data: DraggableData) => {
    const snapPos = props.detectSnapPosition(data.x, props.width);
    props.setSnapPreview(snapPos);

    if (
      props.snapState &&
      props.snapState !== "maximized" &&
      snapPos === null
    ) {
      props.onUnsnap(props.id);
    }
  };

  const handleDragStop = (e: any, data: DraggableData) => {
    const snapPos = props.detectSnapPosition(data.x, props.width);

    if (snapPos) {
      props.onSnap(props.id, snapPos);
    } else {
      const safeY = Math.max(data.y, NAVBAR_HEIGHT);

      const maxY = window.innerHeight - NAVBAR_HEIGHT;
      const finalY = Math.min(safeY, maxY);

      props.onDrag(props.id, data.x, finalY);
    }

    props.setSnapPreview(null);
  };

  return (
    <Rnd
      position={{ x: props.x, y: props.y }}
      size={{ width: props.width, height: props.height }}
      dragHandleClassName="drag-handle"
      style={{ zIndex: props.zIndex }}
      onDrag={handleDrag}
      onDragStop={handleDragStop}
      onResizeStop={(_e: any, _direction: any, ref: HTMLElement) => {
        const newWidth = parseInt(ref.style.width);
        const newHeight = parseInt(ref.style.height);
        props.onResize(props.id, newWidth, newHeight);
      }}
      enableResizing={{
        top: !props.snapState || props.snapState === "maximized",
        right: props.snapState !== "right",
        bottom: !props.snapState || props.snapState === "maximized",
        left: props.snapState !== "left",
        topRight: !props.snapState || props.snapState === "maximized",
        bottomRight: props.snapState !== "right",
        bottomLeft: props.snapState !== "left",
        topLeft: !props.snapState || props.snapState === "maximized",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={props.isMinimized ? "minimized" : "visible"}
        exit={{ opacity: 0, scale: 0.9, y: 15 }}
        variants={{
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            x: 0,
          },
          minimized: {
            opacity: 0.4,
            scale: 0.5,
            x: window.innerWidth - props.x,
            y: -(props.y + 3000),
            transition: {
              duration: 0.2,
              ease: "easeInOut",
            },
          },
        }}
        transition={{ duration: 0.1, ease: [0.2, 0, 0.2, 1] }}
        style={{ userSelect: "none" }}
        onMouseDown={() => props.onFocus(props.id)}
        onTouchStart={() => props.onFocus(props.id)}
        className="h-full w-full flex flex-col rounded-lg shadow-md border border-gray-200 overflow-hidden"
      >
        {/* Title Bar */}
        <div
          className="flex-shrink-0 bg-[#1d1c1c]/80 flex items-center justify-between px-4 py-2 border-b backdrop-blur-3xl border-[#3b3838]"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="drag-handle text-sm md:text-base text-white font-medium cursor-move flex-1">
            {props.title}
          </span>
          <div className="flex gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                props.onMinimize(props.id);
              }}
              className="text-white hover:text-yellow-500 transition-colors cursor-pointer"
            >
              <Minus size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                props.onMaximize(props.id);
              }}
              className="text-white hover:text-yellow-500 transition-colors cursor-pointer"
            >
              {props.isMaximized ? <Shrink size={18} /> : <Square size={18} />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                props.onClose(props.id);
              }}
              className="text-white hover:text-yellow-500 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">{props.children}</div>
      </motion.div>
    </Rnd>
  );
}
