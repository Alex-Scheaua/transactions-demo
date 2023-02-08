<template>
    <table class="w-5/6 text-sm text-left text-gray-500 dark:text-gray-400 border border-gray-100">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th class="px-6 py-3" scope="col">
                Reference
            </th>
            <th class="px-6 py-3" scope="col">
                Category
            </th>
            <th class="px-6 py-3" scope="col">
                Date
            </th>
            <th class="px-6 py-3" scope="col">
                Amount
            </th>
        </tr>
        </thead>
        <tbody>
            <transaction-table-row
                v-for="transaction in transactions"
                :key="transaction.id"
                :transaction="transaction"
                :category="categories.find(category => category.id === transaction.categoryId)?.name"
            />
        </tbody>
    </table>
</template>

<script lang="ts" setup>
import TransactionTableRow from "~/components/transactions/TransactionTableRow.vue"
import { computed, useContext } from "@nuxtjs/composition-api"
import { onMounted } from "vue"
const { store } = useContext()

onMounted(() => {
    store.dispatch('store/getTransactions')
    store.dispatch('store/getCategories')
})

const transactions = computed(() => store.getters["store/transactions"])
const categories = computed(() => store.getters["store/categories"])
</script>

<style scoped>

</style>
