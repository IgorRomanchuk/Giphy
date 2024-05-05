import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { categories } from '../../constants'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  fetchGifsBySearchValue,
  resetGifs,
  setValue,
} from '../../store/gifsBySearchValueSlice'
import s from './index.module.scss'
import SearchContainer from './searchContainer'

const Header = () => {
  const [width, setWidth] = useState('firstWidth')
  const [headerPosition, setHeaderPosition] = useState('')
  const [logoPosition, setLogoPosition] = useState('firstPosition')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { searchValue } = useParams()

  const gifsBySearchValue = useAppSelector(
    (state) => state.gifsBySearchValue.gifsBySearchValue,
  )

  const navigateToHome = () => {
    navigate('/')
    dispatch(setValue(''))
    dispatch(resetGifs())
  }
  const handleSearch = (value: string) => {
    if (!gifsBySearchValue.length) {
      navigate(`/${value}`)
      return null
    }
    if (value !== searchValue) {
      dispatch(resetGifs())
      dispatch(fetchGifsBySearchValue({ offset: 0, searchValue: value }))
      dispatch(setValue(value))
      navigate(`/${value}`)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setWidth('secondWidth')
        setHeaderPosition('secondHeaderPosition')
        setLogoPosition('secondLogoPosition')
      } else {
        setWidth('firstWidth')
        setHeaderPosition('firstHeaderPosition')
        setLogoPosition('firstLogoPosition')
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <>
      <header className={`${s.header} ${s[headerPosition]}`}>
        <div style={{ display: 'flex' }}>
          <img
            className={`${s.logo} ${s[logoPosition]}`}
            src="/images/giphyLogo.png"
            alt=""
            width={170}
            height={50}
            onClick={() => navigateToHome()}
          />
          <ul className={s.menu}>
            {categories.map((item: string) => (
              <li key={item}>
                <button
                  className={`${s.button} ${s[item.toLowerCase()]}`}
                  onClick={() => handleSearch(item.toLowerCase())}
                >
                  <h2>{item}</h2>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <SearchContainer width={width} />
      </header>
      <div className={s.fakeDiv}></div>
    </>
  )
}

export default Header
