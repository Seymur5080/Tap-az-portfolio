import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../context/authContext";

const Navbar = () => {
    const {isLogin, logout} = useContext(AuthContext);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
                            <li className="nav-item">
                                {isLogin && <NavLink to='/' className="nav-link active" aria-current="page"
                                                     href="#">Home</NavLink>}
                            </li>
                            <li className="nav-item">
                                {isLogin &&
                                    <NavLink to='/addProducts' className="nav-link active" aria-current="page"
                                             href="#">Add Products</NavLink>}
                            </li>
                            <li className="nav-item">
                                {isLogin &&
                                    <NavLink to='/listProducts' className="nav-link active" aria-current="page"
                                             href="#">List Products</NavLink>}
                            </li>
                            <li className="nav-item">
                                {!isLogin &&
                                    <NavLink to='/signIn' className="nav-link active" aria-current="page" href="#">Sign
                                        In</NavLink>}
                                {isLogin &&
                                    <button type='button' className='btn btn-danger' onClick={logout}>Logout</button>}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;