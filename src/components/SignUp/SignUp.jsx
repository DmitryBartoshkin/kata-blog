import { Button, Checkbox, Form, Input, Divider, Alert } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import registerUser from '../../api/registerUserRwApi'
import { resetAlertError } from '../../stores/userSlice'
import './SignUp.scss'

export default function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userStore = (state) => state.user
  const userData = useSelector(userStore)
  const { user, errors } = userData.userData
  const token = localStorage.getItem('token')
  const errorsArr = errors ? Object.entries(errors) : null
  const onFinish = (values) => {
    const { username, email, password } = values
    dispatch(registerUser({ username, email, password }))
  }

  useEffect(() => {
    dispatch(resetAlertError())
    if (token || user) {
      navigate('/')
    }
  }, [navigate, token, user, dispatch])

  return (
    <div className="form">
      <h5>Create new account</h5>
      {errors ? <Alert message={`${errorsArr}`.replace(',', ' ')} type="error" showIcon /> : null}
      <Form name="basic" layout="vertical" requiredMark={false} autoComplete="off" onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
            () => ({
              validator(_, value) {
                if (value.length > 2 && value.length < 21) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Username must be 3-20 symbols!'))
              },
            }),
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
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            () => ({
              validator(_, value) {
                if (value.length > 5 && value.length < 61) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Password must be 6-60 symbols!'))
              },
            }),
          ]}
        >
          <Input.Password placeholder="Password" size="large" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Repeat Password"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The new password that you entered do not match!'))
              },
            }),
          ]}
        >
          <Input.Password placeholder="Password" size="large" />
        </Form.Item>

        <Divider />

        <Form.Item
          name="remember"
          className="form__checkbox"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
        >
          <Checkbox>I agree to the processing of my personal information</Checkbox>
        </Form.Item>

        <Form.Item className="form__btn">
          <Button type="primary" htmlType="submit" size="large" block>
            Create
          </Button>
        </Form.Item>
        <p className="form__additional-info">
          Already have an account? <Link to="/sign-in">Sign In</Link>.
        </p>
      </Form>
    </div>
  )
}
