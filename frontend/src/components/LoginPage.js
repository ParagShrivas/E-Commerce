import React, { useState, useEffect, useRef } from 'react';
import '../css_file/loginStyle.css';
import '../css_file/otp.css';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';
import '../css_file/Loader.css';

export default function LoginPage(props) {
     const [SignUpMode, SetClass] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [password2, setPassword2] = useState('');
     const [fname, setFname] = useState('');
     const [lname, setLname] = useState('');
     const [showOTP, setShowOTP] = useState(false); // State to control OTP input visibility
     const [otp, setOtp] = useState(['', '', '', '']); // OTP input state
     const navigate = useNavigate();
     const inputRefs = useRef([]); // To store references to the input fields
     const [loading, setLoading] = useState(false);
     const [alert, setAlert] = useState(null);

     const showAlert = (message) => {
          setAlert({ msg: message });
          setTimeout(() => {
               setAlert(null);
          }, 5000);
     };

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
                    showAlert(res.message);
                    setShowOTP(true); // Show OTP input on successful login
               } else {
                    showAlert(res.message);
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
                    showAlert(result.message)
                    navigate('/', { state: { message: result.message } }, window.location.reload()); // Redirect to login page
               } else {
                    navigate('/login3', { state: { message: result.message } })
                    showAlert(result.message)
                    console.error('Sign-up failed:', result.message);
               }
          } catch (error) {
               console.error('Error during sign-up:', error);
          }
     };

     const handleOtpChange = (e, index) => {
          const value = e.target.value;
          const newOtp = [...otp];

          if (value.length <= 1) {
               newOtp[index] = value;
               setOtp(newOtp);
          }

          // If next input exists and current value is not empty, move focus
          if (value && index < otp.length - 1) {
               inputRefs.current[index + 1].removeAttribute("disabled");
               inputRefs.current[index + 1].focus();
          }
     };

     const handleBackspace = (e, index) => {
          if (e.key === 'Backspace' && index > 0) {
               const newOtp = [...otp];
               newOtp[index] = '';
               setOtp(newOtp);

               inputRefs.current[index].setAttribute("disabled", true);
               inputRefs.current[index - 1].focus();
          }
     };

     useEffect(() => {
          // Focus the first input on component mount
          // inputRefs.current[0].focus();
     }, []);

     const verifyOtp = async () => {
          const enteredOtp = otp.join('');
          try {
               const response = await fetch('http://localhost:1500/login/verify-otp', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, otp: enteredOtp }),
               });

               const res = await response.json();
               if (response.ok) {
                    showAlert(res.message);
                    setShowOTP(false);
                    setLoading(true);
                    setTimeout(() => {
                         navigate('/'); // Redirect to home page after successful OTP verification
                    }, 2000);
               } else {
                    showAlert(res.message);
                    console.error('OTP verification failed:', res.message);
               }
          } catch (error) {
               console.error('Error during OTP verification:', error);
          }
     };

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
                              <input type="submit" value="Login" className="btn solid" />
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
                              <input type="submit" className="btn" value="Sign up" />
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
                         <img src="img/register.png" className="image" alt="Sign up illustration" />
                    </div>

                    <div className="panel right-panel">
                         <div className="content">
                              <h3>One of us?</h3>
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                              <button className="btn transparent" id="sign-in-btn" onClick={toggleClass}>
                                   Sign in
                              </button>
                         </div>
                         <img src="img/register.png" className="image" alt="Sign in illustration" />
                    </div>
               </div>

               {showOTP && (
                    <div className="overlay">
                         <div className="otp-popup">
                              <h4>Enter OTP Code</h4>
                              <div className="input-field">
                                   {otp.map((value, index) => (
                                        <input
                                             key={index}
                                             type="text"
                                             value={value}
                                             ref={(el) => (inputRefs.current[index] = el)}
                                             onChange={(e) => handleOtpChange(e, index)}
                                             onKeyDown={(e) => handleBackspace(e, index)}
                                             disabled={index !== 0 && otp[index - 1] === ''} // Disable inputs until the previous one is filled
                                             className="otp-input"
                                        />
                                   ))}
                              </div>

                              <button className="btn solid" onClick={verifyOtp}>
                                   Verify OTP
                              </button>
                         </div>
                    </div>
               )}
               {loading && (
                    <div className="overlay">
                         <div className="loader"></div>
                    </div>
               )}
          </div>
     );
}
