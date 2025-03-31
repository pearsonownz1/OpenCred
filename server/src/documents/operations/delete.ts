import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';
const prisma = new PrismaClient();

export const deleteDocument = async (id: string) => {
    const document = await prisma.document.delete({
        where: { id },
    });

    const filePath = path.join(process.cwd(), 'uploads', path.basename(document.path));
    await fs.unlink(filePath);

    return document;
};