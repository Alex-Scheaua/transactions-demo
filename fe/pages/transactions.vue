<template>
    <div class="flex flex-col overflow-hidden w-5/6">
        <h1 class="text-xl font-bold text-gray-700 my-8">
            Transactions
        </h1>
        <transaction-filters-section />
        <transaction-table />
    </div>
</template>

<script lang="ts" setup>
import TransactionFiltersSection from "~/components/transactions/TransactionFilters.vue"
import TransactionTable from "~/components/transactions/TransactionTable.vue"
</script>

<style scoped></style>
