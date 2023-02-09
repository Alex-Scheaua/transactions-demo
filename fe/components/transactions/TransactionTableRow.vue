<template>
    <tr class="bg-white border-b hover:bg-gray-50 cursor-pointer">
        <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" scope="row">
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
