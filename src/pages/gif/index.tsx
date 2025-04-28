import FavoriteIcon from '@mui/icons-material/Favorite'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CardGif from '../../components/cardGif'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { deleteFavoriteGif, setFavoriteGif } from '../../store/favoritesSlice'
import s from './gif.module.scss'

const Gif = () => {
  const [color, setColor] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const gif = useAppSelector((state) => state.gif.gif)

  const { favorites } = useAppSelector((state) => state.favorites)

  const downloadGif = async (gifSrc: string, gifName: string) => {
    const gifBlob = await fetch(gifSrc)
      .then((res) => res.arrayBuffer())
      .then((buffer) => new Blob([buffer], { type: 'image/gif' }))

    const link = document.createElement('a')
    link.href = URL.createObjectURL(gifBlob)
    link.download = gifName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const findFavoriteGif = () => {
    return favorites.find((item) => item.id === gif?.id)
  }

  const handleOnClick = () => {
    if (findFavoriteGif()) {
      dispatch(deleteFavoriteGif(gif))
      setColor(false)
    } else {
      dispatch(setFavoriteGif(gif))
      setColor(true)
    }
  }

  useEffect(() => {
    if (findFavoriteGif()) setColor(true)
    if (!gif) {
      navigate('/not-found')
    }
  }, [])

  return (
    <>
      {gif && (
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
              onClick={() => {
                downloadGif(gif.images.original.url, gif.id)
              }}
            >
              Download
            </button>
            <button className={s.button} onClick={handleOnClick}>
              <div style={{ marginRight: '5px' }}>Favorite</div>
              <FavoriteIcon
                // className={color ? s.ITY : s.gVRblV}
                style={{ color: `${color ? '#e46363' : ''}` }}
              />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Gif
