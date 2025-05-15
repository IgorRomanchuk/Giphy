import favoriteIcon from '@assets/img/80h.gif'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import s from './favoritesButton.module.scss'

interface Props {
  setValue: (e: string) => void
}

const FavoritesButton: FC<Props> = ({ setValue }) => {
  const [imageHover, setImageHover] = useState<boolean>(false)

  const navigate = useNavigate()

  const navigateToFavoritesPage = () => {
    setValue('')
    navigate('/favorites-gifs')
  }

  return (
    <button
      className={s.favoritesButton}
      onMouseOver={() => setImageHover(true)}
      onMouseLeave={() => setImageHover(false)}
      onClick={navigateToFavoritesPage}
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
