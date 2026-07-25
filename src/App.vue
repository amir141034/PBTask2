<template>
  <div class="page">
    <h1>Hello PetBacker Vue Task2</h1>
    <q-btn
      label="Load More"
      @click="loadMore"
      :loading="isLoading"
    />

    <h1 v-if="items.length === 0 || isLoading">
      Loading...
    </h1>

    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.title }}
      </li>
    </ul>

    <q-card class="card">
      <q-card-section class="text-left q-pa-none q-mb-md">
        <div class="text-h6 text-weight-bold text-grey-9">My Content</div>
        <div class="text-subtitle2 text-grey-7 q-mt-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia nemo molestiae aspernatur fugiat dolores consequuntur natus non maxime illum aperiam fugit officia debitis numquam et architecto, veritatis nisi. Debitis, explicabo?</div>
      </q-card-section>
        <img src="https://picsum.photos/400/200"/>
    </q-card>
  </div>
</template>

<script setup>
import { fetchFirstPage, fetchNextPage } from './services/contentsApi'
import {ref, onMounted} from 'vue'

const items = ref([])
const tag = ref(null)
const isLoading = ref(false)
let batch = 8

const loadMore = async () => {
  isLoading.value = true

  try {
    const res = await fetchNextPage(batch, tag.value)

    items.value.push(...(res.items ?? []))
    tag.value = res.tag

  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  const res = await fetchFirstPage()
  items.value = res.items ?? []
  tag.value = res.tag
})

</script>
