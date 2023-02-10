<template>
    <div class="flex mb-14 gap-2">
        <div>
            <label class="flex items-center h-10 text-sm font-light text-gray-400 px-2" for="searchInput">
                Search by bank, account, reference, category, data, amount, currency
            </label>
            <input
                :value="filters.search.string"
                id="searchInput"
                class="w-full h-10 rounded-md border border-gray-300 px-5 text-sm"
                @input="createFiltersAndSearch($event.target.value)"
            >
        </div>

        <div>
            <label class="flex items-center h-10 text-sm font-light text-gray-400 px-2" for="bankInput">
                Bank
            </label>
            <select
                :value="filters.bank"
                id="bankInput"
                class="w-full h-10 rounded-md border border-gray-300 bg-transparent py-0 pl-2 pr-7 text-gray-700 text-sm"
                name="currency"
                @change="searchTransactions('bank', $event.target.value)"
            >
                <option value="">All</option>
                <option v-for="bankItem in banks" :key="bankItem.bank" :value="bankItem.bank">
                    {{bankItem.bank}}
                </option>
            </select>
        </div>

        <div>
            <label class="flex items-center h-10 text-sm font-light text-gray-400 px-2" for="accountInput">
                Account
            </label>
            <select
                :value="filters.account"
                id="accountInput"
                class="w-full h-10 rounded-md border border-gray-300 bg-transparent py-0 pl-2 pr-7 text-gray-700 text-sm"
                name="currency"
                @change="searchTransactions('account', $event.target.value)"
            >
                <option value="">All</option>
                <option v-for="account in accounts" :key="account.id" :value="account.id">
                    {{ account.name }}
                </option>
            </select>
        </div>

        <div>
            <label class="flex items-center h-10 text-sm font-light text-gray-400 px-2" for="startMonthInput">
                Starting month
            </label>
            <input id="startMonthInput" class="w-full h-10 rounded-md border border-gray-300 px-5 text-sm">
        </div>

        <div>
            <label class="flex items-center h-10 text-sm font-light text-gray-400 px-2" for="endMonthInput">
                Ending month
            </label>
            <input id="endMonthInput" class="w-full h-10 rounded-md border border-gray-300 px-5 text-sm">
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Account, Category } from "~/interfaces"
import { banks } from "~/services/networkRequests"
import {computed, useContext} from "@nuxtjs/composition-api";
import debounce from "~/services/debounce";

const { store } = useContext()

const filters = computed(() => store.getters["filters"])

const accounts = computed(() => store.getters["accounts"])
const categories = computed(() => store.getters["categories"])
const banks = computed(() => store.getters["banks"])

const searchTransactions = (key: 'bank'| 'account' | 'sort', value: string) => {
    store.dispatch('setFilter', {key, value})
    debounce(() => store.dispatch('getTransactions', filters))
}

const createFiltersAndSearch = (search: string) => {
    debounce(() => {
        let filteredAccounts = accounts.value
            .filter((account: Account) => account.name.toLowerCase().includes(search.toLowerCase()))
            .map((account: Account) => account.id)

        let filteredCategories = categories.value
            .filter((category: Category) => category.name.toLowerCase().includes(search.toLowerCase()))
            .map((category: Category) => category.id)

        let filteredBanks = accounts.value
            .filter((account: Account) => account.bank.toLowerCase().includes(search.toLowerCase()))
            .map((account: Account) => account.id)

        store.dispatch('setSearch', {
            string: search,
            filteredAccounts: filteredAccounts,
            filteredCategories: filteredCategories,
            filteredBanks: filteredBanks,
        })
        store.dispatch('getTransactions')
    })
}
</script>

<style scoped>

</style>
