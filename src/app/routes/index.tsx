import Layout from '@app/layout'
import Favorites from '@pages/favorites-gifs'
import Gif from '@pages/gif'
import GifsPage from '@pages/gifs'
import GifsSearchPage from '@pages/gifs-search'
import NotFoundPage from '@pages/not-found'
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
          element: <GifsSearchPage />,
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
