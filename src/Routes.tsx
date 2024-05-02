import { Navigate, useRoutes } from 'react-router-dom'

import Layout from './layouts/Layout'
import NotFound from './pages/404'
import Home from './pages/home'
import SeatchGifs from './pages/searchGifs'

function Routes() {
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
          path: '/:searchValue',
          element: <SeatchGifs />,
        },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="404" replace /> },
      ],
    },
  ])
}

export default Routes
