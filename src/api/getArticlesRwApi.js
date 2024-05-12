import { createAsyncThunk } from '@reduxjs/toolkit'

const getArticlesRwApi = createAsyncThunk('blog/getArticles', async (limit = 5) => {
  const res = await fetch(`https://blog.kata.academy/api/articles?limit=${limit}`)
  const data = await res.json()

  return data
})

export default getArticlesRwApi
