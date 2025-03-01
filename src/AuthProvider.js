import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Retrieve user and token from localStorage on initial load
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [jwtToken, setJwtToken] = useState(() => {
        const storedToken = localStorage.getItem('jwtToken');
        return storedToken ? storedToken : null;
    });

    // Save user and token to localStorage whenever they change
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        if (jwtToken) {
            localStorage.setItem('jwtToken', jwtToken);
        } else {
            localStorage.removeItem('jwtToken');
        }
    }, [jwtToken]);

    const login = (userData, token) => {
        setUser(userData);
        setJwtToken(token);
    };

    const logout = () => {
        setUser(null);
        setJwtToken(null);
    };

    return (
        <AuthContext.Provider value={{ login, logout, user, jwtToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const SignIn = () => {

    const { jwtDecode, login } = useContext(AuthContext);

    return (
        <GoogleOAuthProvider clientId='379391495680-d39d06qan1mtla0fihgn981dtiqrj826.apps.googleusercontent.com'>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    const decoded = jwtDecode(credentialResponse.credential);
                    console.log(decoded);
                    const userData = {
                        firstName: decoded.given_name,
                        lastName: decoded.family_name,
                        email: decoded.email,
                        emailVerified: decoded.email_verified,
                        pictureLink: decoded.picture,
                    };
                    login(userData, credentialResponse.credential);
                    console.log('Login success');
                }}
                onError={() => {
                    console.log('Login Failed');
                }} />
        </GoogleOAuthProvider>
    );
}