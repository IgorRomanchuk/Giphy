import Layout from '@app/layout'
import Favorites from '@pages/favorites'
import Gif from '@pages/gif'
import Home from '@pages/home'
import NotFoundPage from '@pages/not-found'
import SearchGifs from '@pages/searchGifs'
import { Navigate, useRoutes } from 'react-router-dom'

const Routes = () => {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/favorites',
          element: <Favorites />,
        },
        {
          path: '/search/:searchValue',
          element: <SearchGifs />,
        },
        {
          path: '/gifs/:id',
          element: <Gif />,
        },
        { path: 'not-found', element: <NotFoundPage /> },
        { path: '*', element: <Navigate to="not-found" replace /> },
      ],
    },
  ])
}

export default Routes
