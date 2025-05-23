import Layout from '@app/layout'
import GifPage from '@pages/gif'
import NotFoundPage from '@pages/not-found'
import StickerPage from '@pages/sticker'
import FavoritesImagesPage from 'pages/favorites-images'
import ImagesPage from 'pages/images'
import ImagesSearchPage from 'pages/images-search'
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
          path: '/favorites-images',
          element: <FavoritesImagesPage />,
        },
        {
          path: '/search/:searchValue',
          element: <ImagesSearchPage />,
        },
        {
          path: '/gifs/:id',
          element: <GifPage />,
        },
        {
          path: '/stickers/:id',
          element: <StickerPage />,
        },
        { path: 'not-found', element: <NotFoundPage /> },
        { path: '*', element: <Navigate to="not-found" replace /> },
      ],
    },
  ])
}

export default Routes
