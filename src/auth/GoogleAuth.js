import { Title } from '@mui/icons-material';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import React, { useState } from 'react'

const GoogleAuthPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const onSuccess = (response) => {
        const { tokenId } = response
        // Store tokenId in local storage or state
        localStorage.setItem('tokenId', tokenId)
        setIsAuthenticated(true)
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
                    <GoogleOAuthProvider clientId=''>
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