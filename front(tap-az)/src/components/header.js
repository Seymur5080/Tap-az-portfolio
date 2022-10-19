import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div>
            {/*-- --------------- HEADER --------------- --*/}
            <header>
                <div className="header-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 header-top_left">
                                <a href="https://turbo.az/" target="_blank">Turbo.az</a>
                                <a href="https://bina.az/" target="_blank">Bina.az</a>
                                <a href="https://boss.az/" target="_blank">Boss.az</a>
                            </div>
                            <div className="col-md-7 header-top_right">
                                Dəstək:
                                <a className="one-a" href="#">(70) 200-63-03</a>
                                <a href="#">Yardım</a>
                                <a href="#">RU</a>
                                <Link to='/favoritesProducts' href="#" className="four-a">
                                    <i className="fa-solid fa-heart"></i>Seçilmişlər
                                </Link>
                                <a href="#" className="four-a m-0">
                                    <i className="fa-solid fa-circle-user"></i>Giriş
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <nav>
                    <div className="container">
                        <div className="nav-flex">
                            <Link to='/'>tap.az</Link>
                            <div className="nav-flex_category">
                                <i className="fa-solid fa-bars-staggered"></i>
                                <a>Kataloq</a>
                            </div>
                            <div className="nav-flex_search">
                                <input type="text" placeholder="Əşya və ya xidmət axtarışı"/>
                                <div className="nav-flex_button">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    <button>Tap</button>
                                </div>
                            </div>
                            <div className="nav-flex_add">
                                <i className="fa-solid fa-plus"></i>
                                <button>Yeni elan</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Header;