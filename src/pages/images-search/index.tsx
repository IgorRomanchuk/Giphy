import GifsSearch from '@features/gifs-search'
import StickersSearch from '@features/stickers-search'
import Tabs from '@widgets/Tabs'

const items = [
  {
    key: 'gifs',
    label: 'GIFs',
    children: <GifsSearch />,
  },
  {
    key: 'stickers',
    label: 'Stickers',
    children: <StickersSearch />,
  },
]

const ImagesSearchPage = () => {
  return <Tabs items={items} />
}

export default ImagesSearchPage
