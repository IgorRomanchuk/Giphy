import {
  deleteFavoriteImage,
  setFavoriteImage,
} from '@features/favorites-images/store/slice'
import { fetchImage } from '@features/image/store/thunk'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import EmptyState from '@shared/ui/EmptyState'
import Loading from '@shared/ui/Loading'
import { downloadImage } from '@shared/utils/download-image'
import { FC, useEffect, useState } from 'react'
import ImageCard from 'shared/ui/ImageCard'

import s from './image.module.scss'

interface Props {
  id: string
}

const Image: FC<Props> = ({ id }) => {
  const [iconColor, setIconColor] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const { favorites } = useAppSelector((state) => state.favorites)

  const { image, isLoading } = useAppSelector((state) => state.image)

  const findFavoriteImage = () =>
    image && favorites.find((item) => item.id === image.id)

  const handleOnClick = () => {
    if (!image) return

    if (findFavoriteImage()) {
      dispatch(deleteFavoriteImage(image))
      setIconColor(false)
    } else {
      dispatch(setFavoriteImage(image))
      setIconColor(true)
    }
  }

  useEffect(() => {
    dispatch(fetchImage(id))
  }, [id])

  useEffect(() => {
    setIconColor(false)
    if (image && findFavoriteImage()) {
      setIconColor(true)
    }
  }, [image])

  if (isLoading) {
    return (
      <div className={s.loadingContainer}>
        <Loading />
      </div>
    )
  }

  if (!image) {
    return <EmptyState className={s.emptyState} />
  }

  return (
    <div className={s.wrap}>
      <div></div>
      <ImageCard image={image} large />
      <div className={s.buttonsContainer}>
        <button
          className={s.button}
          onClick={() => downloadImage(image.images.original.url, image.id)}
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

export default Image
