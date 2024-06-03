import { createSlice } from '@reduxjs/toolkit'

import registerUser from '../api/registerUserRwApi'
import loginUser from '../api/loginUserRwApi'
import updateUser from '../api/updateUserRwApi'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: [],
    loader: false,
    error: null,
    success: null,
  },
  reducers: {
    logout(state) {
      state.userData = []
    },
    resetAlertError(state) {
      state.userData = []
    },
    resetAlertSuccess(state) {
      state.success = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loader = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loader = false
        state.userData = action.payload
        if (state.userData.user) {
          const { username, token } = state.userData.user
          localStorage.setItem('token', token)
          localStorage.setItem('name', username)
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loader = false
        state.error = action.error
      })
      .addCase(loginUser.pending, (state) => {
        state.loader = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loader = false
        state.userData = action.payload
        if (state.userData.user) {
          const { username, token, image } = state.userData.user
          localStorage.setItem('token', token)
          localStorage.setItem('name', username)
          localStorage.setItem('avatar', image || '')
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loader = false
        state.error = action.error
      })
      .addCase(updateUser.pending, (state) => {
        state.loader = true
        state.error = null
        state.success = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loader = false
        state.userData = action.payload
        if (state.userData.user) {
          const { username, token, image } = state.userData.user
          localStorage.setItem('token', token)
          localStorage.setItem('name', username)
          localStorage.setItem('avatar', image)
          state.success = true
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loader = false
        state.error = action.error
        state.success = false
      })
  },
})

export const { logout, resetAlertError, resetAlertSuccess } = userSlice.actions

export default userSlice.reducer
