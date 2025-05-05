import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { Gif } from '@shared/models/Gif'
import { setGif } from '@shared/store/gifSlice'
import { cardColors } from '@shared/ui/CardGif/constants/cardColors'
import Loading from '@shared/ui/Loading'
import { getRandomInt } from '@shared/utils/getRandomInt'
import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useNavigate } from 'react-router-dom'

import CardGif from '../CardGif'

interface IProps {
  gifsArray: Gif[]
  fetchData: () => void
  error?: string | null | boolean
  directory: string
  opacity: boolean
}

const GifsContainer = ({
  gifsArray,
  fetchData,
  error,
  directory,
  opacity,
}: IProps) => {
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
                  opacity: `${opacity ? 1 : 0}`,
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
                {gifsArray.map((image: Gif, i: number) => {
                  const num = getRandomInt(4)
                  return (
                    <div
                      style={{
                        borderRadius: '10px',
                        cursor: 'pointer',
                        backgroundColor: `${num && cardColors[num]}`,
                      }}
                      onClick={() => {
                        dispatch(setGif(image))
                        navigate(`${directory}/${image.id}`)
                      }}
                      key={i}
                    >
                      <CardGif index={num} image={image} />
                    </div>
                  )
                })}
              </Masonry>
            </ResponsiveMasonry>
          </InfiniteScroll>
        </div>
      )}
    </>
  )
}

export default GifsContainer
