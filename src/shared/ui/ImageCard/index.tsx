import { ImageSchema } from '@shared/models/image.model'
import { cardColors } from '@shared/ui/ImageCard/constants/cardColors'
import { getRandomInt } from '@shared/ui/ImageCard/utils/get-random-int'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import s from './imageCard.module.scss'

interface IProps {
  image: ImageSchema
  large?: boolean
}

const ImageCard = ({ image, large }: IProps) => {
  const [loaded, setLoaded] = useState(false)

  const navigate = useNavigate()

  const navigateToImageById = (id: string) => {
    navigate(`../${image.type}s/${id}`)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const originalWidth = large
    ? parseInt(image.images['480w_still'].width)
    : parseInt(image.images.downsized.width)
  const originalHeight = large
    ? parseInt(image.images['480w_still'].height)
    : parseInt(image.images.downsized.height)

  const aspectRatio = (originalHeight / originalWidth) * 100

  return (
    <div className={s.wrap} onClick={() => navigateToImageById(image.id)}>
      <div
        className={`${s.boxImage} ${image.type === 'sticker' && s.sticker}`}
        style={{
          paddingBottom: `${aspectRatio}%`,
          backgroundColor:
            image.type === 'gif' ? `${cardColors[getRandomInt()]}` : '',
        }}
      >
        <img
          className={s.image}
          loading="lazy"
          alt="GIF"
          src={large ? image.images.original.url : image.images.downsized.url}
          style={{
            opacity: loaded ? 1 : 0,
          }}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  )
}

export default ImageCard
