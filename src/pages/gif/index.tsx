import Gif from '@features/gif'
import RelatedGifs from '@pages/related-gifs'
import { useParams } from 'react-router-dom'

import s from './gif.module.scss'

const GifPage = () => {
  const { id } = useParams()

  return (
    <div className={s.container}>
      <Gif id={id!} />
      <RelatedGifs id={id!} />
    </div>
  )
}

export default GifPage
