import TrendingStickers from '@features/trending-stickers'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import Image from 'features/image'
import RelatedImages from 'features/related-images'
import { useParams } from 'react-router-dom'

import s from './sticker.module.scss'

const StickerPage = () => {
  const { id } = useParams()

  const { image } = useAppSelector((state) => state.image)

  return (
    <div className={s.container}>
      <Image id={id!} />
      {image ? (
        <RelatedImages id={id!} />
      ) : (
        <TrendingStickers showImageError={false} />
      )}
    </div>
  )
}

export default StickerPage
