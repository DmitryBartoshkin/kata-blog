import { createAsyncThunk } from '@reduxjs/toolkit'

const registerUser = createAsyncThunk('user/register', async ({ username, email, password }) => {
  const raw = JSON.stringify({
    user: {
      username,
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
  const res = await fetch('https://blog.kata.academy/api/users', options)
  const data = await res.json()

  return data
})

export default registerUser
