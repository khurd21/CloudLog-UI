import { Navigate } from "react-router-dom"
import isAuth from "../auth"

const Statistics = ({ requireAuth }) => {
    const { isAuthenticated } = isAuth()
    if (!isAuthenticated && requireAuth) {
        return <Navigate to='/login' />
    }

    return (
        <div>
            <center>
                <h1>Statistics</h1>
            </center>
        </div>
    )
}

export default Statistics