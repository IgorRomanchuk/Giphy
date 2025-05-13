import { GifSchema } from '@shared/models/gif.model'
import CardGif from '@shared/ui/CardGif'
import { FC } from 'react'
import {
  Masonry as MasonryLib,
  ResponsiveMasonry,
} from 'react-responsive-masonry'
import { useNavigate } from 'react-router-dom'

interface Props {
  data: GifSchema[]
  directory: string
}

const Masonry: FC<Props> = ({ data, directory }) => {
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
      <MasonryLib gutter="10px">
        {data.map((image: GifSchema) => (
          <div onClick={() => navigateToGifById(image.id)} key={image.id}>
            <CardGif image={image} />
          </div>
        ))}
      </MasonryLib>
    </ResponsiveMasonry>
  )
}

export default Masonry
