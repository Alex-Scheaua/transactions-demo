<template>
    <div class="flex w-5/6 mb-14 gap-2">
        <div>
            <label class="flex items-center h-10 text-sm font-light text-gray-400 px-2" for="searchInput">
                Search by bank, account, reference, category, data, amount, currency
            </label>
            <input
                v-model="filters.search"
                id="searchInput"
                class="w-full h-10 rounded-md border border-gray-300 px-5 text-sm"
                @input="searchTransactions"
            >
        </div>

        <div>
            <label class="flex items-center h-10 text-sm font-light text-gray-400 px-2" for="bankInput">
                Bank
            </label>
            <select
                v-model="filters.bank"
                id="bankInput"
                class="w-full h-10 rounded-md border border-gray-300 bg-transparent py-0 pl-2 pr-7 text-gray-700 text-sm"
                name="currency"
            >
                <option value="">All</option>
                <option v-for="bankItem in bankList" :key="bankItem.bank" :value="bankItem.bank">
                    {{bankItem.bank}}
                </option>
            </select>
        </div>

        <div>
            <label class="flex items-center h-10 text-sm font-light text-gray-400 px-2" for="accountInput">
                Account
            </label>
            <select
                id="accountInput"
                class="w-full h-10 rounded-md border border-gray-300 bg-transparent py-0 pl-2 pr-7 text-gray-700 text-sm"
                name="currency"
            >
                <option value="">All</option>
                <option v-for="account in accountsList" :key="account.id">
                    {{ account.name }}
                </option>
            </select>
        </div>

        <div>
            <label class="flex items-center h-10 text-sm font-light text-gray-400 px-2" for="startMonthInput">
                Starting month
            </label>
            <input id="startMonthInput" class="w-full h-10 rounded-md border border-gray-300 px-5 text-sm">
        </div>

        <div>
            <label class="flex items-center h-10 text-sm font-light text-gray-400 px-2" for="endMonthInput">
                Ending month
            </label>
            <input id="endMonthInput" class="w-full h-10 rounded-md border border-gray-300 px-5 text-sm">
        </div>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue"
import type { Account, TransactionFilterFields } from "~/interfaces"
import { banks } from "~/services/networkRequests"

const props = defineProps<{
    accountsList: Account[]
}>()
const emit = defineEmits(['searchTransactions'])

const filters = <TransactionFilterFields>reactive({
    search: '',
    bank: '',
    account: '',
    sort: 'desc',
})

let bankList = ref([])

onMounted(() => {
    banks()
        .then(({data}) => {
            console.log(data);
            bankList.value = data.banks
        })
})

const searchTransactions = () => {
    emit('searchTransactions', filters)
}
</script>

<style scoped>

</style>
