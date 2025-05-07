import cryingCowboyEmoji from '@assets/img/crying-cowbow-emoji.gif'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { GifsApi } from '@shared/api/gifs.api'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { GifSchema } from '@shared/models/gif.model'
import { deleteFavoriteGif, setFavoriteGif } from '@shared/store/favoritesSlice'
import CardGif from '@shared/ui/CardGif'
import Loading from '@shared/ui/Loading'
import { downloadGif } from '@shared/utils/download-gif'
import { FC, useEffect, useState } from 'react'

import s from './gif.module.scss'

interface Props {
  id: string
}

const Gif: FC<Props> = ({ id }) => {
  const [gif, setGif] = useState<GifSchema | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [color, setColor] = useState<boolean>(false)
  console.log(gif)
  console.log(loading)
  const dispatch = useAppDispatch()

  const { favorites } = useAppSelector((state) => state.favorites)

  const findFavoriteGif = () =>
    gif && favorites.find((item) => item.id === gif?.id)

  const handleOnClick = () => {
    if (!gif) return

    if (findFavoriteGif()) {
      dispatch(deleteFavoriteGif(gif))
      setColor(false)
    } else {
      dispatch(setFavoriteGif(gif))
      setColor(true)
    }
  }

  const getGif = async () => {
    setLoading(true)
    try {
      const data = await GifsApi.getGifById(id)
      setGif(data)
      if (favorites.find((item) => item.id === data?.id)) setColor(true)
    } catch (err) {
      console.log(err)
      setGif(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getGif()
  }, [id])

  if (loading) {
    return (
      <div className={s.loadingContainer}>
        <Loading />
      </div>
    )
  }

  if (!gif) {
    return (
      <div className={s.emptyState}>
        <img
          src={cryingCowboyEmoji}
          width={300}
          height={300}
          alt="crying-cowbow-emoji"
        />
        <p>Oops! There&apos;s nothing here.</p>
        <p>For GIFs that DO exist, here&apos;s our trending feed...</p>
      </div>
    )
  }

  return (
    <div className={s.wrap}>
      <div></div>
      <CardGif image={gif} />
      <div style={{ marginRight: 'auto' }}>
        <button
          className={s.button}
          onClick={() => downloadGif(gif.images.original.url, gif.id)}
        >
          Download
        </button>
        <button className={s.button} onClick={handleOnClick}>
          <div className={s.title}>Favorite</div>
          <FavoriteIcon style={{ color: color ? '#e46363' : '' }} />
        </button>
      </div>
    </div>
  )
}

export default Gif
