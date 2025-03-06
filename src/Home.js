import Logo from "./Logo"

import './Home.css'
import { AuthContext, SignIn } from "./AuthProvider"
import Greeting from "./Greeting"
import { useContext } from "react"

const Home = () => {
    const { user } = useContext(AuthContext)

    return (
        <div className="home-container">
            <Logo />
            <div className="auth-section">
                {user ? (
                    <Greeting />
                ) : (
                    <SignIn />
                )}
            </div>
        </div>
    )
}

export default Home;