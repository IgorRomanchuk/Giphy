import { resetTrendingStickers } from '@features/trending-stickers/store/slice'
import { fetchTrendingStickers } from '@features/trending-stickers/store/thunk'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { FC, useEffect } from 'react'
import GifsContainer from 'shared/ui/GifsContainer'

interface Props {
  showImageError?: boolean
  directory?: string
}

const TrendingStickers: FC<Props> = ({
  showImageError,
  directory = 'stickers',
}) => {
  const dispatch = useAppDispatch()

  const { offset, trendingStickers, error } = useAppSelector(
    (state) => state.trendingStickers,
  )

  const fetchData = () => {
    dispatch(fetchTrendingStickers(offset))
  }

  useEffect(() => {
    dispatch(resetTrendingStickers())
    const promise = dispatch(fetchTrendingStickers(0))

    return () => {
      promise?.abort()
    }
  }, [])

  return (
    <GifsContainer
      fetchData={fetchData}
      gifsArray={trendingStickers}
      error={error}
      directory={directory}
      showImageError={showImageError}
      typeCard="sticker"
    />
  )
}

export default TrendingStickers
