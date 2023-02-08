import { getTransactions} from "../prisma/queries/transactions.js";
import type { TransactionFilterFields } from "../prisma/queries/transactions.js";
import { getAccounts, getBanks } from "../prisma/queries/accounts.js";
import { getCategories } from "../prisma/queries/categories.js";

export const resolvers = {
    Query: {
        transactions(parent: undefined, transactionFilters: TransactionFilterFields) {
            return getTransactions(transactionFilters)
        },
        accounts() {
            return getAccounts()
        },
        banks() {
            return getBanks()
        },
        categories() {
            return getCategories()
        }
    }
}