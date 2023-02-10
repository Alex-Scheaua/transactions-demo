<template>
    <div class="flex mb-6 overflow-hidden relative">
        <div v-if="loading" class="absolute w-full h-full z-50 bg-gray-700 opacity-75 flex flex-col items-center justify-center">
            <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
        </div>
        <div
            class="flex flex-col flex-grow w-full border border-gray-100 rounded-md"
            :class="loading ? 'overflow-hidden' : 'overflow-y-auto'"
        >
            <table class="text-sm text-left text-gray-500 rounded-md">
                <thead class="text-xs text-gray-700 uppercase">
                <tr>
                    <th class="border border-gray-100 bg-gray-50 px-6 py-3" scope="col">
                        Reference
                    </th>
                    <th class="border border-gray-100 bg-gray-50 px-6 py-3" scope="col">
                        Category
                    </th>
                    <th class="border border-gray-100 bg-gray-50 px-6 py-3" scope="col">
                        Date
                    </th>
                    <th class="border border-gray-100 bg-gray-50 px-6 py-3" scope="col">
                        Amount
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="!transactions.length">
                    <td colspan="4" class="text-center">
                        <span class="w-full">
                            No transactions were found...
                        </span>
                    </td>
                </tr>
                <transaction-table-row
                    v-for="transaction in transactions"
                    :key="transaction.id"
                    :transaction="transaction"
                    :category="categories.find(category => category.id === transaction.categoryId)"
                />
                <tr v-if="!lastBatch">
                    <td colspan="4" class="text-center">
                        <button
                            class="w-full hover:text-blue-700"
                            @click="store.dispatch('getTransactions', {loadMore: true})"
                        >
                            Load more trasactions...
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script lang="ts" setup>
import TransactionTableRow from "~/components/transactions/TransactionTableRow.vue"
import {computed, useContext} from "@nuxtjs/composition-api"
const { store } = useContext()

const transactions = computed(() => store.getters["transactions"])
const categories = computed(() => store.getters["categories"])
const loading = computed(() => store.getters["loading"])
const lastBatch = computed(() => store.getters["lastBatch"])
</script>

<style scoped>
thead tr th {
    position: sticky;
    top: 0;
}
</style>
