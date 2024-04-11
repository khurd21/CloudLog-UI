import Home from './Home'
import JumpList from './JumpList'
import Statistics from './Statistics'

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/jump-list',
        requireAuth: true,
        element: <JumpList />
    },
    {
        path: '/statistics',
        requireAuth: true,
        element: <Statistics />
    }
]

export default AppRoutes;