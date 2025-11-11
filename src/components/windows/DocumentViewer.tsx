import ReactMarkdown from "react-markdown";

interface DocumentViewerProps {
  content: string;
  onOpenItem?: (id: string) => void;
}

const HREF_TO_ID: Record<string, string> = {
  "/": "my-projects",
  "/my-projects": "my-projects",
  "/who-am-i": "whoami",
  "/whoami": "whoami",
  "/documentation": "documentation",
};

export default function DocumentViewer({
  content,
  onOpenItem,
}: DocumentViewerProps) {
  function handleLinkClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href?: string
  ) {
    if (!href || !onOpenItem) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) {
      return;
    }

    if (!href.startsWith("/")) return;

    const normalized = href.replace(/#.*$/, "");
    const mapped = HREF_TO_ID[normalized];
    if (mapped) {
      e.preventDefault();
      onOpenItem(mapped);
    }
  }

  const components = {
    a: ({ href, children, ...props }: any) => {
      return (
        <a
          href={href}
          {...props}
          onClick={(e) => handleLinkClick(e as any, href)}
        >
          {children}
        </a>
      );
    },
    img: ({ src, alt, ...props }: any) => {
      const isProfile = alt === "Profile Photo";

      if (isProfile) {
        return (
          <img
            src={src}
            alt={alt || ""}
            className="float-right ml-6 w-52 h-52 object-cover"
            {...props}
            style={{
              backgroundColor: "transparent",
              mixBlendMode: "lighten",
            }}
          />
        );
      }

      return (
        <img
          src={src}
          alt={alt || ""}
          className="rounded-lg max-w-full h-auto"
          {...props}
        />
      );
    },
  };

  return (
    <div className="prose prose-invert max-w-none px-10 md:px-15 py-10 overflow-auto h-full bg-[#141414] text-sm md:text-base">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}
