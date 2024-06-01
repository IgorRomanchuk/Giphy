import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { categories } from '../../constants'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import useScreenSize from '../../hooks/useScreenSize'
import {
  fetchGifsBySearchValue,
  resetGifs,
  setValue,
} from '../../store/gifsBySearchValueSlice'
import { resetTrendingGifs } from '../../store/gifsSlice'
import s from './index.module.scss'
import SearchContainer from './searchContainer'

const Header = () => {
  const [width, setWidth] = useState('firstWidth')
  const [headerPosition, setHeaderPosition] = useState('')
  const [logoPosition, setLogoPosition] = useState('firstPosition')
  const [imageHover, setImageHover] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { searchValue } = useParams()

  const screenSize = useScreenSize()

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
      dispatch(resetTrendingGifs())
      navigate(`/search/${value}`)
      return null
    }
    if (value !== searchValue) {
      dispatch(resetGifs())
      dispatch(fetchGifsBySearchValue({ offset: 0, searchValue: value }))
      dispatch(setValue(value))
      navigate(`/search/${value}`)
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
  }, [screenSize.width])
  return (
    <>
      <header className={`${s.header} ${s[headerPosition]}`}>
        <div
          style={{
            display: 'flex',
            maxWidth: '1080px',
            backgroundColor: 'black',
          }}
        >
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
          <button
            className={s.favoritesButton}
            onMouseOver={() => setImageHover(true)}
            onMouseLeave={() => setImageHover(false)}
            onClick={() => navigate('/favorites')}
          >
            <div className={s.imageWrapper}>
              <img
                src="/images/80h.gif"
                alt=""
                height={39}
                width={39}
                className={`${imageHover ? s.imageScale : s.image}`}
              />
            </div>
            <h2 style={{ fontSize: '16px', margin: 'auto 10px' }}>Favorites</h2>
          </button>
        </div>
        <SearchContainer width={width} />
      </header>
      <div className={s.fakeDiv}></div>
    </>
  )
}

export default Header
