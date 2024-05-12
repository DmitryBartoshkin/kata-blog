import { createSlice } from '@reduxjs/toolkit'

import getFullArticleRwApi from '../api/getFullArticleRwApi'

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articleData: [],
    loader: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFullArticleRwApi.pending, (state) => {
        state.loader = true
        state.error = null
      })
      .addCase(getFullArticleRwApi.fulfilled, (state, action) => {
        state.loader = false
        state.articleData = action.payload
      })
      .addCase(getFullArticleRwApi.rejected, (state, action) => {
        state.loader = false
        state.error = action.error
      })
  },
})

// export const { } = articlesSlice.reducer

export default articleSlice.reducer
