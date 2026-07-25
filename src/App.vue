<template>
  <div class="page">
    <h1 class="text-center">Hello PetBacker Vue Task2</h1>
    <q-infinite-scroll class="column items-center" @load="onLoad" :offset="250">
      <div v-for="(item, index) in items" :key="item.id">
        <q-card class="card q-my-md">
          <q-card-section class="text-left q-pa-none q-mb-md">
            <div class="text-h6 text-weight-bold text-grey-9">{{item.title}}</div>
            <div class="text-subtitle2 text-grey-7 text-wrap q-mt-sm" style="min-width: 0; overflow-wrap: break-word;">{{item.description}}</div>
          </q-card-section>
            <template v-for="content in item.medias">
                <img
                  v-if="content.content_type === 'image'"
                  class="q-my-md"
                  :src="content.media_filename"
                  alt="media"
                />

                <video
                  v-else-if="content.content_type === 'video'"
                  class="q-my-md"
                  controls
                  muted
                  autoplay
                  playsinline
                  loop
                >
                <source :src="content.media_filename" type="video/mp4">
                </video>
            </template>
          </q-card>
          <q-intersection
            v-if="index === midpointItemOfLastBatch"
            @visibility="(visible) => visible && startPreload()"
          />
        </div>

      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script setup>
import { fetchFirstPage, fetchNextPage } from './services/contentsApi'
import {ref, computed, nextTick, onMounted} from 'vue'

const items = ref([])
const tag = ref(null)
const preloadMarker = ref(null)
let batch = 8
let preloadPromise = null

const midpointItemOfLastBatch = computed(() => {
  const lastBatch = items.value.length - batch
  return lastBatch + Math.floor(batch / 2)
})

const startPreload = () => {
  if (preloadPromise) return preloadPromise

  preloadPromise = fetchNextPage(batch,tag.value).then(res => res)

  return preloadPromise
}

const onLoad = async (index, done) => {
  try {
    const res = preloadPromise
      ? await preloadPromise
      : await fetchNextPage(batch, tag.value)

    preloadPromise = null

    items.value.push(...res.items)
    tag.value = res.tag

  } finally {
    done()
  }
}

onMounted(async () => {
  const res = await fetchFirstPage()
  items.value = res.items ?? []
  tag.value = res.tag
})

</script>
