import {createHashRouter, RouterProvider } from 'react-router-dom'
import { ThemeContext } from './contexts/ThemeContext.jsx'

import  useLightMode  from './components/LightMode/UseLightMode.jsx'

import HomePage from './pages/home/HomePage/HomePage.jsx'
import LogPage from './pages/log/LogPage/LogPage.jsx'

function App() {
  const router = createHashRouter([
    {
      path: '',
      element: <HomePage />,
      errorElement: <HomePage />,
    },
    {
      path: 'log',
      element: <LogPage />,
      errorElement: <LogPage />,
    }
  ])

  const toggleLightMode = useLightMode()

  return (
    <ThemeContext value={{ toggleLightMode }}>
      <RouterProvider router={router} />
    </ThemeContext>
  )
}

export default App
