import './App.css'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Routes from './Routes'
import { fetchGiphys } from './store/giphySlice'

function App() {
  const dispatch: any = useDispatch()
  useEffect(() => {
    dispatch(fetchGiphys())
  }, [])
  return (
    <div className="App">
      <p>GIPHY</p>

      <Routes />
    </div>
  )
}

export default App
