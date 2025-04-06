import { useState } from 'react'

import { colors } from '../../constants'
import { Gif } from '../../types/Gif'

interface IProps {
  image: Gif
  index?: number
}

const CardGif = ({ image, index }: IProps) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <img
      loading="lazy"
      alt="GIF"
      src={image.images.original.url}
      width={image.images.original.width}
      height={image.images.original.height}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        borderRadius: '10px',
        backgroundColor: `${index && colors[index]}`,
        opacity: loaded ? 1 : 0,
      }}
      onLoad={() => setLoaded(true)}
    />
  )
}

export default CardGif
