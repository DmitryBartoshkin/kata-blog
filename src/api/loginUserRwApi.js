import { createAsyncThunk } from '@reduxjs/toolkit'

const loginUser = createAsyncThunk('user/login', async ({ email, password }) => {
  const raw = JSON.stringify({
    user: {
      email,
      password,
    },
  })
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: raw,
  }
  const res = await fetch('https://blog.kata.academy/api/users/login', options)
  const data = await res.json()

  return data
})

export default loginUser
