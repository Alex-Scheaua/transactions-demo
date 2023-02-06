import { prisma } from "../prismaClient.js";

export const getAccounts = () => {
    return prisma.account.findMany()
}