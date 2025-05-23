import { Outlet } from 'react-router-dom'
import Header from 'shared/ui/Header'

import s from './layout.module.scss'

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
