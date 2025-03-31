import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getStudentById(id: string) {
  return await prisma.student.findUnique({
    where: { id },
  });
}
