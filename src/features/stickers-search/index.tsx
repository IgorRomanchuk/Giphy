import { resetSearchStickers } from '@features/stickers-search/store/slice'
import { fetchStickersBySearchValue } from '@features/stickers-search/store/thunk'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ImageContainer from 'shared/ui/ImageContainer'

const StickersSearch = () => {
  const dispatch = useAppDispatch()

  const { searchValue } = useParams()

  const { stickersBySearchValue, offset, error } = useAppSelector(
    (state) => state.stickersBySearchValue,
  )

  const fetchData = () => {
    dispatch(fetchStickersBySearchValue({ offset, searchValue }))
  }

  useEffect(() => {
    dispatch(resetSearchStickers())

    const promise = dispatch(
      fetchStickersBySearchValue({ offset: 0, searchValue }),
    )

    return () => {
      promise?.abort()
    }
  }, [searchValue])

  return (
    <ImageContainer
      fetchData={fetchData}
      imagesArray={stickersBySearchValue}
      error={error}
    />
  )
}

export default StickersSearch
