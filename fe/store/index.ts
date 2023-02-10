import type {
    Id,
    Transaction,
    Category,
    Account,
    Bank,
    TransactionFilterFields,
    TransactionFilterFieldSearch
} from "~/interfaces"
import {transactions, accounts, categories, banks} from "~/services/networkRequests"
import {Commit, Dispatch} from 'vuex';

interface State {
    transactions: Transaction[]
    selectedTransaction: Transaction | {}
    categories: Category[]
    accounts: Account[]
    banks: Bank[]
    filters: TransactionFilterFields
    loading: boolean
    lastBatch: boolean
}

export const state = () => (<State>{
    transactions: [],
    selectedTransaction: {},
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
        banks: [],
        bank: '',
        account: '',
        sort: 'desc',
        cursor: '',
    },
    loading: false,
    lastBatch: false
})

export const getters = {
    transactions: (state: State) => state.transactions,
    selectedTransaction: (state: State) => state.selectedTransaction,
    categories: (state: State) => state.categories,
    accounts: (state: State) => state.accounts,
    banks: (state: State) => state.banks,
    filters: (state: State) => state.filters,
    loading: (state: State) => state.loading,
    lastBatch: (state: State) => state.lastBatch,
}

export const mutations = {
    SET_TRANSACTIONS(state: State, { transactions, loadMore }: { transactions: Transaction[], loadMore: boolean }) {
        state.transactions = loadMore ? [...state.transactions, ...transactions] : transactions
        state.filters.cursor = transactions.length ? transactions[transactions.length-1].id : '';
        state.lastBatch = transactions.length < 20
    },
    SET_SELECTED_TRANSACTION(state: State, selectedTransaction: Transaction[]) {
        state.selectedTransaction = selectedTransaction
    },
    SET_CATEGORIES(state: State, categories: Category[]) {
        state.categories = categories
    },
    SET_ACCOUNTS(state: State, accounts: Account[]) {
        state.accounts = accounts
    },
    SET_BANKS(state: State, banks: Bank[]) {
        state.banks = banks
    },
    SET_FILTER(state: State, {key, value}: {key: 'banks'| 'account' | 'sort', value: string & string[]}) {
        state.filters[key] = value
    },
    SET_SEARCH(state: State, search: TransactionFilterFieldSearch) {
        state.filters.search = search
    },
    SET_LOADING(state: State, isLoading: boolean) {
        state.loading = isLoading
    }
}

export const actions = {
    async nuxtServerInit({dispatch}: { dispatch: Dispatch}) {
        await dispatch('getTransactions')
        await dispatch('getCategories')
        await dispatch('getAccounts')
        await dispatch('getBanks')

    },
    async getTransactions({commit, state}: { commit: Commit, state: State }, loadMore: boolean) {
        commit('SET_LOADING', true)
        try {
            if(state.filters.bank) {
                state.filters.banks = state.banks.find((bank: Bank) => bank.name === state.filters.bank)?.ids || []
            }

            const filters = {
                ...state.filters,
                cursor: loadMore ? state.filters.cursor : ''
            }
            const transactionsList = (await transactions(filters)).data.transactions

            commit('SET_TRANSACTIONS', { transactions: transactionsList, loadMore })
        } catch (e) {
            console.error(e)
        }
        commit('SET_LOADING', false)
    },
    async getSelectedTransaction({commit, state}: { commit: Commit, state: State }, id: Id) {
        try {
            const filter = {
                search: {
                    string: id,
                    filteredAccounts: [],
                    filteredBanks: [],
                    filteredCategories: []
                },
                banks: [],
                bank: '',
                account: '',
                sort: 'desc',
                cursor: '',
            }

            const selectedTransaction = (await transactions(filter)).data.transactions[0]

            commit('SET_SELECTED_TRANSACTION', selectedTransaction)
        } catch (e) {
            console.error(e)
        }
    },
    async getCategories({commit}: { commit: Commit }) {
        try {
            const categoriesList = (await categories()).data.categories

            commit('SET_CATEGORIES', categoriesList)
        } catch (e) {
            console.error(e)
        }
    },
    async getAccounts({commit}: { commit: Commit }) {
        try {
            const accountsList = (await accounts()).data.accounts

            commit('SET_ACCOUNTS', accountsList)
        } catch (e) {
            console.error(e)
        }
    },
    async getBanks({commit}: { commit: Commit }) {
        try {
            const banksList = (await banks()).data.banks

            commit('SET_BANKS', banksList)
        } catch (e) {
            console.error(e)
        }
    },
    setFilter({commit}: { commit: Commit }, {key, value}: {key: 'bank'| 'account' | 'sort', value: string}) {
        commit('SET_FILTER', {key, value})
    },
    setSearch({commit}: { commit: Commit }, search: TransactionFilterFieldSearch) {
        commit('SET_SEARCH', search)
    },
}
