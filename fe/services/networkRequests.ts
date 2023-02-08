import {ApolloClient, InMemoryCache, gql} from '@apollo/client/core'
import 'cross-fetch/polyfill';
import type { TransactionFilterFields } from "~/interfaces";

const client = new ApolloClient({
    uri: 'http://localhost:4000', cache: new InMemoryCache(),
});

export const transactions = async (filter: TransactionFilterFields) => {
    return await client.query({
        query: gql`query {
            transactions(
                search: "${filter.search || ""}"
                bank: "${filter.bank || ""}"
                account: "${filter.account || ""}"
                startDate: "${filter.startDate || ""}"
                endDate: "${filter.endDate || ""}"
                sort: "${filter.sort || "desc"}"
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
    })
}
export const accounts = async () => {
    return await client.query({
        query: gql`query {
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
        query: gql`query {
            banks {
                bank
            }
        }`,
    })
}
export const categories = async () => {
    return await client.query({
        query: gql`query {
            categories {
                id
                name
                color
            }
        }`,
    })
}
