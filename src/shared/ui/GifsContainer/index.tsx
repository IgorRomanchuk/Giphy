import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { GifSchema } from '@shared/models/gif.model'
import { setGif } from '@shared/store/gifSlice'
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
}

const GifsContainer = ({ gifsArray, fetchData, error, directory }: IProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <>
      {gifsArray && (
        <div>
          <InfiniteScroll
            dataLength={gifsArray.length}
            next={fetchData}
            hasMore={!error}
            loader={<Loading />}
            endMessage={
              <h3
                style={{
                  color: 'white',
                  paddingTop: '20px',
                  textAlign: 'center',
                }}
              >
                {error} please come back later
              </h3>
            }
          >
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 550: 2, 830: 3, 1080: 4 }}
            >
              <Masonry gutter="10px">
                {gifsArray.map((image: GifSchema, i: number) => (
                  <div
                    onClick={() => {
                      dispatch(setGif(image))
                      navigate(`${directory}/${image.id}`)
                    }}
                    key={i}
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
