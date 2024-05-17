import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import CardGif from '../../components/cardGif'
import { Gif } from '../../types/Gif'
import getRandomInt from '../../utils/getRandomInt'
import Loader from '../loading'

interface IProps {
  gifsArray: Gif[]
  fetchData: () => void
}

const GifsContainer = ({ gifsArray, fetchData }: IProps) => {
  return (
    <>
      {gifsArray && (
        <div>
          <InfiniteScroll
            dataLength={gifsArray.length}
            next={fetchData}
            hasMore={true}
            loader={<Loader />}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 550: 2, 830: 3, 1080: 4 }}
            >
              <Masonry gutter="10px">
                {gifsArray.map((image: Gif, i: number) => {
                  const num = getRandomInt(4)
                  return <CardGif key={i} index={num} image={image} />
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
