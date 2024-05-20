const isAuth = () => {
    const expirationTimeString = localStorage.getItem('tokenExpiration')
    if (!expirationTimeString) {
        return false
    }
    const expirationTime = new Date(expirationTimeString)
    const currentTime = new Date()
    const isAuth = !localStorage.getItem('tokenId') || currentTime < expirationTime 
    return {
        isAuthenticated: isAuth
    }
}

export default isAuth