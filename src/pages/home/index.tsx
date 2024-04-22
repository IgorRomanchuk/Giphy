import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import Masonry from 'react-responsive-masonry'

import { fetchGiphys } from '../../store/giphySlice'
const Home = () => {
  const dispatch: any = useDispatch()
  const giphys = useSelector((state: any) => state.giphys.giphys)
  const offset = useSelector((state: any) => state.giphys.offset)
  const fetchData = () => {
    dispatch(fetchGiphys(offset))
  }

  return (
    <>
      {giphys && (
        <div>
          <InfiniteScroll
            dataLength={giphys.length}
            next={fetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Masonry columnsCount={3} gutter="10px">
              {giphys.map((image: any) => (
                <img
                  key={image.id}
                  src={image.images.original.url}
                  width={image.images.original.width}
                  height={image.images.original.height}
                  style={{
                    width: '100%',
                    display: 'block',
                    backgroundColor: 'red',
                    height: '100%',
                  }}
                />
              ))}
            </Masonry>
          </InfiniteScroll>
        </div>
      )}
    </>
  )
}

export default Home
