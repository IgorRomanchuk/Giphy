import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { fetchTrendingGifs } from '@shared/store/gifsSlice'
import { useEffect } from 'react'
import GifsContainer from 'shared/ui/GifsContainer'

const Home = () => {
  const dispatch = useAppDispatch()

  const { offset, trendingGifs, error } = useAppSelector(
    (state) => state.trendingGifs,
  )

  const fetchData = () => {
    dispatch(fetchTrendingGifs(offset))
  }

  useEffect(() => {
    if (trendingGifs.length) return
    const promise = dispatch(fetchTrendingGifs(0))
    return () => {
      promise?.abort()
    }
  }, [])

  return (
    <>
      <GifsContainer
        fetchData={fetchData}
        gifsArray={trendingGifs}
        error={error}
        directory={'gifs'}
        opacity={true}
      />
    </>
  )
}

export default Home
