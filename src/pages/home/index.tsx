import { useSelector } from 'react-redux'
import Masonry from 'react-responsive-masonry'
const Home = () => {
  const giphys = useSelector((state: any) => state.giphys.giphys)

  return (
    <>
      {giphys && (
        <Masonry columnsCount={4} gutter="10px">
          {giphys.map((image: any) => (
            <img
              key={image.id}
              src={image.images.original.url}
              style={{ width: '100%', display: 'block' }}
            />
          ))}
        </Masonry>
      )}
    </>
  )
}

export default Home
