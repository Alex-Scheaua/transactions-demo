<template>
    <div class="mt-8 flex flex-col items-center">
        <h1 class="w-5/6 text-xl font-bold text-gray-700 mb-8">
            Transactions
        </h1>
        <transaction-filters-section :accounts-list="accountsList" @searchTransactions="getTransactions($event)"/>
        <transaction-table :transactions="transactionsList" :categories="categoriesList"/>

    </div>
</template>

<script lang="ts" setup>
import TransactionFiltersSection from "~/components/transactions/TransactionFilters.vue"
import TransactionTable from "~/components/transactions/TransactionTable.vue"
import type { TransactionFilterFields } from "~/interfaces"
import { transactions, accounts, categories } from "~/services/networkRequests"
import { onMounted, ref } from "vue"

let transactionsList = ref([])
let categoriesList = ref([])
let accountsList = ref([])

onMounted(() => {
    getTransactions({})
    getAccounts()
    getCategories()
})

const getTransactions = (filter: TransactionFilterFields) => {
    transactions(filter)
        .then(({data}) => {
            transactionsList.value = data.transactions
        })
}

const getAccounts = () => {
    accounts()
        .then(({data}) => {
            accountsList.value = data.accounts
        })
}

const getCategories = () => {
    categories()
        .then(({data}) => {
            categoriesList.value = data.categories
        })
}
</script>

<style scoped>

</style>
