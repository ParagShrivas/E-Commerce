import React, { useState } from 'react';
import '../css_file/loginStyle.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Alert from './Alert';

export default function LoginPage(props) {
     const [SignUpMode, SetClass] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [password2, setPassword2] = useState('');
     const [fname, setFname] = useState('');
     const [lname, setLname] = useState('');
     const navigate = useNavigate(); // Correctly use useNavigate

     const toggleClass = () => {
          SetClass(SignUpMode === '' ? 'sign-up-mode' : '');
     };

     const Login = async (e) => {
          e.preventDefault();
          const data = { email, password };

          try {
               const response = await fetch('http://localhost:1500/login', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
               });

               const res = await response.json();
               if (response.ok) {
                    navigate('/dashboard', { state: { message: res.message } }); // Redirect to dashboard
               } else {
                    navigate('/login', { state: { message: res.message } }); // Redirect to login
                    console.error('Login failed:', res.message);
               }
          } catch (error) {
               console.error('Error during login:', error);
          }
     };

     const SignUp = async (e) => {
          e.preventDefault();
          const UserData = { fname, lname, email, password, password2 };

          try {
               const response = await fetch('http://localhost:1500/login/register/user', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(UserData),
               });

               const result = await response.json();
               if (response.ok) {
                    navigate('/login', { state: { message: result.message } }, window.location.reload()); // Redirect to login page
               } else {
                    navigate('/login', { state: { message: result.message } })
                    console.error('Sign-up failed:', result.message);
               }
          } catch (error) {
               console.error('Error during sign-up:', error);
          }
     };
     const location = useLocation(); // Access the location object
     var res_message = location.state?.message || ''; // Get the message from state

     const [alert, setAlert] = useState(null);

     const showAlert = (message) => {
          setAlert({ msg: message });
          setTimeout(() => {
               setAlert(null);
               res_message = '';
          }, 5000);
     };

     const login_signup = () => {
          if (res_message !== '') { showAlert(res_message) }
     }

     return (
          <div className={`container ${SignUpMode}`}>
               <Alert alert={alert} />
               <div className="forms-container">
                    <div className="signin-signup">
                         <form onSubmit={Login} className="sign-in-form">
                              <h2 className="title">Sign in</h2>
                              <div className="input-field">
                                   <i className="fas fa-user"></i>
                                   <input
                                        type="text"
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                   />
                              </div>
                              <div className="input-field">
                                   <i className="fas fa-lock"></i>
                                   <input
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                   />
                              </div>
                              <input type="submit" value="Login" className="btn solid" onClick={login_signup} />
                              <p className="social-text">Or Sign up with social platforms</p>
                              <div className="social-media">
                                   <a href="/" className="social-icon">
                                        <i className="fab fa-facebook-f"></i>
                                   </a>
                                   <a href="/" className="social-icon">
                                        <i className="fab fa-twitter"></i>
                                   </a>
                                   <a href="/" className="social-icon">
                                        <i className="fab fa-google"></i>
                                   </a>
                                   <a href="/" className="social-icon">
                                        <i className="fab fa-linkedin-in"></i>
                                   </a>
                              </div>

                         </form>

                         <form onSubmit={SignUp} className="sign-up-form">
                              <h2 className="title">Sign up</h2>
                              <div className="input-field">
                                   <i className="fas fa-user"></i>
                                   <input
                                        type="text"
                                        placeholder="First name"
                                        onChange={(e) => setFname(e.target.value)}
                                   />
                              </div>
                              <div className="input-field">
                                   <i className="fas fa-user"></i>
                                   <input
                                        type="text"
                                        placeholder="Last name"
                                        onChange={(e) => setLname(e.target.value)}
                                   />
                              </div>
                              <div className="input-field">
                                   <i className="fas fa-envelope"></i>
                                   <input
                                        type="email"
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                   />
                              </div>
                              <div className="input-field">
                                   <i className="fas fa-lock"></i>
                                   <input
                                        type="text"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                   />
                              </div>
                              <div className="input-field">
                                   <i className="fas fa-lock"></i>
                                   <input
                                        type="password"
                                        placeholder="Re Enter Password"
                                        onChange={(e) => setPassword2(e.target.value)}
                                   />
                              </div>
                              <input type="submit" className="btn" value="Sign up" onClick={login_signup} />
                              <p className="social-text">Or Sign up with social platforms</p>
                              <div className="social-media">
                                   <a href="/" className="social-icon">
                                        <i className="fab fa-facebook-f"></i>
                                   </a>
                                   <a href="/" className="social-icon">
                                        <i className="fab fa-twitter"></i>
                                   </a>
                                   <a href="/" className="social-icon">
                                        <i className="fab fa-google"></i>
                                   </a>
                                   <a href="/" className="social-icon">
                                        <i className="fab fa-linkedin-in"></i>
                                   </a>
                              </div>
                         </form>
                    </div>
               </div>

               <div className="panels-container">
                    <div className="panel left-panel">
                         <div className="content">
                              <h3>New here?</h3>
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                              <button className="btn transparent" id="sign-up-btn" onClick={toggleClass}>
                                   Sign up
                              </button>
                         </div>
                         <img src="img/register.svg" className="image" alt="Sign up illustration" />
                    </div>

                    <div className="panel right-panel">
                         <div className="content">
                              <h3>One of us?</h3>
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                              <button className="btn transparent" id="sign-in-btn" onClick={toggleClass}>
                                   Sign in
                              </button>
                         </div>
                         <img src="img/register.svg" className="image" alt="Sign in illustration" />
                    </div>
               </div>
          </div>
     );
}
