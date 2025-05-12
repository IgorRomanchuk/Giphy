import { GifSchema } from '@shared/models/gif.model'
import EmptyState from '@shared/ui/EmptyState'
import Loading from '@shared/ui/Loading'
import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useNavigate } from 'react-router-dom'

import CardGif from '../CardGif'

interface IProps {
  gifsArray: GifSchema[]
  fetchData: () => void
  error?: string | null | boolean
  directory: string
  showImageError?: boolean
  loading?: boolean
}

const GifsContainer = ({
  gifsArray,
  fetchData,
  error,
  directory,
  showImageError,
  loading = true,
}: IProps) => {
  const navigate = useNavigate()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {gifsArray && (
        <div>
          <InfiniteScroll
            dataLength={gifsArray.length}
            next={fetchData}
            hasMore={!error}
            loader={loading && <Loading />}
            endMessage={
              <EmptyState
                showImageError={showImageError}
                arrow={false}
                textBody={<p>{error}</p>}
              />
            }
          >
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 550: 2, 830: 3, 1080: 4 }}
            >
              <Masonry gutter="10px">
                {gifsArray.map((image: GifSchema) => (
                  <div
                    onClick={() => {
                      navigate(`${directory}/${image.id}`)
                      scrollToTop()
                    }}
                    key={image.id}
                  >
                    <CardGif image={image} />
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </InfiniteScroll>
        </div>
      )}
    </>
  )
}

export default GifsContainer
