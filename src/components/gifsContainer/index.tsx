import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useNavigate } from 'react-router-dom'

import CardGif from '../../components/cardGif'
import { colors } from '../../constants'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import useScreenSize from '../../hooks/useScreenSize'
import { setGif } from '../../store/gifSlice'
import { Gif } from '../../types/Gif'
import getRandomInt from '../../utils/getRandomInt'
import Loader from '../loading'

interface IProps {
  gifsArray: Gif[]
  fetchData: () => void
  error?: string | null | boolean
  directory: string
  opacity: boolean
  pagination?: any
}

const GifsContainer = ({
  gifsArray,
  fetchData,
  error,
  directory,
  opacity,
  pagination,
}: IProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const screenSize = useScreenSize()
  useEffect(() => {
    if (pagination?.total_count === pagination?.count) return
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
            loader={pagination?.total_count !== gifsArray.length && <Loader />}
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
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        backgroundColor: `${num && colors[num]}`,
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
