import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    // Get the cart state from Redux store
    const state = useSelector(state => state.handleCart);

    return (
        // Navigation bar
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                {/* Brand logo */}
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">PC Builder</NavLink>
                {/* Mobile navigation toggle button */}
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation links */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product" style={{ fontSize: '1.1em' }}>Shop</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about" style={{ fontSize: '1.1em' }}>About Us</NavLink>
                        </li>
                    </ul>

                    {/* Login and Cart buttons */}
                    <div className="buttons text-center">
                        {/* Login button */}
                        <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Register </NavLink>
                        {/* Cart button displaying the number of items in the cart */}
                        <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

