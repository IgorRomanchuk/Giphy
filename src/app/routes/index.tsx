import Layout from '@app/layout'
import FavoritesGifsPage from '@pages/favorites-gifs'
import GifPage from '@pages/gif'
import GifsSearchPage from '@pages/gifs-search'
import NotFoundPage from '@pages/not-found'
import ImagesPage from 'pages/images'
import { Navigate, useRoutes } from 'react-router-dom'

const Routes = () => {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <ImagesPage />,
        },
        {
          path: '/favorites-gifs',
          element: <FavoritesGifsPage />,
        },
        {
          path: '/search/:searchValue',
          element: <GifsSearchPage />,
        },
        {
          path: '/gifs/:id',
          element: <GifPage />,
        },
        { path: 'not-found', element: <NotFoundPage /> },
        { path: '*', element: <Navigate to="not-found" replace /> },
      ],
    },
  ])
}

export default Routes
