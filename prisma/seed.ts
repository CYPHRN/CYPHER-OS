import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

async function main() {
  await prisma.project.deleteMany();

  const projects = [
    {
      name: "CYPHER OS",
      description:
        "Desktop operating system simulation built with Next.js, featuring file explorer, window management, and interactive UI",
      skills: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Supabase"],
      githubUrl: null,
      liveUrl: "www.alexandru-moise.com",
      featured: false,
      order: 2,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
