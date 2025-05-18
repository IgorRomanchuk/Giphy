import { GifSchema } from '@shared/models/gif.model'
import { cardColors } from '@shared/ui/ImageCard/constants/cardColors'
import { getRandomInt } from '@shared/ui/ImageCard/utils/get-random-int'
import { useState } from 'react'

import s from './imageCard.module.scss'

interface IProps {
  image: GifSchema
  large?: boolean
  typeCard?: 'gif' | 'sticker'
}

const ImageCard = ({ image, large, typeCard = 'gif' }: IProps) => {
  const [loaded, setLoaded] = useState(false)

  const originalWidth = large
    ? parseInt(image.images['480w_still'].width)
    : parseInt(image.images.downsized.width)
  const originalHeight = large
    ? parseInt(image.images['480w_still'].height)
    : parseInt(image.images.downsized.height)

  const aspectRatio = (originalHeight / originalWidth) * 100

  return (
    <div className={s.wrap}>
      <div
        className={`${s.boxImage} ${typeCard === 'sticker' && s.sticker}`}
        style={{
          paddingBottom: `${aspectRatio}%`,
          backgroundColor:
            typeCard === 'gif' ? `${cardColors[getRandomInt()]}` : '',
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
