import { createAsyncThunk } from '@reduxjs/toolkit'

const deleteArticleRwApi = createAsyncThunk('article/delete', async (slug) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, options)

  if (!res.ok) {
    throw new Error(`No fetch request! Status: ${res.status}`)
  }

  if (res.ok) {
    throw new Error('ok')
  }

  const data = await res.json()

  return data
})

export default deleteArticleRwApi
