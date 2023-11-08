import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleLogin = () => {
    if (validateEmail() && validatePassword()) {
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");
      if (email === storedEmail && password === storedPassword) {
        setLoginSuccess(true);
        setLoginError(false);
        setTimeout(() => {
          navigate("/");
        }, 3000); // Redirect to the home page after 3 seconds
      } else {
        setLoginError(true);
        setLoginSuccess(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div className="my-3">
                <label htmlFor="Email">Email address</label>
                <input
                  type="email"
                  className={`form-control ${emailError ? "is-invalid" : ""}`}
                  id="Email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateEmail}
                />
                {emailError && <div className="invalid-feedback">{emailError}</div>}
              </div>
              <div className="my-3">
                <label htmlFor="Password">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${passwordError ? "is-invalid" : ""}`}
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
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                </div>
              </div>
              <div className="my-3">
                <p>
                  New Here?{" "}
                  <Link to="/register" className="text-decoration-underline text-info">
                    Register Now
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center">
                <button
                  className="my-2 mx-auto btn btn-dark"
                  type="button"
                  onClick={handleLogin}
                  disabled={emailError || passwordError}
                >
                  Login
                </button>
              </div>
              {loginSuccess && (
                <div className="alert alert-success text-center mt-3">
                  Login Successful! Redirecting to the home page...
                </div>
              )}
              {loginError && (
                <div className="alert alert-danger text-center mt-3">
                  Login Failed. Please check your credentials.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

