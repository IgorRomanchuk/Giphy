import {
  deleteFavoriteGif,
  setFavoriteGif,
} from '@features/favorites-gifs/store/slice'
import { fetchGif } from '@features/gif/store/thunk'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import CardGif from '@shared/ui/CardGif'
import EmptyState from '@shared/ui/EmptyState'
import Loading from '@shared/ui/Loading'
import { downloadGif } from '@shared/utils/download-gif'
import { FC, useEffect, useState } from 'react'

import s from './gif.module.scss'

interface Props {
  id: string
}

const Gif: FC<Props> = ({ id }) => {
  const [iconColor, setIconColor] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const { favorites } = useAppSelector((state) => state.favorites)

  const { gif, isLoading } = useAppSelector((state) => state.gif)

  const findFavoriteGif = () =>
    gif && favorites.find((item) => item.id === gif.id)

  const handleOnClick = () => {
    if (!gif) return

    if (findFavoriteGif()) {
      dispatch(deleteFavoriteGif(gif))
      setIconColor(false)
    } else {
      dispatch(setFavoriteGif(gif))
      setIconColor(true)
    }
  }

  useEffect(() => {
    dispatch(fetchGif(id))
  }, [id])

  useEffect(() => {
    setIconColor(false)
    if (gif && findFavoriteGif()) {
      setIconColor(true)
    }
  }, [gif])

  if (isLoading) {
    return (
      <div className={s.loadingContainer}>
        <Loading />
      </div>
    )
  }

  if (!gif) {
    return <EmptyState className={s.emptyState} />
  }

  return (
    <div className={s.wrap}>
      <div></div>
      <CardGif image={gif} large />
      <div className={s.buttonsContainer}>
        <button
          className={s.button}
          onClick={() => downloadGif(gif.images.original.url, gif.id)}
        >
          Download
        </button>
        <button className={s.button} onClick={handleOnClick}>
          <div className={s.title}>Favorite</div>
          <FavoriteIcon style={{ color: iconColor ? '#e46363' : '' }} />
        </button>
      </div>
    </div>
  )
}

export default Gif
