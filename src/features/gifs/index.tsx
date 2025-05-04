import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import useScreenSize from '@shared/hooks/useScreenSize'
import { fetchTrendingGifs } from '@shared/store/gifsSlice'
import { useEffect } from 'react'
import GifsContainer from 'shared/ui/GifsContainer'

const Gifs = () => {
  const dispatch = useAppDispatch()

  const screenSize = useScreenSize()

  const { offset, trendingGifs, error } = useAppSelector(
    (state) => state.trendingGifs,
  )

  const fetchData = () => {
    dispatch(fetchTrendingGifs(offset))
  }

  useEffect(() => {
    if (trendingGifs.length) return

    const promise = dispatch(fetchTrendingGifs(offset))

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
      directory={'gifs'}
      opacity
    />
  )
}

export default Gifs
