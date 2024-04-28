import GoogleAuthPage from '../auth/GoogleAuth';
import Home from './Home'
import JumpList from './JumpList'
import Statistics from './Statistics'

const AppRoutes = [
    {
        index: true,
        requireAuth: false,
        element: Home
    },
    {
        path: '/jump-list',
        requireAuth: true,
        element: JumpList
    },
    {
        path: '/statistics',
        requireAuth: true,
        element: Statistics
    },
    {
        path: '/login',
        requireAuth: false,
        element: GoogleAuthPage
    }
]

export default AppRoutes