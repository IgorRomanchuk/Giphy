import { setValue } from '@features/gifs-search/store/slice'
import { fetchGifsBySearchValue } from '@features/gifs-search/store/thunk'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import useScreenSize from '@shared/hooks/useScreenSize'
import GifsContainer from '@shared/ui/GifsContainer'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const GifsSearch = () => {
  const dispatch = useAppDispatch()

  const screenSize = useScreenSize()

  const { searchValue } = useParams()

  const { gifsBySearchValue, offset, value, error } = useAppSelector(
    (state) => state.gifsBySearchValue,
  )

  const fetchData = () => {
    dispatch(fetchGifsBySearchValue({ offset, searchValue: value }))
  }

  useEffect(() => {
    const promise = dispatch(
      fetchGifsBySearchValue({ offset: 0, searchValue: searchValue }),
    )

    dispatch(setValue(searchValue))

    return () => {
      promise?.abort()
    }
  }, [])

  useEffect(() => {
    if (screenSize.height && document.body.scrollHeight < screenSize.height) {
      fetchData()
    }
  }, [gifsBySearchValue.length])

  return (
    <GifsContainer
      fetchData={fetchData}
      gifsArray={gifsBySearchValue}
      error={error}
      directory={'../gifs'}
    />
  )
}

export default GifsSearch
