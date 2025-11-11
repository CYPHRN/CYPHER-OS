# About CYPHER OS

I wanted a portfolio that didn't look like every other portfolio.

Most developer sites follow the same structure: hero section, project grid, contact form. Clean. Professional. Forgettable.

So I built a desktop operating system instead.

## Why a Desktop OS?

Because **showing beats telling**.

Anyone can list "React, TypeScript, State Management" on a resume. But can you architect a window manager that handles multiple draggable, resizable windows without performance issues? Can you design a file system that's intuitive to navigate? Can you build something this complex and keep it maintainable?

CYPHER OS answers those questions. It's not just a portfolio - it's proof of execution.

## Technical Challenges

The hard part wasn't implementing drag-and-drop. That's just event handlers and math.

The hard part was making it **feel right**:

- **State Architecture:** Managing window positions, z-index ordering, and navigation history without causing unnecessary re-renders
- **Edge Cases:** What happens when you drag a window off-screen? When you close the File Explorer mid-navigation? When you spam-click the minimize button?
- **UX Polish:** Instant response to clicks. No flickers. No jank. Details you won't consciously notice but would definitely feel if they were wrong.

## Tech Stack

**Frontend:** Next.js 15 + React 19 + TypeScript  
**Styling:** Tailwind CSS v4 + Custom Design System  
**Backend:** Prisma + Supabase (PostgreSQL)  
**Validation:** Zod for runtime type safety  
**Deployment:** Vercel with CI/CD

**Architecture Decisions:**

- Server-side rendering for SEO and instant page loads
- Type-safe end-to-end with TypeScript + Prisma generated types
- Custom React hook (`useWindowManager`) for window state - no Redux/Context needed
- Static file system structure with dynamic project data from database

## Design Philosophy

The hexagonal background pattern, dark theme with yellow accents, and subtle animations create a cohesive aesthetic that's professional without being boring.

Every interaction was designed intentionally. The File Explorer mimics real OS behavior. Windows cascade when opened. The navbar menus feel native. It's not just themed like an OS - it **behaves** like one.

## What's Next

Short term: Adding more projects to the database, refining mobile responsiveness, maybe throwing in some easter eggs.

Long term: Considering interactive games, document editing capabilities, or a blog system that lives inside the file explorer.

But honestly? The core experience is solid. This isn't a work-in-progress - it's a finished product I'm proud to ship.

---

**Want to work together?** Open the Contact window from the navigation bar.
