import { createSlice } from '@reduxjs/toolkit'

import getArticlesRwApi from '../api/getArticlesRwApi'

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articlesData: [],
    loader: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArticlesRwApi.pending, (state) => {
        state.loader = true
        state.error = null
      })
      .addCase(getArticlesRwApi.fulfilled, (state, action) => {
        state.loader = false
        state.articlesData = action.payload
      })
      .addCase(getArticlesRwApi.rejected, (state, action) => {
        state.loader = false
        state.error = action.error
      })
  },
})

export default articlesSlice.reducer
