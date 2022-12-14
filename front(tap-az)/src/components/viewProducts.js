import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {viewProductsInDB} from "../store/actions/actionViewProducts";
import {useParams} from "react-router-dom";

const ViewProducts = () => {
    let {id} = useParams();

    const viewProducts = useSelector(state => state.allViewProducts.viewProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(viewProductsInDB(id));
    }, [])

    return (
        <div>
            <div className="view-products">
                <div className="view-products_coteqories-title">
                    <div className="container"></div>
                </div>
                <div className="view-products_image">
                    <div className="container">
                        <div className="view-products_image-container">
                            <img src={viewProducts.image} alt=""/>
                        </div>
                    </div>
                </div>
                <div className="view-products_context-title">
                    <div className="container">
                        <div className="view-products_context-title_flex">
                            <div className="price">
                                <div className="price-width">
                                    <div className="price-width_position">
                                        <span className='price-one'>{viewProducts.price}</span>
                                        <span className='price-two'>azn</span>
                                    </div>
                                </div>
                            </div>
                            <div className="title">
                                <h1>{viewProducts.title}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="view-products_context-body">
                    <div className="container d-flex">
                        <aside className='aside'>
                            <div className="author">
                                <a className="author_phone" href="">(070) 684-36-36</a>
                                <div className="author_name">Seymur</div>
                                <a className="author_profile" href="">??stifad????inin b??t??n elanlar??</a>
                            </div>
                            <button className="message">
                                <i className="fa-solid fa-comment-dots"></i>Mesaj yaz
                            </button>
                            <div className="time">
                                <p>Elan??n n??mr??si:33548678</p>
                                <p>Bax????lar??n say??: 231</p>
                                <p>Yenil??ndi: Bug??n, 12:08</p>
                            </div>
                            <div className="bookmaking">
                                <i className="fa-solid fa-heart"></i><a href="">Se??ilmi??l??r?? ??lav?? et</a>
                            </div>
                            <div className="report">
                                <i className="fa-solid fa-flag"></i><a href="">Elandan ??ikay??t et</a>
                            </div>
                        </aside>
                        <main className="main">
                            <table className="table">
                                <tbody>
                                <tr>
                                    <th scope="col">N??mun??</th>
                                    <th scope="col">N??mun??</th>
                                </tr>
                                <tr>
                                    <th scope="col">N??mun??</th>
                                    <th scope="col">N??mun??</th>
                                </tr>
                                <tr>
                                    <th scope="col">N??mun??</th>
                                    <th scope="col">N??mun??</th>
                                </tr>
                                <tr>
                                    <th scope="col">N??mun??</th>
                                    <th scope="col">N??mun??</th>
                                </tr>
                                <tr>
                                    <th scope="col">N??mun??</th>
                                    <th scope="col">N??mun??</th>
                                </tr>
                                </tbody>
                            </table>
                            <p className="text">{viewProducts.context}</p>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProducts;

