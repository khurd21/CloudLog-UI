import Layout from './components/Layout'
import AppRoutes from './components/AppRoutes'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Layout>
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element: Element, requireAuth, ...rest } = route
          console.log(`Require auth? ${requireAuth}`)
          return <Route key={index} requireAuth={requireAuth} {...rest} element={<Element requireAuth={requireAuth} />} />
        })}
      </Routes>
    </Layout>
  )
}

export default App