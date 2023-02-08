import type { Transaction, Category, Account, Bank, TransactionFilterFields } from "~/interfaces";
import { transactions, accounts, categories, banks } from "~/services/networkRequests"
import { Commit } from 'vuex';
interface State {
    transactions: Transaction[]
    categories: Category[]
    accounts: Account[]
    banks: Bank[]
}
export const state = () => (<State>{
    transactions: [],
    categories: [],
    accounts: [],
    banks: []
})

export const getters = {
    transactions: (state: State) => state.transactions,
    categories: (state: State) => state.categories,
    accounts: (state: State) => state.accounts,
    banks: (state: State) => state.banks,
}

export const mutations = {
    SET_TRANSACTIONS(state: State, transactions: Transaction[]) {
        state.transactions = transactions;
    },
    SET_CATEGORIES(state: State, categories: Category[]) {
        state.categories = categories;
    },
    SET_ACCOUNTS(state: State, accounts: Account[]) {
        state.accounts = accounts;
    },
    SET_BANKS(state: State, banks: Bank[]) {
        state.banks = banks;
    },
}

export const actions = {
    async getTransactions({ commit }: { commit: Commit }, filter: TransactionFilterFields) {
        try{
            const transactionsList = (await transactions(filter)).data.transactions

            commit('SET_TRANSACTIONS', transactionsList)
        } catch (e) {
            console.error(e)
        }
    },
    async getCategories ({ commit }: { commit: Commit }) {
        try{
            const categoriesList = (await categories()).data.categories

            commit('SET_CATEGORIES', categoriesList)
        } catch (e) {
            console.error(e)
        }
    },
    async getAccounts ({ commit }: { commit: Commit }) {
        try{
            const accountsList = (await accounts()).data.accounts

            commit('SET_ACCOUNTS', accountsList)
        } catch (e) {
            console.error(e)
        }
    },
    async getBanks ({ commit }: { commit: Commit }) {
        try{
            const banksList = (await banks()).data.banks

            commit('SET_BANKS', banksList)
        } catch (e) {
            console.error(e)
        }
    },
}
