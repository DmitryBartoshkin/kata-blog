import './ArticleEdit.scss'

import { Alert } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Navigate } from 'react-router-dom'
import { useEffect } from 'react'

import updateArticleRwApi from '../../api/updateArticleRwApi'
import { resetArticleSuccess } from '../../stores/articleSlice'
import FormForArticle from '../FormForArticle'

export default function ArticleEdit() {
  const articleStore = (state) => state.article
  const articleData = useSelector(articleStore)
  const { error, success } = articleData
  const { article } = articleData.articleData
  const dispatch = useDispatch()
  const slug = useParams()
  const onFinish = (values) => {
    const { title, description, body, tagList } = values
    dispatch(updateArticleRwApi({ slug, title, description, body, tagList }))
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => dispatch(resetArticleSuccess()), 2000)
    }
  }, [dispatch, success])

  return (
    <div className="article-edit">
      <h5>Edit article</h5>
      {error ? <Alert message={`${error.name}: ${error.message}`} type="error" showIcon /> : null}
      {success ? <Alert message="Success! Article edited" type="success" showIcon /> : null}
      {article ? <FormForArticle onFinish={onFinish} article={article} /> : <Navigate to="/" />}
    </div>
  )
}
