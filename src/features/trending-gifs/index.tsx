import { resetTrendingGifs } from '@features/trending-gifs/store/slice'
import { fetchTrendingGifs } from '@features/trending-gifs/store/thunk'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import useScreenSize from '@shared/hooks/useScreenSize'
import { FC, useEffect } from 'react'
import GifsContainer from 'shared/ui/GifsContainer'

interface Props {
  showImageError?: boolean
  directory?: string
}

const TrendingGifs: FC<Props> = ({ showImageError, directory = 'gifs' }) => {
  const dispatch = useAppDispatch()

  const screenSize = useScreenSize()

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

  useEffect(() => {
    if (screenSize.height && document.body.scrollHeight < screenSize.height) {
      fetchData()
    }
  }, [trendingGifs.length])

  return (
    <GifsContainer
      fetchData={fetchData}
      gifsArray={trendingGifs}
      error={error}
      directory={directory}
      showImageError={showImageError}
    />
  )
}

export default TrendingGifs
