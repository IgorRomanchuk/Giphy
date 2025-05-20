import { resetSearchGifs } from '@features/gifs-search/store/slice'
import { fetchGifsBySearchValue } from '@features/gifs-search/store/thunk'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ImageContainer from 'shared/ui/ImageContainer'

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
    <ImageContainer
      fetchData={fetchData}
      imagesArray={gifsBySearchValue}
      error={error}
    />
  )
}

export default GifsSearch
