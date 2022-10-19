import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getProductsInDB} from "../store/actions/actionProducts";
import {Link} from "react-router-dom";

const Products = () => {
    const products = useSelector(store => store.allProducts.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsInDB());
    }, [products])

    const addFavorite = (id) => {
        let newProducts = products.find(item => {
            return item.id == id;
        })
        newProducts.favoriteProduct = 1;

        let productLocalStorage;
        if (localStorage.getItem('productLocalStorage') === null) {
            productLocalStorage = [];
        } else {
            productLocalStorage = JSON.parse(localStorage.getItem('productLocalStorage'));
        }
        productLocalStorage.push(newProducts);
        localStorage.setItem('productLocalStorage', JSON.stringify(productLocalStorage));
    }

    let newProductLocalStorage = JSON.parse(localStorage.getItem('productLocalStorage'));

    const deleteFavorite = (i) => {
        newProductLocalStorage.splice(i, 1);
        localStorage.setItem('productLocalStorage', JSON.stringify(newProductLocalStorage));
    }


    return (
        <div>
            {/*-- --------------- PRODUCTS --------------- --*/}
            <section className="products">
                <div className="container">
                    <div className="row">
                        {
                            products && products.map((item, i) => (

                                item.status == 1 &&

                                <div className="col-md-3 mb-3" key={i}>

                                    <div className="product">
                                        <div className="product_image">
                                            <Link to={`/viewProducts/${item.id}`}> <img src={item.image} alt=""/> </Link>
                                            <div className="product_image_store">
                                                {
                                                    newProductLocalStorage && newProductLocalStorage.map((data, i) => {
                                                        return data.id == item.id && data.favoriteProduct == 1 &&
                                                            <i onClick={() => {
                                                                deleteFavorite(i)
                                                            }
                                                            } className="fa-solid fa-heart heart-color"></i>
                                                    })
                                                }

                                                {
                                                    item.favoriteProduct == 0 && <i onClick={() => {
                                                        addFavorite(item.id)
                                                    }} className="fa-solid fa-heart"></i>
                                                }
                                            </div>
                                        </div>
                                        <div className="product_price">
                                            <span className="product_price_val">{item.price}</span>
                                            <span className="product_price_cur">AZN</span>
                                        </div>
                                        <div className="product_name">{item.title}</div>
                                        <div className="product_created">{item.time}</div>
                                    </div>

                                </div>

                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;