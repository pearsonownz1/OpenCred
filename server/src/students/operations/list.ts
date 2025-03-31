import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function listStudents() {
  return await prisma.student.findMany();
}
