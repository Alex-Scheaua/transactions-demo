import { prisma } from "../prismaClient.js";
import { Prisma } from "@prisma/client";

type Id = string
export interface TransactionFilterFields {
    search: {
        string: string,
        filteredAccounts: Id[]
        filteredBanks: Id[]
        filteredCategories: Id[]
    }
    banks: string[]
    account: string
    startDate?: Date | null
    endDate?: Date | null
    sort: 'desc' | 'asc'
    cursor: Id
}

export const getTransactions = (filters: TransactionFilterFields) => {
    return prisma.transaction.findMany({
        take: 20,
        cursor: filters.cursor ? {id: filters.cursor} : undefined,
        skip: filters.cursor ? 1 : 0,
        orderBy: {
            date: filters.sort
        },
        ...generateQuery(filters)
    })
}

const generateQuery = (filters: TransactionFilterFields) => {
    const AND = []
    AND.push({
        OR: [
            {id: {equals: filters.search.string}},
            {reference: {contains: filters.search.string, mode: 'insensitive'}},
            {amount: {equals:  parseFloat(filters.search.string) || undefined}},
            {categoryId: {in:  filters.search.filteredCategories},},
            {accountId: {in:  [...filters.search.filteredBanks, ...filters.search.filteredAccounts]}},
        ]
    } as Prisma.TransactionWhereInput)

    if(filters.banks.length) {
        AND.push({accountId: {in: filters.banks}})
    }

    if(filters.account) {
        AND.push({accountId: {equals: filters.account}})
    }

    if(filters.startDate) {
        AND.push({date: {gt: filters.startDate}})
    }

    if(filters.endDate) {
        AND.push({date: {lt: filters.endDate}})
    }

    return {
        where: {
            AND: AND
        }
    }
}