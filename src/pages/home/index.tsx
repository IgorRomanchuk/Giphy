import GifsContainer from '../../components/gifsContainer'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchTrendingGifs } from '../../store/gifsSlice'

const Home = () => {
  const dispatch = useAppDispatch()

  const { offset, trendingGifs } = useAppSelector((state) => state.trendingGifs)

  const fetchData = () => {
    dispatch(fetchTrendingGifs(offset))
  }

  return (
    <>
      <GifsContainer fetchData={fetchData} gifsArray={trendingGifs} />
    </>
  )
}

export default Home
