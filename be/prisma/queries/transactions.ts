import { prisma } from "../prismaClient.js";

type id = string
export interface TransactionFilterFields {
    search: {
        string: string,
        filteredAccounts: id[]
        filteredBanks: id[]
        filteredCategories: id[]
    }
    bank: string
    account: string
    startDate?: Date | null
    endDate?: Date | null
    sort: 'desc' | 'asc'
    cursor: id
}

export const getTransactions = (args: TransactionFilterFields) => {
    const filter = {
        where: {}
    }

    filter.where = {
        AND: [
            {
                OR: [
                    {reference: {contains: args.search.string, mode: 'insensitive'}},
                    {amount: {equals:  parseFloat(args.search.string) || undefined}},
                    {categoryId: {in:  args.search.filteredCategories},},
                    {accountId: {in:  [...args.search.filteredBanks, ...args.search.filteredAccounts]}},
                ]
            },
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
        ...filter
    })
}