import { resetRelatedImages } from '@features/related-images/store/slice'
import { fetchRelatedImages } from '@features/related-images/store/thunk'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { FC, useEffect } from 'react'
import ImageContainer from 'shared/ui/ImageContainer'

import s from './relatedImages.module.scss'

interface Props {
  id: string
}

const RelatedImages: FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch()

  const { offset, relatedImages, error } = useAppSelector(
    (state) => state.relatedImages,
  )

  const fetchData = () => {
    dispatch(fetchRelatedImages({ offset, id }))
  }

  useEffect(() => {
    dispatch(resetRelatedImages())

    const promise = dispatch(fetchRelatedImages({ offset: 0, id }))

    return () => {
      promise?.abort()
    }
  }, [id])

  return (
    <div>
      <p className={s.title}>Related images</p>
      <ImageContainer
        fetchData={fetchData}
        imagesArray={relatedImages}
        error={error}
        showImageError={false}
      />
    </div>
  )
}

export default RelatedImages
