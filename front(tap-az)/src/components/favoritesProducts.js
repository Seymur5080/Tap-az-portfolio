import React, {useEffect, useState} from "react";

const FavoritesProducts = () => {
    const [productLS, setProductLS] = useState();

    useEffect(() => {
        setProductLS(JSON.parse(localStorage.getItem('productLocalStorage')));
    }, [productLS])

    const deleteFavorite = (i) => {
        productLS.splice(i, 1);
        localStorage.setItem('productLocalStorage', JSON.stringify(productLS));
    }

    return (
        <div>
            <section className="products">
                <div className="container">
                    <div className="row">
                        {
                            productLS && productLS.map((item, i) => (
                                item.favoriteProduct == 1 &&
                                <div className="col-md-3 mb-3">
                                    <div className="product">
                                        <div className="product_image">
                                            <img src={item.image} alt=""/>
                                            <div className="product_image_store">
                                                <i onClick={() => {
                                                    deleteFavorite(i)
                                                }} className="fa-solid fa-xmark image_favorite"></i>
                                            </div>
                                        </div>
                                        <div className="product_price">
                                            <span className="product_price_val">{item.price}</span>
                                            <span className="product_price_cur">AZN</span>
                                        </div>
                                        <div className="product_name">{item.title}</div>
                                        <div className="product_created">{item.date}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FavoritesProducts;