import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useNavigate } from 'react-router-dom'

import CardGif from '../../components/cardGif'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import useScreenSize from '../../hooks/useScreenSize'
import { setGif } from '../../store/gifSlice'
import { Gif } from '../../types/Gif'
import getRandomInt from '../../utils/getRandomInt'
import Loader from '../loading'

interface IProps {
  gifsArray: Gif[]
  fetchData: () => void
  error?: string | null
}

const GifsContainer = ({ gifsArray, fetchData, error }: IProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const screenSize = useScreenSize()
  useEffect(() => {
    if (screenSize.height && document.body.scrollHeight < screenSize.height) {
      fetchData()
    }
  }, [gifsArray.length])

  return (
    <>
      {gifsArray && (
        <div>
          <InfiniteScroll
            dataLength={gifsArray.length}
            next={fetchData}
            hasMore={!error}
            loader={<Loader />}
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
                {gifsArray.map((image: Gif, i: number) => {
                  const num = getRandomInt(4)
                  return (
                    <div
                      onClick={() => {
                        dispatch(setGif(image))
                        navigate(`gifs/${image.id}`)
                        console.log(image)
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
