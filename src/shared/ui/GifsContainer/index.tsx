import { GifSchema } from '@shared/models/gif.model'
import EmptyState from '@shared/ui/EmptyState'
import Loading from '@shared/ui/Loading'
import InfiniteScroll from 'react-infinite-scroll-component'
import MasonryUi from 'shared/ui/GifsContainer/MasonryUi'

interface IProps {
  gifsArray: GifSchema[]
  fetchData: () => void
  error?: string | null | boolean
  directory: string
  showImageError?: boolean
  loading?: boolean
  typeCard?: 'gif' | 'sticker'
}

const GifsContainer = ({
  gifsArray,
  fetchData,
  error,
  directory,
  showImageError,
  loading = true,
  typeCard = 'gif',
}: IProps) => {
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
            <MasonryUi
              data={gifsArray}
              directory={directory}
              typeCard={typeCard}
            />
          </InfiniteScroll>
        </div>
      )}
    </>
  )
}

export default GifsContainer
