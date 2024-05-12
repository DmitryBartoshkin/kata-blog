import { Routes, Route } from 'react-router-dom'

import './App.scss'
import Header from '../Header'
import ArticlesList from '../ArticlesList'
import Article from '../Article'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/" element={<ArticlesList />} />
        <Route path="articles/:slug" element={<Article />} />
      </Route>
    </Routes>
  )
}
