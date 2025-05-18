import { resetSearchGifs } from '@features/gifs-search/store/slice'
import { fetchGifsBySearchValue } from '@features/gifs-search/store/thunk'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import GifsContainer from '@shared/ui/GifsContainer'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const GifsSearch = () => {
  const dispatch = useAppDispatch()

  const { searchValue } = useParams()

  const { gifsBySearchValue, offset, error } = useAppSelector(
    (state) => state.gifsBySearchValue,
  )

  const fetchData = () => {
    dispatch(fetchGifsBySearchValue({ offset, searchValue }))
  }

  useEffect(() => {
    dispatch(resetSearchGifs())

    const promise = dispatch(fetchGifsBySearchValue({ offset: 0, searchValue }))

    return () => {
      promise?.abort()
    }
  }, [searchValue])

  return (
    <GifsContainer
      fetchData={fetchData}
      gifsArray={gifsBySearchValue}
      error={error}
      directory={'../images'}
    />
  )
}

export default GifsSearch
