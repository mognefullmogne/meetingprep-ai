import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'aimonepitacco@gmail.com';

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingUser) {
    // Promote to admin
    await prisma.user.update({
      where: { email: adminEmail },
      data: { role: 'ADMIN' },
    });
    console.log(`✅ User ${adminEmail} promoted to ADMIN`);
  } else {
    console.log(`⚠️  User ${adminEmail} not found. They need to sign in first.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
