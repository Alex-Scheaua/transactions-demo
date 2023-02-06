<template>
  <div class="mt-8">
    Transactions
  </div>
</template>

<script lang="ts" setup>
  import {getTransactions} from "~/services/networkRequests"
  import {onMounted, ref} from "vue"

  let transactions = ref([])

  onMounted(() => {
      getTransactions()
        .then(({data}) => {
          transactions.value = data.transactions
        })
  })


</script>

<style scoped>

</style>
