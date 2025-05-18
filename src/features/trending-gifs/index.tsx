import { resetTrendingGifs } from '@features/trending-gifs/store/slice'
import { fetchTrendingGifs } from '@features/trending-gifs/store/thunk'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { FC, useEffect } from 'react'
import ImageContainer from 'shared/ui/ImageContainer'

interface Props {
  showImageError?: boolean
}

const TrendingGifs: FC<Props> = ({ showImageError }) => {
  const dispatch = useAppDispatch()

  const { offset, trendingGifs, error } = useAppSelector(
    (state) => state.trendingGifs,
  )

  const fetchData = () => {
    dispatch(fetchTrendingGifs(offset))
  }

  useEffect(() => {
    dispatch(resetTrendingGifs())
    const promise = dispatch(fetchTrendingGifs(0))

    return () => {
      promise?.abort()
    }
  }, [])

  return (
    <ImageContainer
      fetchData={fetchData}
      gifsArray={trendingGifs}
      error={error}
      directory="../gifs"
      showImageError={showImageError}
    />
  )
}

export default TrendingGifs
