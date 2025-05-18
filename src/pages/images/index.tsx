import TrendingStickers from '@features/trending-stickers'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import Tabs from '@widgets/Tabs'
import TrendingGifs from 'features/trending-gifs'

import s from './images.module.scss'

const media = [
  {
    key: 'images',
    label: 'GIFs',
    children: <TrendingGifs />,
  },
  {
    key: 'stickers',
    label: 'Stickers',
    children: <TrendingStickers />,
  },
]

const ImagesPage = () => {
  return (
    <Tabs
      items={media}
      title={
        <div className={s.container}>
          <TrendingUpIcon color="primary" />
          <p>Trending Now</p>
        </div>
      }
    />
  )
}

export default ImagesPage
