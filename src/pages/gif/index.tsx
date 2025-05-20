import TrendingStickers from '@features/trending-stickers'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import Tabs from '@widgets/Tabs'
import Image from 'features/image'
import RelatedImages from 'features/related-images'
import TrendingGifs from 'features/trending-gifs'
import { useParams } from 'react-router-dom'

import s from './gif.module.scss'

const items = [
  {
    key: 'gifs',
    label: 'GIFs',
    children: <TrendingGifs showImageError={false} />,
  },
  {
    key: 'stickers',
    label: 'Stickers',
    children: <TrendingStickers showImageError={false} />,
  },
]

const GifPage = () => {
  const { id } = useParams()

  const { image } = useAppSelector((state) => state.image)

  return (
    <div className={s.container}>
      <Image id={id!} />
      {image ? (
        <RelatedImages id={id!} />
      ) : (
        <Tabs
          items={items}
          title={
            <div className={s.tabsHeaderContainer}>
              <TrendingUpIcon color="primary" />
              <p>Trending Now</p>
            </div>
          }
        />
      )}
    </div>
  )
}

export default GifPage
