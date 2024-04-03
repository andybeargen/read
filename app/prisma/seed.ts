import { prisma } from "~/db.server";
import critters from "../critters.json";

async function main() {
  // seed database with critters from critters.json
  critters.forEach(async (critter) => {
    await prisma.critter.upsert({
      where: { name: critter.data.name },
      update: {},
      create: {
        name: critter.data.name,
        description: critter.data.description,
        type: critter.data.type,
        image: critter.data.image,
      },
    });
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
