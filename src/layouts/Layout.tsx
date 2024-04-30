import { Outlet } from 'react-router-dom'

import Header from '../components/header'
import s from './layout.module.css'

const Layout = () => {
  return (
    <>
      <Header />
      <main className={s.main}>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
