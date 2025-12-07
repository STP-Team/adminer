import {LoginButton} from "@telegram-auth/react";
import axios from 'axios';
import {useEffect, useState} from 'react';

interface UserInfo {
    user_id: number;
    fullname: string;
    role: number;
    username?: string;
    division?: string;
    position?: string;
}

export function TelegramLoginButton() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);

    // Check if user is already authenticated on component mount
    useEffect(() => {
        void checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        const token = getCookie('access_token');
        if (token) {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/auth/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserInfo(response.data);
                setIsAuthenticated(true);
            } catch (error) {
                // Token is invalid, remove it
                deleteCookie('access_token');
            }
        }
        setLoading(false);
    };

    const authenticateUser = async (telegramData: any) => {
        try {
            setLoading(true);

            // Prepare auth data according to TelegramAuthData schema
            const authData = {
                id: String(telegramData.id),
                first_name: telegramData.first_name,
                last_name: telegramData.last_name || '',
                username: telegramData.username || '',
                photo_url: telegramData.photo_url || '',
                auth_date: String(telegramData.auth_date),
                hash: telegramData.hash
            };

            const response = await axios.post(`http://localhost:8000/api/v1/auth/telegram`, authData);

            const {access_token} = response.data;

            // Store token in cookies with actual token expiry
            const tokenExpiry = getTokenExpiryInDays(access_token);
            setCookie('access_token', access_token, tokenExpiry);

            // Get user info
            const userResponse = await axios.get(`http://localhost:8000/api/v1/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });

            setUserInfo(userResponse.data);
            setIsAuthenticated(true);

        } catch (error) {
            console.error('Authentication failed:', error);
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as any;
                if (axiosError.response?.data?.detail) {
                    alert(`Authentication failed: ${axiosError.response.data.detail}`);
                } else {
                    alert('Authentication failed. Please try again.');
                }
            } else {
                alert('Authentication failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        deleteCookie('access_token');
        setIsAuthenticated(false);
        setUserInfo(null);
    };

    // JWT helper function
    const getTokenExpiryInDays = (token: string): number => {
        try {
            // Decode JWT payload (we only need the payload, not verification)
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );

            const decoded = JSON.parse(jsonPayload);
            const exp = decoded.exp; // Expiration timestamp in seconds

            if (!exp) {
                console.warn('Token has no expiration, using 1 day default');
                return 1;
            }

            const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
            const secondsUntilExpiry = exp - now;
            return Math.max(0, Math.ceil(secondsUntilExpiry / (24 * 60 * 60)));
        } catch (error) {
            console.error('Failed to decode token expiry:', error);
            return 1;
        }
    };

    // Cookie helper functions
    const setCookie = (name: string, value: string, days: number) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    const getCookie = (name: string): string | null => {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    const deleteCookie = (name: string) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated && userInfo) {
        return (
            <div className="App">
                <div style={{padding: '20px', textAlign: 'center'}}>
                    <h2>Login Success!</h2>
                    <p>Welcome, <strong>{userInfo.fullname}</strong></p>
                    {userInfo.position && <p>Position: {userInfo.position}</p>}
                    {userInfo.division && <p>Division: {userInfo.division}</p>}
                    <button
                        onClick={logout}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '20px'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="App">
            <LoginButton
                botUsername={import.meta.env.VITE_BOT_NAME}
                onAuthCallback={async (data) => {
                    console.log(`Authorized by ${data.username}`);
                    await authenticateUser(data);
                }}
                buttonSize="medium"
                showAvatar={true}
                lang="ru"
            />
        </div>
    );
}
