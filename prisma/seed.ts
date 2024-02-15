import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // PERMISSIONS
  await prisma.permission.create({
    data: {
      name: "read",
    },
  });

  await prisma.permission.create({
    data: {
      name: "create",
    },
  });

  await prisma.permission.create({
    data: {
      name: "update",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
