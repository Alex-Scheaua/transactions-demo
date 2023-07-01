import { prisma } from "./prismaClient.js"
import csv from "csv-parser"
import https from "https";

interface TransactionRow {
    id: string
    accountId: string
    categoryId: string
    reference: string
    date: Date
    amount: number
    currency: "EUR" | "GBP"
}

interface AccountRow {
    id: string
    name: string
    bank: string
}

interface CategoryRow {
    id: string
    name: string
    color: string
}

const dbFilesUrl = 'https://raw.githubusercontent.com/Alex-Scheaua/transactions-demo/master/db/data'

const handleTransactions = async () => {
    console.log("Seeding Transactions. Please wait...")
    return new Promise<void>(async resolve => {
        https.get(`${dbFilesUrl}/transactions.csv`, stream => {
            stream
                .pipe(csv({
                    headers: ['id', 'accountId', 'categoryId', 'reference', 'amount', 'currency', 'date'],
                    skipLines: 1
                }))
                .on('data', async (row: TransactionRow) => {
                    await prisma.transaction.upsert({
                        where: {
                            id: row.id
                        },
                        update: {},
                        create: {
                            ...row,
                            amount: parseFloat(String(row.amount)),
                            date: new Date(row.date),
                        },
                    }).catch(error => {
                    })
                })
                .on('end', () => {
                    resolve()
                })
        })
    })
}

const handleAccounts = async () => {
    console.log("Seeding Accounts")
    return new Promise<void>((resolve) => {
        https.get(`${dbFilesUrl}/accounts.csv`, stream => {
            stream
                .pipe(csv({
                    headers: ['id', 'name', 'bank'],
                    skipLines: 1
                }))
                .on('data', async (row: AccountRow) => {
                    const idKey = Object.keys(row)[0] as "id"
                    row = {
                        ...row,
                        id: row[idKey],
                    }
                    await prisma.account.upsert({
                        where: {
                            id: row.id
                        },
                        update: {},
                        create: row,
                    })
                })
                .on('end', () => {
                    resolve()
                })
        })
    })
}

const handleCategories = async () => {
    console.log("Seeding Categories")
    return new Promise<void>((resolve) => {
        https.get(`${dbFilesUrl}/categories.csv`, stream => {
            stream
                .pipe(csv({
                headers: ['id', 'name', 'color'],
                skipLines: 1
            }))
                .on('data', async (row: CategoryRow) => {
                    await prisma.category.upsert({
                        where: {
                            id: row.id
                        },
                        update: {},
                        create: row,
                    })
                })
                .on('end', () => {
                    resolve()
                })
        })

    })
}

handleTransactions().then(() => console.log('Transactions seeded'))
handleCategories().then(() => console.log('Categories seeded'))
handleAccounts().then(() => console.log('Accounts seeded'))
