<template>
    <nuxt-link :to="`transaction/${transaction.id}`" tag="tr" class="border-b hover:bg-gray-50 cursor-pointer">
        <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" scope="row">
            {{ transaction.reference }}
        </th>
        <td class="px-6 py-4 text-black" >
            <span :style="`background-color: #${category.color}99`" class="p-2 rounded-lg">
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
