import { Pagination, Spin } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import getArticlesRwApi from '../../api/getArticlesRwApi'
import Errors from '../Errors'
import './ArticlesList.scss'
import ArticlePreview from '../ArticlePreview'

export default function ArticlesList() {
  const articlesStore = (state) => state.articles
  const articlesData = useSelector(articlesStore)
  const { articles, articlesCount, errors } = articlesData.articlesData
  const { loader, error } = articlesData
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getArticlesRwApi(5))
  }, [dispatch])

  if (articles && !loader) {
    const articlesList = articles
      .slice(-5)
      .map((el) => (
        <ArticlePreview
          key={el.createdAt}
          title={el.title}
          slug={el.slug}
          tagList={el.tagList}
          description={el.description}
          author={el.author}
          createdAt={el.createdAt}
          favorited={el.favorited}
          favoritesCount={el.favoritesCount}
        />
      ))

    return (
      <>
        <ul>{articlesList}</ul>
        <Pagination
          size="small"
          total={articlesCount}
          showSizeChanger={false}
          defaultPageSize={5}
          onChange={(e) => dispatch(getArticlesRwApi(e * 5))}
        />
      </>
    )
  }
  return (
    <>
      <ul>
        {loader ? <Spin size="large" /> : null}
        <Errors errors={errors} error={error} />
      </ul>
      {articles ? (
        <Pagination
          size="small"
          total={articlesCount}
          showSizeChanger={false}
          onChange={(e) => dispatch(getArticlesRwApi(e * 5))}
        />
      ) : null}
    </>
  )
}
