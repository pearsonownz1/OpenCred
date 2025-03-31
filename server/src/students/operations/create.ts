import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createStudent(data: {
  name: string;
  email: string;
}) {
  return await prisma.student.create({
    data: {
      name: data.name,
      email: data.email,
    },
  });
}
