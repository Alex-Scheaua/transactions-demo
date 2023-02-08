<template>
    <div class="mt-8 flex flex-col items-center">
        <h1 class="w-5/6 text-xl font-bold text-gray-700 mb-8">
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
