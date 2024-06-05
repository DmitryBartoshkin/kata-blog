import { createAsyncThunk } from '@reduxjs/toolkit'

const favoriteArticleRwApi = createAsyncThunk('article/favorite', async (slug) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, options)

  if (!res.ok) {
    throw new Error(`No fetch request! Status: ${res.status}`)
  }

  const data = await res.json()

  return data
})

export default favoriteArticleRwApi
