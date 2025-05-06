import cryingCowboyEmoji from '@assets/img/crying-cowbow-emoji.gif'
import Gifs from '@features/gifs'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { GifsApi } from '@shared/api/gifs.api'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { GifSchema } from '@shared/models/gif.model'
import { deleteFavoriteGif, setFavoriteGif } from '@shared/store/favoritesSlice'
import CardGif from '@shared/ui/CardGif'
import Loading from '@shared/ui/Loading'
import { downloadGif } from '@shared/utils/download-gif'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import s from './gif.module.scss'

const Gif = () => {
  const [gif, setGif] = useState<GifSchema>({} as GifSchema)
  const [loading, setLoading] = useState<boolean>(false)
  const [color, setColor] = useState<boolean>(false)

  const { id } = useParams()

  const dispatch = useAppDispatch()

  const { favorites } = useAppSelector((state) => state.favorites)

  const findFavoriteGif = () =>
    Object.keys(gif).length && favorites.find((item) => item.id === gif?.id)

  const handleOnClick = () => {
    if (findFavoriteGif()) {
      dispatch(deleteFavoriteGif(gif))
      setColor(false)
    } else {
      dispatch(setFavoriteGif(gif))
      setColor(true)
    }
  }

  const getGif = async () => {
    if (!id) return
    try {
      setLoading(true)
      const data = await GifsApi.getGifById(id)
      setGif(data)
      if (favorites.find((item) => item.id === data?.id)) setColor(true)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getGif()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      {Object.keys(gif).length ? (
        <div
          className={s.wrap}
          style={{
            maxWidth: `${gif.images.original.width}px`,
            maxHeight: `${gif.images.original.height}px`,
          }}
        >
          <CardGif image={gif} />
          <div>
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
      ) : (
        <div className={s.emptyState}>
          <img
            src={cryingCowboyEmoji}
            width={300}
            height={300}
            alt="crying-cowbow-emoji"
          />
          <div>Oops! There&apos;s nothing here.</div>
        </div>
      )}
    </>
  )
}

export default Gif
