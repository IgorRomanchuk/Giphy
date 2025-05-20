import { ImageSchema } from '@shared/models/image.model'
import EmptyState from '@shared/ui/EmptyState'
import MasonryUi from '@shared/ui/ImageContainer/MasonryUi'
import Loading from '@shared/ui/Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

interface IProps {
  imagesArray: ImageSchema[]
  fetchData: () => void
  error?: string | null | boolean
  showImageError?: boolean
  loading?: boolean
}

const ImageContainer = ({
  imagesArray,
  fetchData,
  error,
  showImageError,
  loading = true,
}: IProps) => {
  return (
    <>
      {imagesArray && (
        <div>
          <InfiniteScroll
            dataLength={imagesArray.length}
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
            <MasonryUi data={imagesArray} />
          </InfiniteScroll>
        </div>
      )}
    </>
  )
}

export default ImageContainer
