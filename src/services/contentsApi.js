import axios from 'axios'

const BASE_URL = 'https://pbapi.forwen.com/v5/moments'

export async function fetchFirstPage() {
  const res = await axios.get(BASE_URL, {
    params: { refresh: 1, type: 0, auth: 0, per_page: 8 }
  })
  return {
    items: res.data.items ?? res.data,
    tag: res.headers['tag']
  }
}

export async function fetchNextPage(batch, tag) {
  const res = await axios.get(BASE_URL, {
    params: { refresh: 1, type: 0, auth: 0, per_page: batch, Tag: tag }
  })
  return {
    items: res.data.items ?? res.data,
    tag: res.headers['tag']
  }
}