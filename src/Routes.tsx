import { Navigate, useRoutes } from 'react-router-dom'

import NotFound from './pages/404'
import Home from './pages/home'

function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <Home />,
      children: [
        {
          path: '/:searchValue',
          element: <Home />,
        },
      ],
    },
    { path: '404', element: <NotFound /> },
    { path: '*', element: <Navigate to="404" replace /> },
  ])
}

export default Routes
