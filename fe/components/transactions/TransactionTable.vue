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
            <transaction-table-row v-for="transaction in transactions" :key="transaction.id" :transaction="transaction"/>
        </tbody>
    </table>
</template>

<script lang="ts" setup>
import TransactionTableRow from "~/components/transactions/TransactionTableRow.vue"
import type { Category, Transaction } from "~/interfaces"

defineProps<{
    transactions: Transaction[]
    categories: Category[]
}>()
</script>

<style scoped>

</style>
