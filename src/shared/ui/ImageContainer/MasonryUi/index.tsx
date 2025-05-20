import { ImageSchema } from '@shared/models/image.model'
import { FC } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import ImageCard from 'shared/ui/ImageCard'

interface Props {
  data: ImageSchema[]
}

const MasonryUi: FC<Props> = ({ data }) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 550: 2, 830: 3, 1080: 4 }}
    >
      <Masonry gutter="10px">
        {data.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  )
}

export default MasonryUi
