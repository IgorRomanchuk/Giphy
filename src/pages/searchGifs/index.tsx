import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import GifsContainer from '../../components/gifsContainer'
import { setValue } from '../../store/gifsBySearchValueSlice'
import { fetchGifsBySearchValue } from '../../store/gifsBySearchValueSlice'

const SeatchGifs = () => {
  const dispatch: any = useDispatch()
  const { searchValue } = useParams()
  const gifsBySearchValue = useSelector(
    (state: any) => state.gifsBySearchValue.gifsBySearchValue,
  )
  const offset = useSelector((state: any) => state.gifsBySearchValue.offset)
  const value = useSelector((state: any) => state.gifsBySearchValue.value)
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
      <GifsContainer fetchData={fetchData} gifsArray={gifsBySearchValue} />
    </>
  )
}

export default SeatchGifs
