<template>
    <nuxt-link :to="`/transactions/${transaction.id}`" tag="tr" class="border-b hover:bg-gray-50 cursor-pointer">
        <td class="px-6 py-4 font-medium whitespace-nowrap" :class="transaction.reference ? 'text-gray-900' : 'text-gray-400'">
            {{ transaction.reference || 'None provided' }}
        </td>
        <td class="px-6 py-4 text-black" >
            <span :style="`background-color: #${category.color}99`" class="px-2 py-1 rounded-lg">
               {{ category.name }}
            </span>
        </td>
        <td class="px-6 py-4">
            {{ new Date(transaction.date).toLocaleString() }}
        </td>
        <td class="px-6 py-4 text-right">
            {{ transaction.amount }}
            <span class="text-gray-400">
              {{ transaction.currency }}
            </span>
        </td>
    </nuxt-link>
</template>

<script lang="ts" setup>
import type {Category, Transaction} from "~/interfaces"

defineProps<{
    transaction: Transaction
    category: Category
}>()
</script>

<style scoped>

</style>
