<template>
  <h1>Hello PetBacker Vue Task2</h1>
  <button @click="loadMore">
    Load More
  </button>

  <h1 v-if="items.length === 0">Loading...</h1>

  <ul v-else>
    <li v-for="item in items" :key="item.id">
      {{ item.title }}
    </li>
  </ul>
</template>

<script setup>
import { fetchFirstPage, fetchNextPage } from './services/contentsApi'
import {ref, onMounted} from 'vue'

const items = ref([])
const tag = ref(null)
let batch = 8

const loadMore = async () => {
  const res = await fetchNextPage(batch, tag.value)

  items.value.push(...(res.items ?? []))
  tag.value = res.tag

  console.log(res)
}

onMounted(async () => {
  const res = await fetchFirstPage()
  items.value = res.items ?? []
  tag.value = res.tag
})

</script>
