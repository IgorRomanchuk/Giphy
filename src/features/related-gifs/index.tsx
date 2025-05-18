import { resetRelatedGifs } from '@features/related-gifs/store/slice'
import { fetchRelatedGifs } from '@features/related-gifs/store/thunk'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import GifsContainer from '@shared/ui/GifsContainer'
import { FC, useEffect } from 'react'

import s from './relatedGifs.module.scss'

interface Props {
  id: string
}

const RelatedGifs: FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch()

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

  return (
    <div>
      <p className={s.title}>Related GIFs</p>
      <GifsContainer
        fetchData={fetchData}
        gifsArray={relatedGifs}
        error={error}
        directory={'../images'}
        showImageError={false}
      />
    </div>
  )
}

export default RelatedGifs
