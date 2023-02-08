import type {
    Transaction,
    Category,
    Account,
    Bank,
    TransactionFilterFields,
    TransactionFilterFieldSearch
} from "~/interfaces"
import {transactions, accounts, categories, banks} from "~/services/networkRequests"
import {Commit} from 'vuex';

interface State {
    transactions: Transaction[]
    categories: Category[]
    accounts: Account[]
    banks: Bank[]

    filters: TransactionFilterFields
}

export const state = () => (<State>{
    transactions: [],
    categories: [],
    accounts: [],
    banks: [],
    filters: {
        search: {
            string: '',
            filteredAccounts: [],
            filteredBanks: [],
            filteredCategories: []
        },
        bank: '',
        account: '',
        sort: 'desc',
    }
})

export const getters = {
    transactions: (state: State) => state.transactions,
    categories: (state: State) => state.categories,
    accounts: (state: State) => state.accounts,
    banks: (state: State) => state.banks,
    filters: (state: State) => state.filters,
}

export const mutations = {
    SET_TRANSACTIONS(state: State, transactions: Transaction[]) {
        state.transactions = transactions;
    }, SET_CATEGORIES(state: State, categories: Category[]) {
        state.categories = categories
    }, SET_ACCOUNTS(state: State, accounts: Account[]) {
        state.accounts = accounts
    }, SET_BANKS(state: State, banks: Bank[]) {
        state.banks = banks
    },SET_FILTER(state: State, {key, value}: {key: 'bank'| 'account' | 'sort', value: string}) {
        state.filters[key] = value
    },SET_SEARCH(state: State, search: TransactionFilterFieldSearch) {
        state.filters.search = search
    }
}

export const actions = {
    async getTransactions({commit, state}: { commit: Commit, state: State }) {
        try {
            const transactionsList = (await transactions(state.filters)).data.transactions

            commit('SET_TRANSACTIONS', transactionsList)
        } catch (e) {
            console.error(e)
        }
    }, async getCategories({commit}: { commit: Commit }) {
        try {
            const categoriesList = (await categories()).data.categories

            commit('SET_CATEGORIES', categoriesList)
        } catch (e) {
            console.error(e)
        }
    }, async getAccounts({commit}: { commit: Commit }) {
        try {
            const accountsList = (await accounts()).data.accounts

            commit('SET_ACCOUNTS', accountsList)
        } catch (e) {
            console.error(e)
        }
    }, async getBanks({commit}: { commit: Commit }) {
        try {
            const banksList = (await banks()).data.banks

            commit('SET_BANKS', banksList)
        } catch (e) {
            console.error(e)
        }
    }, setFilter({commit}: { commit: Commit }, {key, value}: {key: 'bank'| 'account' | 'sort', value: string}) {
        commit('SET_FILTER', {key, value})
    }, setSearch({commit}: { commit: Commit }, search: TransactionFilterFieldSearch) {
        commit('SET_SEARCH', search)
    },

}
