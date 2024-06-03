import { Navigate } from 'react-router-dom'

export default function CheckAuth({ children }) {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/sign-in" />
  }
  return children
}
