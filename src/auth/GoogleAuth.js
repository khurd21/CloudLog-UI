import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import isAuth from '../auth'

const GoogleAuthPage = () => {
    const { isAuthenticated } = isAuth()
    const navigate = useNavigate()
    if (isAuthenticated) {
        return navigate('/')
    }

    const onSuccess = (response) => {
        console.log(`Response: ${JSON.stringify(response)}`)
        const { credential } = response
        // Store tokenId in local storage or state
        console.log(`Success: ${credential}`)
        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 1)
        localStorage.setItem('tokenId', credential)
        localStorage.setItem('tokenExpiration', expirationTime.toString())
        navigate('/')
    };

    const onFailure = (error) => {
        console.error('Google authentication failed:', error);
        localStorage.clear()
        // Handle authentication failure
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
            <h1>Sign In</h1>
            <div>
                {!isAuthenticated &&
                    <GoogleOAuthProvider clientId='379391495680-d39d06qan1mtla0fihgn981dtiqrj826.apps.googleusercontent.com'>
                        <GoogleLogin
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                        />
                    </GoogleOAuthProvider>
                }
            </div>
        </div>
    );
};

export default GoogleAuthPage