import { ExternalLink, FolderGit2 } from "lucide-react";
import Badge from "@/components/ui/Badge";

export interface Project {
  id: string;
  name: string;
  description: string;
  skills: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  imageUrl?: string | null;
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
}

const skillBadgeConfig: Record<
  string,
  { image: string; border: string; color: string }
> = {
  Next: {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    border: "#000000",
    color: "#ffffff",
  },
  TypeScript: {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    border: "#3178c6",
    color: "#3178c6",
  },
  React: {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    border: "#61dafb",
    color: "#61dafb",
  },
  Tailwind: {
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg",
    border: "#06b6d4",
    color: "#06b6d4",
  },
  Prisma: {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
    border: "#2d3748",
    color: "#ffffff",
  },
  Supabase: {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    border: "#3ecf8e",
    color: "#3ecf8e",
  },

  JavaScript: {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    border: "#f7df1e",
    color: "#f7df1e",
  },

  Vercel: {
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/vercel/vercel-original.svg",
    border: "#000000",
    color: "#FFFFFF",
  },
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div onClick={() => window.open(`${project.liveUrl}`, "_blank")}>
      <div className="bg-[#1a1a1a] border border-[#3b3838] rounded-lg p-4 hover:border-yellow-400/50 transition-colors flex flex-col">
        {project.imageUrl && (
          <div className="w-full h-32 bg-[#2d3138] rounded mb-3 overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h3 className="text-lg font-semibold text-white mb-2">
          {project.name}
        </h3>

        <p className="text-sm text-gray-400 mb-3 line-clamp-2 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3 -m-1">
          {project.skills.map((skill, index) => {
            const config = skillBadgeConfig[skill];

            return (
              <Badge
                key={index}
                altname={skill}
                image={config?.image}
                border={config?.border || "#f9ba15"}
                color={config?.color || "#f9ba15"}
                context="tech"
              />
            );
          })}
        </div>

        <div className="flex gap-2 mt-auto">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 bg-yellow-500 text-black text-sm rounded hover:bg-yellow-400 transition-colors font-medium"
            >
              <ExternalLink size={18} />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-[#2d3138] text-gray-300 text-sm rounded hover:bg-[#3d4148] transition-colors"
            >
              <FolderGit2 size={20} />
              GitHub Repository
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
