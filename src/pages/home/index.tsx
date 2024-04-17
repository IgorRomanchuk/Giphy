import { useSelector } from 'react-redux'

const Home = () => {
  const giphys = useSelector((state: any) => state.giphys.giphys)

  return (
    <>
      <div>Home</div>
      {giphys &&
        giphys.map((item: any) => (
          <img key={item.id} src={item.images.original.url} alt="" />
        ))}
    </>
  )
}

export default Home
