export const typeDefs = `#graphql
scalar Date
type Transaction {
    id: String
    accountId: String
    categoryId: String
    reference: String
    amount: Float
    currency: String
    date: Date
}

type Account {
    id: String
    name: String
    bank: String
}

type Category {
    id: String
    name: String
    color: String
}
type Bank {
    name: String
    ids: [String]
}

input Search {
    string: String
    filteredAccounts: [String]
    filteredBanks: [String]
    filteredCategories: [String]
}

type Query {
    transactions(search: Search, banks: [String], account: String, startDate: Date, endDate: Date, sort: String, cursor: String): [Transaction]
    accounts: [Account]
    banks: [Bank]
    categories: [Category]
}
`