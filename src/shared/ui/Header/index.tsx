import favoriteIcon from '@assets/img/80h.gif'
import giphyLogo from '@assets/img/giphyLogo.png'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import useScreenSize from '@shared/hooks/useScreenSize'
import {
  fetchGifsBySearchValue,
  resetGifs,
  setValue,
} from '@shared/store/gifsBySearchValueSlice'
import { categories } from '@shared/ui/Header/constants/categories'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import SearchInput from '../../../widgets/SearchInput'
import s from './index.module.scss'

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
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const handleSearch = (value: string) => {
    if (!gifsBySearchValue.length) {
      // dispatch(resetTrendingGifs())
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
            src={giphyLogo}
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
            onClick={() => navigate('/favorites-gifs')}
          >
            <div className={s.imageWrapper}>
              <img
                src={favoriteIcon}
                alt="favorite-icon"
                height={39}
                width={39}
                className={`${imageHover ? s.imageScale : s.image}`}
              />
            </div>
            <h2 style={{ fontSize: '16px', margin: 'auto 10px' }}>Favorites</h2>
          </button>
        </div>
        <SearchInput width={width} />
      </header>
      <div className={s.fakeDiv}></div>
    </>
  )
}

export default Header
