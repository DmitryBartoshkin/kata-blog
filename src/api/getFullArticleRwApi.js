import { createAsyncThunk } from '@reduxjs/toolkit'

const getFullArticleRwApi = createAsyncThunk('blog/getFullArticle', async (slug) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, options)
  const data = await res.json()

  return data
})

export default getFullArticleRwApi
