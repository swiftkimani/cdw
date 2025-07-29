// import { PrismaClient } from "@prisma/client"

// const globalForPrisma = globalThis as unknown as {
//     prisma: PrismaClient
// }
// export const prisma =
//     globalForPrisma.prisma ||
//     makeClient();

//     function makeClient(): PrismaClient {
//       return new PrismaClient();
//     }
        
// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
};
export const prisma = globalForPrisma.prisma || makeClient();

function makeClient(){
  return new PrismaClient().$extends(withAccelerate());
}

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
