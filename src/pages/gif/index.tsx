import Gif from '@features/gif'
import RelatedGifs from '@pages/related-gifs'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import TrendingGifs from 'features/trending-gifs'
import { useParams } from 'react-router-dom'

import s from './gif.module.scss'

const GifPage = () => {
  const { id } = useParams()

  const { error } = useAppSelector((state) => state.gif)

  return (
    <div className={s.container}>
      <Gif id={id!} />
      {error ? <TrendingGifs /> : <RelatedGifs id={id!} />}
    </div>
  )
}

export default GifPage
