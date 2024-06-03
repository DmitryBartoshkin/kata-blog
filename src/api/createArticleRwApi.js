import { createAsyncThunk } from '@reduxjs/toolkit'

const createArticleRwApi = createAsyncThunk('article/create', async ({ title, description, body, tagList }) => {
  const raw = JSON.stringify({
    article: {
      title,
      description,
      body,
      tagList,
    },
  })

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: raw,
  }
  const res = await fetch('https://blog.kata.academy/api/articles', options)
  const data = await res.json()

  return data
})

export default createArticleRwApi
