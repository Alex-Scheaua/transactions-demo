import { prisma } from "../prismaClient.js";
export interface TransactionFilters {
    search?: String
    Bank?: String
    Account?: String
    startDate?: Date
    endDate?: Date
    sort?: 'desc' | 'asc'
}
export const getTransactions = (args: TransactionFilters) => {
    return prisma.transaction.findMany({
        take: 20,
        orderBy: {
            date: args.sort
        }
    })
}