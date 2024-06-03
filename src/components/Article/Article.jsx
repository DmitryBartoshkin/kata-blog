import { format } from 'date-fns'
import Markdown from 'markdown-to-jsx'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Spin, Button, Popconfirm, Alert } from 'antd'

import getFullArticleRwApi from '../../api/getFullArticleRwApi'
import deleteArticleRwApi from '../../api/deleteArticleRwApi'
import Errors from '../Errors'
import favorite from '../../assets/img/favorite.svg'
import './Article.scss'

export default function Article() {
  const dispatch = useDispatch()
  const articleStore = (state) => state.article
  const articleData = useSelector(articleStore)
  const { article, errors } = articleData.articleData
  const { loader, error, deleted } = articleData
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getFullArticleRwApi(slug))
  }, [dispatch, slug])

  if (article) {
    const { title, description, createdAt, favoritesCount, tagList, author, body } = article
    const tags = tagList.map((el) =>
      el ? (
        <li className="article__tag" key={`${createdAt}-${Math.random()}`} hidden={el.trim() ? '' : 'hidden'}>
          {el}
        </li>
      ) : (
        ''
      )
    )
    const btnsDeleteEditGroup = (
      <div className="profile-btns-group">
        <Popconfirm
          placement="right"
          description="Are you sure to delete this article?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => dispatch(deleteArticleRwApi(slug))}
        >
          <Button className="profile-btn-delete" danger size="large">
            Delete
          </Button>
        </Popconfirm>
        <Link to={`/articles/${slug}/edit`}>
          <Button className="profile-btn-edit" size="large">
            Edit
          </Button>
        </Link>
      </div>
    )
    const alertSuccess = (
      <div className="article__content deleted">
        <Alert
          message="Success! The article was delete and you'll be redirect to Home Page soon..."
          type="success"
          showIcon
        />
      </div>
    )
    const content = (
      <>
        <div className="article__content">
          <div className="article__header">
            <h5 className="article__title">{title}</h5>
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
          <div className="profile-group">
            <div>
              <h6 className="profile-name">{author.username}</h6>
              <span className="profile-created-post">{format(new Date(createdAt), 'MMMM d, yyyy')}</span>
            </div>
            <img className="profile-avatar" src={author.image} alt="User avatar" height="46px" width="46px" />
          </div>
          {author.username === localStorage.getItem('name') ? btnsDeleteEditGroup : null}
        </div>
      </>
    )

    if (deleted) {
      setTimeout(() => navigate('/'), 3000)
    }

    return (
      <div className="article">
        {loader ? <Spin size="large" /> : null}
        {deleted ? alertSuccess : content}
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
