import { Routes, Route } from 'react-router-dom'

import './App.scss'
import Header from '../Header'
import ArticlesList from '../ArticlesList'
import Article from '../Article'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import EditProfile from '../EditProfile'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/" element={<ArticlesList />} />
        <Route path="articles/:slug" element={<Article />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="profile" element={<EditProfile />} />
      </Route>
    </Routes>
  )
}
