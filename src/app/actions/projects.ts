"use server";
import { prisma } from "@/lib/prisma";

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "desc" },
    });
    return { success: true, data: projects };
  } catch (error) {
    console.error("Failed to fetch projects", error);
    return { success: false, error: "Failed to fetch projects" };
  }
}
