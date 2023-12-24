import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
    log: ['info','warn','query','error']
});
export default prisma
