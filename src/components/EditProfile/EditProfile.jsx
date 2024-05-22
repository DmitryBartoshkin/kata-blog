import { Button, Form, Input, Alert } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import updateUser from '../../api/updateUserRwApi'
import { resetAlertError, resetAlertSuccess } from '../../stores/userSlice'
import './EditProfile.scss'

export default function EditProfile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userStore = (state) => state.user
  const userData = useSelector(userStore)
  const { errors } = userData.userData
  const { success } = userData
  const token = localStorage.getItem('token')
  const errorsArr = errors ? Object.entries(errors) : null
  const onFinish = (values) => {
    const { username, email, password, image } = values
    dispatch(updateUser({ username, email, password, image }))
  }

  useEffect(() => {
    dispatch(resetAlertError())
    if (!token) {
      navigate('/')
    }
    if (success) {
      setTimeout(() => dispatch(resetAlertSuccess()), 2000)
    }
  }, [navigate, token, dispatch, success])

  return (
    <div className="form-edit">
      <h5>Edit Profile</h5>
      {errors ? <Alert message={`${errorsArr}`.replace(',', ' ')} type="error" showIcon /> : null}
      {success ? <Alert message="Profile's data updated!" type="success" showIcon /> : null}
      <Form name="basic" layout="vertical" requiredMark={false} autoComplete="off" onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
            {
              type: 'string',
              min: 3,
              max: 20,
            },
          ]}
        >
          <Input placeholder="Username" size="large" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email address"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid Email!',
            },
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input placeholder="Email address" size="large" />
        </Form.Item>

        <Form.Item
          label="New password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              type: 'string',
              min: 6,
              max: 40,
            },
          ]}
        >
          <Input.Password placeholder="New password" size="large" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Avatar image (url)"
          rules={[
            {
              type: 'url',
              warningOnly: true,
            },
          ]}
        >
          <Input placeholder="Avatar image" />
        </Form.Item>

        <Form.Item className="form__btn">
          <Button type="primary" htmlType="submit" size="large" block>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
