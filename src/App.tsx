import './App.css'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Routes from './Routes'
import { fetchGiphys } from './store/giphySlice'

function App() {
  const dispatch: any = useDispatch()

  useEffect(() => {
    const promise = dispatch(fetchGiphys(0))
    return () => {
      promise?.abort()
    }
  }, [])
  return (
    <div className="App">
      <p>GIPHY</p>

      <Routes />
    </div>
  )
}

export default App
