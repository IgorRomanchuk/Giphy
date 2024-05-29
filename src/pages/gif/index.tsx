import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import CardGif from '../../components/cardGif'
import { useAppSelector } from '../../hooks/useAppSelector'
import s from './gif.module.scss'

const Gif = () => {
  const navigate = useNavigate()

  const gif = useAppSelector((state) => state.gif.gif)

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

  useEffect(() => {
    if (!gif) {
      navigate('/404')
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
          <button
            className={s.download}
            onClick={() => {
              downloadGif(gif.images.original.url, gif.id)
            }}
          >
            Download
          </button>
        </div>
      )}
    </>
  )
}

export default Gif
