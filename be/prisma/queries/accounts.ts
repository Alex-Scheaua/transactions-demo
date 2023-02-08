import { prisma } from "../prismaClient.js";

export const getAccounts = () => {
    return prisma.account.findMany()
}

export const getBanks = () => {
    return prisma.account.findMany({
        distinct: ['bank'],
        select: {bank: true}
    })
}