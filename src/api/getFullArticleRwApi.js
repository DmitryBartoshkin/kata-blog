import { createAsyncThunk } from '@reduxjs/toolkit'

const getFullArticleRwApi = createAsyncThunk('blog/getFullArticle', async (slug) => {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
  const data = await res.json()

  return data
})

export default getFullArticleRwApi
