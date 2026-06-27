import useInfiniteScroll from '@shared/hooks/useInfiniteScroll'
import { ImageSchema } from '@shared/models/image.model'
import EmptyState from '@shared/ui/EmptyState'
import MasonryUi from '@shared/ui/ImageContainer/MasonryUi'
import Loading from '@shared/ui/Loading'

interface IProps {
  imagesArray: ImageSchema[]
  fetchData: () => void
  error?: string | null | boolean
  showImageError?: boolean
  loading?: boolean
  isLoading?: boolean
}

const ImageContainer = ({
  imagesArray,
  fetchData,
  error,
  showImageError,
  loading = true,
  isLoading = false,
}: IProps) => {
  const hasMore = !error

  const sentinelRef = useInfiniteScroll({
    hasMore,
    isLoading,
    loadMore: fetchData,
    dataLength: imagesArray?.length ?? 0,
  })

  if (!imagesArray) return null

  return (
    <div>
      <MasonryUi data={imagesArray} />

      {hasMore ? (
        <>
          <div ref={sentinelRef} style={{ height: 1 }} aria-hidden />
          {loading && <Loading />}
        </>
      ) : (
        <EmptyState
          showImageError={showImageError}
          arrow={false}
          textBody={<p>{error}</p>}
        />
      )}
    </div>
  )
}

export default ImageContainer
