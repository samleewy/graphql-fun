import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    await prisma.book.create({
        data: {
            title: 'The Book Of Life',
            author: 'Samuel Lee'
        }
    });
    const allBooks = await prisma.book.findMany();
    console.log(allBooks);
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });