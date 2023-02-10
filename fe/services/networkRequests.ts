import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core'
import 'cross-fetch/polyfill';
import type { TransactionFilterFields } from "~/interfaces";

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
});

export const transactions = async (filter: TransactionFilterFields) => {
    return await client.query({
        query: gql`query GetTransactions(
            $string: String
            $filteredAccounts: [String]
            $filteredCategories: [String]
            $filteredBanks: [String]
            $bank: String
            $account: String
            $startDate: Date
            $endDate: Date
            $sort: String
            $cursor: String
        ) {
            transactions(
                search: {
                    string: $string
                    filteredAccounts: $filteredAccounts
                    filteredCategories: $filteredCategories
                    filteredBanks: $filteredBanks
                }
                bank: $bank
                account: $account
                startDate: $startDate
                endDate: $endDate
                sort: $sort
                cursor: $cursor
            ) {
                id
                accountId
                categoryId
                reference
                amount
                currency
                date
            }
        }`,
        variables: {
            string: filter.search.string,
            filteredAccounts: filter.search.filteredAccounts,
            filteredCategories: filter.search.filteredCategories,
            filteredBanks: filter.search.filteredBanks,
            bank: filter.bank,
            account: filter.account,
            startDate: filter.startDate,
            endDate: filter.endDate,
            sort: filter.sort || 'desc',
            cursor: filter.cursor
        }
    })
}
export const accounts = async () => {
    return await client.query({
        query: gql`query GetAccounts {
            accounts {
                id
                name
                bank
            }
        }`,
    })
}

export const banks = async () => {
    return await client.query({
        query: gql`query GetBanks {
            banks {
                bank
            }
        }`,
    })
}
export const categories = async () => {
    return await client.query({
        query: gql`query GetCategories {
            categories {
                id
                name
                color
            }
        }`,
    })
}
