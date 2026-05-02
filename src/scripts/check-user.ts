import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkUser() {
  const user = await prisma.user.findFirst();
  console.log('User ID:', user?.id);
  console.log('User Name:', user?.name);
  console.log('User Email:', user?.email);
  console.log('User Image Length:', user?.image?.length);
  process.exit(0);
}

checkUser();
