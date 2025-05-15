import favoriteIcon from '@assets/img/80h.gif'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import s from './favoritesButton.module.scss'

const FavoritesButton = () => {
  const [imageHover, setImageHover] = useState<boolean>(false)

  const navigate = useNavigate()

  return (
    <button
      className={s.favoritesButton}
      onMouseOver={() => setImageHover(true)}
      onMouseLeave={() => setImageHover(false)}
      onClick={() => navigate('/favorites-gifs')}
    >
      <div className={s.imageWrapper}>
        <img
          src={favoriteIcon}
          alt="favorite-icon"
          height={39}
          width={39}
          className={`${imageHover ? s.imageScale : s.image}`}
        />
      </div>
      <h2 className={s.title}>Favorites</h2>
    </button>
  )
}

export default FavoritesButton
