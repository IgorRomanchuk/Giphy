import Layout from '@app/layout'
import Gif from '@pages/gif'
import NotFoundPage from '@pages/not-found'
import SearchGifs from '@pages/searchGifs'
import Favorites from 'pages/favorites-gifs'
import GifsPage from 'pages/gifs'
import { Navigate, useRoutes } from 'react-router-dom'

const Routes = () => {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <GifsPage />,
        },
        {
          path: '/favorites-gifs',
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
