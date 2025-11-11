export interface FileSystemItem {
  id: string;
  name: string;
  type: "file-explorer" | "md" | "pdf" | "settings" | "contact-form" | "app";
  parentId: string | null;
  icon: string;
  contentPath?: string;
  pdfUrl?: string;
  size?: number;
}

export const getItemById = (id: string): FileSystemItem | undefined => {
  return fileSystem.find((item) => item.id === id);
};

export const getChildren = (parentId: string | null): FileSystemItem[] => {
  return fileSystem.filter((item) => item.parentId === parentId);
};

export const getPath = (id: string): FileSystemItem[] => {
  const path: FileSystemItem[] = [];
  let currentItem = getItemById(id);

  while (currentItem) {
    path.unshift(currentItem);

    if (currentItem.parentId === null) {
      break;
    }

    currentItem = getItemById(currentItem.parentId);
  }
  return path;
};

export const getItemsByType = (
  type: FileSystemItem["type"]
): FileSystemItem[] => {
  return fileSystem.filter((item) => item.type === type);
};

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1073741824) {
    const mb = bytes / 1048576;
    return `${mb % 1 === 0 ? mb.toFixed(0) : mb.toFixed(2)} MB`;
  }
  const gb = bytes / 1073741824;
  return `${gb % 1 === 0 ? gb.toFixed(0) : gb.toFixed(2)} GB`;
}

export const fileSystem: FileSystemItem[] = [
  // File System Management for files that do not suffer often changes1
  // Projects are in Database since they need to be dynamic (adding / removing)

  // Root

  //   {
  //     id: "games",
  //     name: "Games",
  //     type: "file-explorer",
  //     parentId: null,
  //     icon: "gamepad-2",
  //   },

  {
    id: "whoami",
    name: "who-am-i",
    type: "file-explorer",
    parentId: null,
    icon: "contact",
    size: 8421376,
  },

  {
    id: "my-projects",
    name: "My Projects",
    type: "file-explorer",
    parentId: null,
    icon: "folder-git-2",
    size: 3217408,
  },

  {
    id: "documentation",
    name: "Documentation",
    type: "file-explorer",
    parentId: null,
    icon: "book-open-text",
    size: 4301824,
  },

  {
    id: "welcome",
    name: "Welcome.md",
    type: "md",
    parentId: null,
    icon: "file-text",
    contentPath: "welcome.md",
    size: 1126400,
  },

  // Documentation
  {
    id: "about-this-website",
    name: "About this Website",
    type: "md",
    parentId: "documentation",
    icon: "scan-search",
    contentPath: "about-this-website.md",
    size: 2150912,
  },
  {
    id: "about-cypher-os",
    name: "About CYPHER OS",
    type: "md",
    parentId: "documentation",
    icon: "settings",
    contentPath: "about-cypher-os.md",
    size: 2150912,
  },

  // Who-Am-I
  {
    id: "about-me",
    name: "About Me",
    type: "md",
    parentId: "whoami",
    icon: "file-user",
    contentPath: "about-me.md",
    size: 1677721,
  },

  {
    id: "skills",
    name: "Skills",
    type: "md",
    parentId: "whoami",
    icon: "list-checks",
    contentPath: "skills.md",
    size: 1363148,
  },

  {
    id: "experience",
    name: "Experience",
    type: "md",
    parentId: "whoami",
    icon: "shield-check",
    contentPath: "experience.md",
    size: 2726297,
  },

  {
    id: "education",
    name: "Education",
    type: "md",
    parentId: "whoami",
    icon: "graduation-cap",
    contentPath: "education.md",
    size: 1153433,
  },
  {
    id: "contact",
    name: "Contact",
    type: "md",
    parentId: "whoami",
    icon: "book-user",
    contentPath: "contact.md",
    size: 838860,
  },
  {
    id: "resume",
    name: "Resume",
    type: "pdf",
    parentId: "whoami",
    icon: "file-down",
    pdfUrl: "/resume.pdf",
    size: 1048576,
  },

  // Settings
  {
    id: "settings",
    name: "Settings",
    type: "settings",
    parentId: null,
    icon: "settings",
  },

  // Contact Me
  {
    id: "contactForm",
    name: "Contact Me",
    type: "contact-form",
    parentId: "hidden",
    icon: "contact",
  },
];
