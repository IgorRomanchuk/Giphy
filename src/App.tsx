import './App.scss'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Routes from './Routes'
import { fetchTrendingGifs } from './store/gifsSlice'

function App() {
  const dispatch: any = useDispatch()

  useEffect(() => {
    const promise = dispatch(fetchTrendingGifs(0))
    return () => {
      promise?.abort()
    }
  }, [])
  return (
    <div className="App">
      <Routes />
    </div>
  )
}

export default App
