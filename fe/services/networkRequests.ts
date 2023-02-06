import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core'
import 'cross-fetch/polyfill';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

export const getTransactions = async () => {
  return await client.query({
    query: gql`query {
      transactions(search: "test") {
        id
        accountId
        categoryId
        reference
        amount
        currency
        date
      }
    }
    `,
  })
}

export const getAccounts = async () => {
  return await client.query({
    query: gql`query {
      accounts {
        id
        name
        bank
      }
    }
    `,
  })
}

export const getCategories = async () => {
  return await client.query({
    query: gql`query {
      categories {
        id
        name
        color
      }
    }
    `,
  })
}
