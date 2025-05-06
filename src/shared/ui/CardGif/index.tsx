import { GifSchema } from '@shared/models/gif.model'
import { cardColors } from '@shared/ui/CardGif/constants/cardColors'
import { getRandomInt } from '@shared/ui/CardGif/utils/get-random-int'
import { useState } from 'react'

interface IProps {
  image: GifSchema
}

const CardGif = ({ image }: IProps) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      style={{
        borderRadius: '10px',
        cursor: 'pointer',
        backgroundColor: `${cardColors[getRandomInt(4)]}`,
      }}
    >
      <img
        loading="lazy"
        alt="GIF"
        src={image.images.original.url}
        height={image.images.downsized_small.height}
        style={{
          width: '100%',
          display: 'block',
          borderRadius: '10px',
          opacity: loaded ? 1 : 0,
        }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

export default CardGif
