import React, { useState } from 'react';
import { Navbar } from '../components';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateFullName = () => {
    if (!fullName) {
      setFullNameError('Full Name is required');
      return false;
    }
    setFullNameError('');
    return true;
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleRegistration = () => {
    if (validateFullName() && validateEmail() && validatePassword()) {
      localStorage.setItem('fullName', fullName);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      setRegistrationSuccess(true); // Set registration success flag
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Redirect to login after 3 seconds
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Register</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div className="form my-3">
                <label htmlFor="Name">Full Name</label>
                <input
                  type="text"
                  className={`form-control ${fullNameError ? 'is-invalid' : ''}`}
                  id="Name"
                  placeholder="Enter Your Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={validateFullName}
                />
                {fullNameError && <div className="invalid-feedback">{fullNameError}</div>}
              </div>
              <div className="form my-3">
                <label htmlFor="Email">Email address</label>
                <input
                  type="email"
                  className={`form-control ${emailError ? 'is-invalid' : ''}`}
                  id="Email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateEmail}
                />
                {emailError && <div className="invalid-feedback">{emailError}</div>}
              </div>
              <div className="form my-3">
                <label htmlFor="Password">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    id="Password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={validatePassword}
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                {passwordError && <div className="invalid-feedback">{passwordError}</div>}
              </div>
              <div className="my-3">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="text-decoration-underline text-info">
                    Login
                  </Link>{' '}
                </p>
              </div>
              <div className="text-center">
                <button
                  className="my-2 mx-auto btn btn-dark"
                  type="button"
                  onClick={handleRegistration}
                  disabled={fullNameError || emailError || passwordError}
                >
                  Register
                </button>
              </div>
              {registrationSuccess && (
                <div className="alert alert-success text-center mt-3">
                  Registration successful! Redirecting to login page...
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

