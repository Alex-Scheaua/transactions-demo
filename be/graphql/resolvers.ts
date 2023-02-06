import { getTransactions} from "../prisma/queries/transactions.js";
import type { TransactionFilters } from "../prisma/queries/transactions.js";
import { getAccounts } from "../prisma/queries/accounts.js";
import { getCategories } from "../prisma/queries/categories.js";

export const resolvers = {
    Query: {
        transactions(parent: undefined, transactionFilters: TransactionFilters) {
            return getTransactions(transactionFilters)
        },
        accounts() {
            return getAccounts()
        },
        categories() {
            return getCategories()
        }
    }
}