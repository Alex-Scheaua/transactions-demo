import { prisma } from "../prismaClient.js";

export interface TransactionFilterFields {
    search?: String
    bank?: String
    account?: String
    startDate?: Date | null
    endDate?: Date | null
    sort?: 'desc' | 'asc'
}

export const getTransactions = (args: TransactionFilterFields) => {
    const filter = {
        where: {}
    }

    filter.where = {
        AND: [
                args.search ? {
                    OR: [
                        {reference: {contains: args.search, mode: 'insensitive'}}
                    ]
                } : null,
                args.bank ? {account: {is: {bank: args.bank}}} : null,
                args.account ? {accountId: {equals: args.account}} : null,
                args.startDate ? {date: {gt: args.startDate}} : null,
                args.endDate ? {date: {lt: args.endDate}}: null
            ],

    }

    return prisma.transaction.findMany({
        take: 20,
        orderBy: {
            date: args.sort
        },
        ...filter,
        include: {
            account: true,
            category: true
        }
    })
}