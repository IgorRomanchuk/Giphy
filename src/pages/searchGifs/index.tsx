import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { setValue } from '@shared/store/gifsBySearchValueSlice'
import { fetchGifsBySearchValue } from '@shared/store/gifsBySearchValueSlice'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import GifsContainer from '../../shared/ui/GifsContainer'

const SearchGifs = () => {
  const dispatch = useAppDispatch()

  const { searchValue } = useParams()

  const { gifsBySearchValue, offset, value, error, pagination } =
    useAppSelector((state) => state.gifsBySearchValue)

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

  return (
    <>
      <GifsContainer
        fetchData={fetchData}
        gifsArray={gifsBySearchValue}
        error={error}
        directory={'../gifs'}
        opacity={true}
        pagination={pagination}
      />
    </>
  )
}

export default SearchGifs
