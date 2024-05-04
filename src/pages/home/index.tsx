import { useDispatch, useSelector } from 'react-redux'

import GifsContainer from '../../components/gifsContainer'
import { fetchTrendingGifs } from '../../store/gifsSlice'

const Home = () => {
  const dispatch: any = useDispatch()
  const trendingGifs = useSelector(
    (state: any) => state.trendingGifs.trendingGifs,
  )
  const offset = useSelector((state: any) => state.trendingGifs.offset)
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
