import { Button, Form, Input, Alert } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import loginUserRwApi from '../../api/loginUserRwApi'
import { resetAlertError } from '../../stores/userSlice'
import './SignIn.scss'

export default function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userStore = (state) => state.user
  const userData = useSelector(userStore)
  const { user, errors } = userData.userData
  const token = localStorage.getItem('token')
  const errorsArr = errors ? Object.entries(errors) : null
  const onFinish = (values) => {
    const { email, password } = values
    dispatch(loginUserRwApi({ email, password }))
  }

  useEffect(() => {
    dispatch(resetAlertError())
    if (token || user) {
      navigate('/')
    }
  }, [navigate, token, user, dispatch])

  return (
    <div className="form">
      <h5>Sign In</h5>
      {errors ? <Alert message={`${errorsArr}`.replace(',', ' ')} type="error" showIcon /> : null}
      <Form name="basic" layout="vertical" requiredMark={false} autoComplete="off" onFinish={onFinish}>
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
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password placeholder="Password" size="large" />
        </Form.Item>

        <Form.Item className="form__btn-login">
          <Button type="primary" htmlType="submit" size="large" block>
            Login
          </Button>
        </Form.Item>
        <p className="form__additional-info">
          Don&apos;t have an account? <Link to="/sign-up">Sign Up</Link>.
        </p>
      </Form>
    </div>
  )
}
