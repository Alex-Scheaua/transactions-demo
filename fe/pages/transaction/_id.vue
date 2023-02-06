<template>
  <div>
    Transaction {{route.params.id}}
  </div>
</template>

<script lang="ts" setup>
import {useRoute} from '@nuxtjs/composition-api'

const route = useRoute()
</script>

<style scoped>

</style>
