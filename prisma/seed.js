const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: { name: 'Sandeep', email: 'sandeep@example.com' },
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
