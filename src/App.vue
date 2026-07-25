<template>
  <div class="page">
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

    <q-card class="card shadow-3">
      <q-card-section class="text-left q-pa-md">
        <div class="text-h6" style="font-weight: 900">My Content</div>
        <div class="text-subtitle2 q-mt-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia nemo molestiae aspernatur fugiat dolores consequuntur natus non maxime illum aperiam fugit officia debitis numquam et architecto, veritatis nisi. Debitis, explicabo?</div>
      </q-card-section>
      <q-separator inset/>
      <q-card-section class="q-pa-none">
        <q-img src="https://picsum.photos/350/200" ratio="2/3"
  fit="cover"/>
      </q-card-section>
    </q-card>
  </div>
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
