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
        
        type Query {
            transactions(search: String, Bank: String, Account: String, startDate: Date, endDate: Date): [Transaction]
            accounts: [Account]
            categories: [Category]
        }
`