import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckAuth = () => {
     const navigate = useNavigate();

     useEffect(() => {
          const checkAuth = async () => {
               try {
                    const token = localStorage.getItem('token');

                    // Redirect to login if no token found in local storage
                    if (!token) {
                         console.log('No token found, redirecting to login.');
                         localStorage.removeItem('email');
                         localStorage.removeItem('user_id');
                         navigate('/login');
                         return;
                    }

                    // If token is found, send request to validate it
                    const response = await fetch('http://localhost:1500/login/check-auth', {
                         headers: { Authorization: `Bearer ${token}` },
                    });

                    // If the token is invalid or the request fails, redirect to login
                    if (!response.ok) {
                         console.log('Token invalid or expired, redirecting to login.');
                         localStorage.removeItem('email');
                         navigate('/login');
                    } else {
                         console.log('Token valid, proceeding.');
                    }
               } catch (error) {
                    // Handle potential network errors or other issues
                    console.error('Error during authentication check:', error);
                    navigate('/login');
               }
          };

          checkAuth();
     }, [navigate]);

     return null; // This component does not render any UI, it only handles auth checking
};

export default CheckAuth;
