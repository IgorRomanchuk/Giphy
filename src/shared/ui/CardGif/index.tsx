import { GifSchema } from '@shared/models/gif.model'
import { cardColors } from '@shared/ui/CardGif/constants/cardColors'
import { getRandomInt } from '@shared/ui/CardGif/utils/get-random-int'
import { useState } from 'react'

interface IProps {
  image: GifSchema
  large?: boolean
}

const CardGif = ({ image, large }: IProps) => {
  const [loaded, setLoaded] = useState(false)

  const originalWidth = large
    ? parseInt(image.images['480w_still'].width)
    : parseInt(image.images.downsized.width)
  const originalHeight = large
    ? parseInt(image.images['480w_still'].height)
    : parseInt(image.images.downsized.height)

  const aspectRatio = (originalHeight / originalWidth) * 100

  return (
    <div
      style={{
        borderRadius: '10px',
        cursor: 'pointer',
        backgroundColor: `${cardColors[getRandomInt(4)]}`,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          paddingBottom: `${aspectRatio}%`,
          position: 'relative',
        }}
      >
        <img
          loading="lazy"
          alt="GIF"
          src={large ? image.images.original.url : image.images.downsized.url}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '10px',
            opacity: loaded ? 1 : 0,
          }}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  )
}

export default CardGif
