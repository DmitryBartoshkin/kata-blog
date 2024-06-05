import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

import unfavorite from '../../assets/img/unfavorite.svg'
import favorite from '../../assets/img/favorite.svg'
import './ArticlePreview.scss'
import favoriteArticleRwApi from '../../api/favoriteArticleRwApi'
import unfavoriteArticleRwApi from '../../api/unfavoriteArticleRwApi'

export default function ArticlePreview(props) {
  const dispatch = useDispatch()
  const { title, description, author, favoritesCount, tagList, createdAt, slug, favorited } = props
  const [isLike, setIsLike] = useState(favorited)
  const [likesCount, setLikesCount] = useState(favoritesCount)
  const isAuth = localStorage.getItem('token') || false
  const like = () => {
    if (isAuth) {
      dispatch(favoriteArticleRwApi(slug))
      setIsLike(true)
      setLikesCount(likesCount + 1)
    }
  }
  const unlike = () => {
    if (isAuth) {
      dispatch(unfavoriteArticleRwApi(slug))
      setIsLike(false)
      setLikesCount(likesCount - 1)
    }
  }
  const tags = tagList.map((el) =>
    el ? (
      <li className="article-preview__tag" key={`${createdAt}-${Math.random()}`} hidden={el.trim() ? '' : 'hidden'}>
        {el}
      </li>
    ) : (
      []
    )
  )

  return (
    <li className="article-preview">
      <div className="article-preview__content">
        <div className="article-preview__header">
          <h5 className="article-preview__title">
            <Link to={`articles/${slug}`}>{title}</Link>
          </h5>
          <span className="article-preview__favorite">
            <img
              src={isLike ? favorite : unfavorite}
              alt="Favorite icon"
              onClick={isLike ? unlike : like}
              aria-hidden="true"
            />
            {likesCount}
          </span>
        </div>
        <ul className="article-preview__tags">{tags}</ul>
        <p className="article-preview__text">
          {description.length > 250 ? `${description.slice(0, 250)}...` : description}
        </p>
      </div>
      <div className="article-preview__profile">
        <div>
          <h6 className="profile-name">{author.username}</h6>
          <span className="profile-created-post">{format(new Date(createdAt), 'MMMM d, yyyy')}</span>
        </div>
        <img className="profile-avatar" src={author.image} alt="User avatar" height="46px" width="46px" />
      </div>
    </li>
  )
}
