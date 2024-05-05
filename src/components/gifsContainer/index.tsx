import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry from 'react-responsive-masonry'

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
            <Masonry columnsCount={4} gutter="10px">
              {gifsArray.map((image: Gif, i: number) => {
                const num = getRandomInt(4)
                return <CardGif key={i} index={num} image={image} />
              })}
            </Masonry>
          </InfiniteScroll>
        </div>
      )}
    </>
  )
}

export default GifsContainer
