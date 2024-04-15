import './App.css'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchGiphys } from './store/giphySlice'

function App() {
  const giphys = useSelector((state: any) => state.giphys.giphys)
  const dispatch: any = useDispatch()
  useEffect(() => {
    dispatch(fetchGiphys())
  }, [])
  return (
    <div className="App">
      <p>GIPHY</p>
      {giphys &&
        giphys.map((item: any) => (
          <img key={item.id} src={item.images.original.url} alt="" />
        ))}
    </div>
  )
}

export default App
