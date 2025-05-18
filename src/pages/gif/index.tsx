import Gif from '@features/gif'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import RelatedGifs from 'features/related-gifs'
import TrendingGifs from 'features/trending-gifs'
import { useParams } from 'react-router-dom'

import s from './gif.module.scss'

const GifPage = () => {
  const { id } = useParams()

  const { gif } = useAppSelector((state) => state.gif)

  return (
    <div className={s.container}>
      <Gif id={id!} />
      {gif ? (
        <RelatedGifs id={id!} />
      ) : (
        <TrendingGifs directory={'../images'} showImageError={false} />
      )}
    </div>
  )
}

export default GifPage
