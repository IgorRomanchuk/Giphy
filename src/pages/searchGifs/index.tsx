import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import GifsContainer from '../../components/gifsContainer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { setValue } from '../../store/gifsBySearchValueSlice'
import { fetchGifsBySearchValue } from '../../store/gifsBySearchValueSlice'

const SeatchGifs = () => {
  const dispatch = useAppDispatch()
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

  return (
    <>
      <GifsContainer
        fetchData={fetchData}
        gifsArray={gifsBySearchValue}
        error={error}
      />
    </>
  )
}

export default SeatchGifs
