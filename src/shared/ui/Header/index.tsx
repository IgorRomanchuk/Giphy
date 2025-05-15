import giphyLogo from '@assets/img/giphyLogo.png'
import useScreenSize from '@shared/hooks/useScreenSize'
import FavoritesButton from '@shared/ui/Header/components/FavoritesButton'
import MenuCategories from '@shared/ui/Header/components/MenuCategories'
import SearchInput from '@widgets/SearchInput'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import s from './header.module.scss'

const Header = () => {
  const [width, setWidth] = useState('firstWidth')
  const [headerPosition, setHeaderPosition] = useState('')
  const [logoPosition, setLogoPosition] = useState('firstPosition')
  const [value, setValue] = useState('')

  const navigate = useNavigate()

  const screenSize = useScreenSize()

  const navigateToHome = () => {
    navigate('/')
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
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
        <div className={s.container}>
          <img
            className={`${s.logo} ${s[logoPosition]}`}
            src={giphyLogo}
            alt="logo"
            width={170}
            height={50}
            onClick={navigateToHome}
          />
          <MenuCategories setValue={setValue} />
          <FavoritesButton setValue={setValue} />
        </div>
        <SearchInput width={width} value={value} setValue={setValue} />
      </header>
      <div className={s.fakeDiv}></div>
    </>
  )
}

export default Header
