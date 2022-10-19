import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {Context} from "../context/context";

const Navbar = () => {
    const {isLogin, logout} = useContext(Context);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {!isLogin && <NavLink to='/signIn' className="nav-link active" aria-current="page" href="#">Sign
                                    In</NavLink>}
                            </li>
                            <li className="nav-item">
                                {isLogin && <NavLink to='/' className="nav-link active" aria-current="page"
                                                     href="#">Home</NavLink>}
                            </li>
                            <li className="nav-item">
                                {isLogin && <NavLink to='/listProducts' className="nav-link active" aria-current="page"
                                                     href="#">List Products</NavLink>}
                            </li>
                            <li className="nav-item">
                                {isLogin && <NavLink to='/addCategory' className="nav-link active" aria-current="page"
                                                     href="#">Add Category</NavLink>}
                            </li>
                            <li className="nav-item">
                                {isLogin && <button className='btn btn-danger' onClick={logout}>Logout</button>}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;