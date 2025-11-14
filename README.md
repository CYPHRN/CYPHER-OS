# 🖥️ CYPHER OS

> Interactive Desktop Operating System Portfolio

A modern CV/Portfolio website that simulates a desktop operating system environment. Experience my professional journey through an interactive interface featuring draggable windows, file system navigation, and authentic OS functionality.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4)](https://tailwindcss.com/)

**Live Demo:** [alexandru-moise.com](https://alexandru-moise.com)

---

## ✨ Features

### 🪟 Window Management

- **Draggable Windows** - Move windows anywhere on the desktop
- **Resizable Windows** - Adjust window size by dragging edges/corners
- **Window Snapping** - Snap to left/right half-screen (Windows 10/11 style)
- **Minimize/Maximize** - Full window control with state persistence
- **Z-Index Management** - Click to bring window to front
- **Active Windows Sidebar** - View and manage all open windows

### 📁 File System

- **File Explorer** - Navigate through folders with back/forward/up buttons
- **Navigation History** - Browser-style history with back/forward buttons
- **Multiple File Types** - Support for Markdown documents and PDFs
- **Dynamic Content Loading** - Files loaded on-demand from server
- **Breadcrumb Navigation** - Clear path display

### 🎨 User Interface

- **Hexagonal Pattern Background** - Animated geometric pattern
- **Boot Screen** - Authentic OS boot sequence on load
- **Screensaver** - Activates after 2 minutes of inactivity
- **Custom Cursor Options** - Multiple cursor styles to choose from
- **Responsive Design** - Full desktop experience on all devices

### 💼 Portfolio Features

- **About Me** - Professional introduction with profile photo
- **Experience** - Work history and achievements
- **Education** - Academic background
- **Skills** - Technical skills and expertise
- **Projects** - Portfolio projects with live demos
- **Contact Form** - Direct messaging with database storage
- **Resume Download** - PDF resume viewer and download

### ⚙️ Settings & Customization

- **Display Options** - Customize background patterns
- **Cursor Selection** - Choose from multiple cursor styles
- **Screensaver Settings** - Enable/disable and configure timeout

---

## 🚀 Tech Stack

### Frontend

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first styling
- **[Framer Motion](https://www.framer.com/motion/)** - Animations
- **[react-rnd](https://github.com/bokuweb/react-rnd)** - Draggable/resizable components
- **[react-markdown](https://github.com/remarkjs/react-markdown)** - Markdown rendering
- **[Lucide React](https://lucide.dev/)** - Icon library

### Backend & Database

- **[Supabase](https://supabase.com/)** - PostgreSQL database
- **[Prisma](https://www.prisma.io/)** - ORM and database toolkit
- **[Zod](https://zod.dev/)** - Runtime validation

### UI Components

- **[shadcn/ui](https://ui.shadcn.com/)** - Accessible component library
  - Navigation Menu
  - Sheet (Sidebar)
  - Context Menu
  - Sonner (Toasts)
  - Switch

---

## 🏗️ Project Structure

```
amt-cv/
├── prisma/
│   └── schema.prisma              # Database schema
├── public/
│   ├── images/                    # Images and assets
│   ├── content/                   # Markdown content files
│   └── logo.svg                   # CYPHER OS logo
├── src/
│   ├── app/
│   │   ├── actions/               # Server actions
│   │   ├── hooks/
│   │   │   ├── windowManager/     # Window management modules
│   │   │   ├── useWindowManager.ts
│   │   │   ├── useSettings.ts
│   │   │   └── useIdleDetection.ts
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Main desktop page
│   │   └── globals.css            # Global styles
│   ├── components/
│   │   ├── bootscreen/            # Boot screen component
│   │   ├── desktop/               # Desktop and icons
│   │   ├── navbar/                # Navigation bar
│   │   ├── screensaver/           # Screensaver
│   │   └── windows/               # Window components
│   │       ├── Window.tsx         # Base window
│   │       ├── FileExplorer.tsx   # File browser
│   │       ├── DocumentViewer.tsx # Markdown viewer
│   │       ├── PdfViewer.tsx      # PDF viewer
│   │       ├── SettingsWindow.tsx # Settings
│   │       ├── ContactForm.tsx    # Contact form
│   │       └── SnapPreview.tsx    # Snap preview overlay
│   ├── data/
│   │   └── fileSystem.ts          # File system structure
│   └── types/
│       ├── window.ts              # Window interfaces
│       └── index.ts               # Type exports
├── .env.example                   # Example environment variables
├── next.config.ts                 # Next.js configuration
├── tailwind.config.ts             # Tailwind configuration
└── tsconfig.json                  # TypeScript configuration
```

---

## 👨‍💻 Author

**Alexandru Moise**

- Website: [alexandru-moise.com](https://alexandru-moise.com)
- GitHub: [@CYPHRN](https://github.com/CYPHRN)
- LinkedIn: [Alex Moise](https://www.linkedin.com/in/alex-moise-12322728b/)

---
