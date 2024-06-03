import { createSlice } from '@reduxjs/toolkit'

import getFullArticleRwApi from '../api/getFullArticleRwApi'
import createArticleRwApi from '../api/createArticleRwApi'
import updateArticleRwApi from '../api/updateArticleRwApi'
import deleteArticleRwApi from '../api/deleteArticleRwApi'

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articleData: [],
    loader: false,
    error: null,
    success: null,
    deleted: null,
  },
  reducers: {
    resetArticleData(state) {
      state.articleData = []
    },
    resetArticleSuccess(state) {
      state.success = null
    },
    resetArticleError(state) {
      state.error = null
    },
    resetArticleDeleted(state) {
      state.deleted = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFullArticleRwApi.pending, (state) => {
        state.loader = true
        state.error = null
      })
      .addCase(getFullArticleRwApi.fulfilled, (state, action) => {
        state.loader = false
        state.deleted = null
        state.articleData = action.payload
      })
      .addCase(getFullArticleRwApi.rejected, (state, action) => {
        state.loader = false
        state.error = action.error
      })
      .addCase(createArticleRwApi.pending, (state) => {
        state.loader = true
        state.error = null
      })
      .addCase(createArticleRwApi.fulfilled, (state, action) => {
        state.loader = false
        state.deleted = null
        state.articleData = action.payload
      })
      .addCase(createArticleRwApi.rejected, (state, action) => {
        state.loader = false
        state.error = action.error
      })
      .addCase(updateArticleRwApi.pending, (state) => {
        state.loader = true
        state.success = null
        state.error = null
      })
      .addCase(updateArticleRwApi.fulfilled, (state, action) => {
        state.loader = false
        state.success = true
        state.articleData = action.payload
      })
      .addCase(updateArticleRwApi.rejected, (state, action) => {
        state.loader = false
        state.error = action.error
      })
      .addCase(deleteArticleRwApi.pending, (state) => {
        state.loader = true
        state.deleted = null
        state.error = null
      })
      .addCase(deleteArticleRwApi.fulfilled, (state, action) => {
        state.loader = false
        state.articleData = action.payload
      })
      .addCase(deleteArticleRwApi.rejected, (state, action) => {
        const { message } = action.error
        state.loader = false
        state.error = action.error
        if (message === 'ok') {
          state.deleted = true
        }
      })
  },
})

export const { resetArticleData, resetArticleSuccess, resetArticleError, resetArticleDeleted } = articleSlice.actions

export default articleSlice.reducer
