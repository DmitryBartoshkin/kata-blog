import { format } from 'date-fns'
import Markdown from 'markdown-to-jsx'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'

import getFullArticleRwApi from '../../api/getFullArticleRwApi'
import Errors from '../Errors'
import favorite from '../../assets/img/favorite.svg'
import './Article.scss'

export default function Article() {
  const dispatch = useDispatch()
  const articleStore = (state) => state.article
  const articleData = useSelector(articleStore)
  const { article, errors } = articleData.articleData
  const { loader, error } = articleData
  const { slug } = useParams()

  useEffect(() => {
    dispatch(getFullArticleRwApi(slug))
  }, [dispatch, slug])

  if (article) {
    const { title, description, createdAt, favoritesCount, tagList, author, body } = article
    const tags = tagList.map((el) => (
      <li className="article__tag" key={`${createdAt}-${Math.random()}`} hidden={el.trim() ? '' : 'hidden'}>
        {el}
      </li>
    ))

    return (
      <div className="article">
        <div className="article__content">
          <div className="article__header">
            <h5 className="article__title">{title.length > 45 ? `${title.slice(0, 45)}...` : title}</h5>
            <span className="article__favorite">
              <img src={favorite} alt="Favorite icon" />
              {favoritesCount}
            </span>
          </div>
          <ul className="article__tags">{tags}</ul>
          <p className="article__description">{description}</p>
          <div className="article__text">
            <Markdown>{body}</Markdown>
          </div>
        </div>
        <div className="article__profile">
          <div>
            <h6 className="profile-name">{author.username}</h6>
            <span className="profile-created-post">{format(new Date(createdAt), 'MMMM d, yyyy')}</span>
          </div>
          <img className="profile-avatar" src={author.image} alt="User avatar" height="46px" width="46px" />
        </div>
      </div>
    )
  }
  return (
    <ul>
      {loader ? <Spin size="large" /> : null}
      <Errors errors={errors} error={error} />
    </ul>
  )
}
