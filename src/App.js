import Layout from './components/Layout'
import AppRoutes from './components/AppRoutes'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Layout>
        <Routes>
        {AppRoutes.map((route, index) => {
          const { element, requireAuth, ...rest } = route
          console.log('Element: ' + JSON.stringify(route))
          return <Route key={index} {...rest} element={element} />
        })}
        </Routes>
    </Layout>
  )
}
export default App