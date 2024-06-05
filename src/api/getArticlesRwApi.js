import { createAsyncThunk } from '@reduxjs/toolkit'

const getArticlesRwApi = createAsyncThunk('blog/getArticles', async (limit = 5) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }
  const res = await fetch(`https://blog.kata.academy/api/articles?limit=${limit}`, options)
  const data = await res.json()

  return data
})

export default getArticlesRwApi
