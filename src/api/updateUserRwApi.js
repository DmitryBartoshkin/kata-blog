import { createAsyncThunk } from '@reduxjs/toolkit'

const updateUser = createAsyncThunk('user/update', async ({ username, email, password, image }) => {
  const raw = JSON.stringify({
    user: {
      username,
      email,
      password,
      image,
    },
  })

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: raw,
  }
  const res = await fetch('https://blog.kata.academy/api/user', options)
  const data = await res.json()

  return data
})

export default updateUser
