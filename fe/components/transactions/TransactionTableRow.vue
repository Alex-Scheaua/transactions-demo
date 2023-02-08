<template>
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">
            {{ transaction.reference }}
        </th>
        <td class="px-6 py-4">
            {{ category }}
        </td>
        <td class="px-6 py-4">
            {{ transaction.date }}
        </td>
        <td class="px-6 py-4 text-right">
            {{ transaction.amount }}
            <span class="text-gray-400">
              {{ transaction.currency }}
            </span>
        </td>
    </tr>
</template>

<script lang="ts" setup>
import type { Transaction } from "~/interfaces"

defineProps<{
    transaction: Transaction
    category: String
}>()
</script>

<style scoped>

</style>
