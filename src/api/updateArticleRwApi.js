import { createAsyncThunk } from '@reduxjs/toolkit'

const updateArticleRwApi = createAsyncThunk('article/update', async ({ slug, title, description, body, tagList }) => {
  const raw = JSON.stringify({
    article: {
      title,
      description,
      body,
      tagList,
    },
  })

  //   const articleUrl = slug
  //   console.log(articleUrl)

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: raw,
  }
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug.slug}`, options)

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error(`No fetch request! Status: ${res.status}. You can't edit not own you an article!`)
    } else {
      throw new Error(`No fetch request! Status: ${res.status}`)
    }
  }

  const data = await res.json()

  return data
})

export default updateArticleRwApi
