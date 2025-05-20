import { resetTrendingStickers } from '@features/trending-stickers/store/slice'
import { fetchTrendingStickers } from '@features/trending-stickers/store/thunk'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { FC, useEffect } from 'react'
import ImageContainer from 'shared/ui/ImageContainer'

interface Props {
  showImageError?: boolean
}

const TrendingStickers: FC<Props> = ({ showImageError }) => {
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
    <ImageContainer
      fetchData={fetchData}
      imagesArray={trendingStickers}
      error={error}
      showImageError={showImageError}
    />
  )
}

export default TrendingStickers
