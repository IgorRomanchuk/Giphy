import { GifSchema } from '@shared/models/gif.model'
import { FC } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useNavigate } from 'react-router-dom'
import ImageCard from 'shared/ui/ImageCard'

interface Props {
  data: GifSchema[]
  directory: string
  typeCard: 'gif' | 'sticker'
}

const MasonryUi: FC<Props> = ({ data, directory, typeCard }) => {
  const navigate = useNavigate()

  const navigateToGifById = (id: string) => {
    navigate(`${directory}/${id}`)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 550: 2, 830: 3, 1080: 4 }}
    >
      <Masonry gutter="10px">
        {data.map((image: GifSchema) => (
          <div onClick={() => navigateToGifById(image.id)} key={image.id}>
            <ImageCard image={image} typeCard={typeCard} />
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  )
}

export default MasonryUi
