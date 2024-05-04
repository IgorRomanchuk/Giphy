import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import Masonry from 'react-responsive-masonry'
import { useParams } from 'react-router-dom'

import CardGif from '../../components/cardGif'
import { setValue } from '../../store/gifsBySearchValueSlice'
import { fetchGifsBySearchValue } from '../../store/gifsBySearchValueSlice'
import { Gif } from '../../types/Gif'
import getRandomInt from '../../utils/getRandomInt'

const SeatchGifs = () => {
  const dispatch: any = useDispatch()
  const { searchValue } = useParams()
  const gifsBySearchValue = useSelector(
    (state: any) => state.gifsBySearchValue.gifsBySearchValue,
  )
  const offset = useSelector((state: any) => state.gifsBySearchValue.offset)
  const value = useSelector((state: any) => state.gifsBySearchValue.value)
  const fetchData = () => {
    dispatch(fetchGifsBySearchValue({ offset, searchValue: value }))
  }

  useEffect(() => {
    const promise = dispatch(
      fetchGifsBySearchValue({ offset: 0, searchValue: searchValue }),
    )
    dispatch(setValue(searchValue))
    return () => {
      promise?.abort()
    }
  }, [])

  return (
    <>
      {gifsBySearchValue && (
        <div>
          <InfiniteScroll
            dataLength={gifsBySearchValue.length}
            next={fetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Masonry columnsCount={4} gutter="10px">
              {gifsBySearchValue.map((image: Gif, i: number) => {
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

export default SeatchGifs
