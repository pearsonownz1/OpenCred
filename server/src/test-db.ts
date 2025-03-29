import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create a test student
    const student = await prisma.student.create({
      data: {
        name: 'Test Student',
        email: 'test@example.com',
      },
    });

    console.log('Created test student:', student);

    // Retrieve all students
    const students = await prisma.student.findMany();
    console.log('All students:', students);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 