import { Routes, Route } from 'react-router-dom'

import './App.scss'
import Header from '../Header'
import ArticlesList from '../ArticlesList'
import Article from '../Article'
import ArticleCreate from '../ArticleCreate'
import ArticleEdit from '../ArticleEdit'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import EditProfile from '../EditProfile'
import CheckAuth from '../../hoc/CheckAuth'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/" element={<ArticlesList />} />
        <Route path="articles/:slug" element={<Article />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="profile" element={<EditProfile />} />
        <Route
          path="new-article"
          element={
            <CheckAuth>
              <ArticleCreate />
            </CheckAuth>
          }
        />
        <Route
          path="articles/:slug/edit"
          element={
            <CheckAuth>
              <ArticleEdit />
            </CheckAuth>
          }
        />
      </Route>
    </Routes>
  )
}
