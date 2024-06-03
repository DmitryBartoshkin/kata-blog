import { Button, Alert } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import createArticleRwApi from '../../api/createArticleRwApi'
import { resetArticleData, resetArticleError } from '../../stores/articleSlice'
import FormForArticle from '../FormForArticle'
import './ArticleCreate.scss'

export default function ArticleCreate() {
  const articleStore = (state) => state.article
  const articleData = useSelector(articleStore)
  const { error } = articleData
  const { article } = articleData.articleData
  const dispatch = useDispatch()
  const onFinish = (values) => {
    const { title, description, body, tagList } = values
    dispatch(createArticleRwApi({ title, description, body, tagList }))
  }
  const alertSuccess = (
    <>
      <Alert message="Hooray! Article created" type="success" showIcon />
      <Link to="/">
        <Button className="profile-btn-edit" size="large" default>
          Back to Home
        </Button>
      </Link>
    </>
  )

  useEffect(() => {
    dispatch(resetArticleData())
    dispatch(resetArticleError())
  }, [dispatch])

  return (
    <div className="article-create">
      <h5>Create new article</h5>
      {error ? <Alert message={`${error.name}: ${error.message}`} type="error" showIcon /> : null}
      {article ? alertSuccess : <FormForArticle onFinish={onFinish} />}
    </div>
  )
}
