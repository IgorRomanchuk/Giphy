import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import useScreenSize from '@shared/hooks/useScreenSize'
import {
  fetchRelatedGifs,
  resetRelatedGifs,
} from '@shared/store/relatedGifsSlice'
import GifsContainer from '@shared/ui/GifsContainer'
import { FC, useEffect } from 'react'

import s from './relatedGifs.module.scss'

interface Props {
  id: string
}

const RelatedGifs: FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch()

  const screenSize = useScreenSize()

  const { offset, relatedGifs, error } = useAppSelector(
    (state) => state.relatedGifs,
  )

  const fetchData = () => {
    dispatch(fetchRelatedGifs({ offset, id }))
  }

  useEffect(() => {
    dispatch(resetRelatedGifs())

    const promise = dispatch(fetchRelatedGifs({ offset: 0, id }))

    return () => {
      promise?.abort()
    }
  }, [id])

  useEffect(() => {
    if (screenSize.height && document.body.scrollHeight < screenSize.height) {
      fetchData()
    }
  }, [relatedGifs.length])

  return (
    <div>
      <p className={s.title}>Related GIFs</p>
      <GifsContainer
        fetchData={fetchData}
        gifsArray={relatedGifs}
        error={error}
        directory={'../gifs'}
        showImageError={false}
      />
    </div>
  )
}

export default RelatedGifs
