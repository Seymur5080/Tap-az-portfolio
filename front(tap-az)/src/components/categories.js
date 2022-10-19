import React, {useState,useEffect} from 'react';
import imgHouse from '../image/categories/house.svg';
import {useSelector, useDispatch} from "react-redux";
import {GetCategoriesInDB} from "../store/actions/actionCategories";
import {getProductsInDB} from "../store/actions/actionProducts";
import {Link} from "react-router-dom";

const Categories = () => {
    const [stateCategory, setStateCategory] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [downCategory, setDownCategory] = useState('');
    const [downLengthCategory, setDownLengthCategory] = useState('');

    const category = useSelector(state => state.allCategories.categories);
    const dispatchCategory = useDispatch();

    const products = useSelector(store => store.allProducts.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsInDB());
    }, [products])

    useEffect(() => {
        dispatchCategory(GetCategoriesInDB(), setStateCategory(newCategory));
    }, [category]);

    const newCategory = category.filter((item => {
        return item.topMenu === 0;
    }))

    const lowCategories = (id) => {
        setCategoryId(id);

        let findDownCategory = category.filter(item => {
            return item.top == id;
        })
        setDownCategory(findDownCategory);

        findDownCategory.map(data => {
            const lengthCategory = products.filter(item => {
                return item.downCategory == data.id && item.status == 1;
            })
            data.count = lengthCategory.length;
        })

        const allLengthCategory = products.filter(item => {
            return item.mainCategory == id && item.status == 1;
        })
        setDownLengthCategory(allLengthCategory);
    }

    let categoryCard = document.querySelectorAll('.categories-card');
    // activ clasini her bir category card ucun gezdirirem
    categoryCard.forEach((item) => {
        item.addEventListener('click', function () {
            categoryCard.forEach(cat => cat.classList.remove('akt'));
            this.classList.add('akt');
            document.querySelector('.card-flex_active').classList.add('active');
        })
    })

    // akt olan clasi tapib hem akti hemde active silirem
    let activCategory = document.querySelector('.akt');
    if (activCategory) {
        activCategory.addEventListener('click', function () {
            document.querySelector('.card-flex_active').classList.remove('active');
            this.classList.remove('akt')
        })
    }

    return (
        <div>
            {/*-- --------------- CATEGORIES --------------- --*/}
            <section className="categories">
                <div className="container">
                    <div className="card-flex">
                        {stateCategory &&
                            stateCategory.map((item, i) => (
                                item.topMenu == 0 &&
                                <div
                                    className="categories-card"
                                    key={i}
                                    onClick={() => {
                                        lowCategories(item.id)
                                    }}
                                >
                                    <div className="categories_circle">
                                        <img src={imgHouse} alt="" />
                                    </div>
                                    <span className="categories_span">{item.category}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div className='card-flex_active'>
                        <div className="row">
                            {downLengthCategory && <Link to={`/lowproductdata/${categoryId}`}>Butun
                                elanlar({downLengthCategory.length})</Link>}
                            <hr />
                            {downCategory &&
                                downCategory.map((item, i) => (
                                    <div className="col-4 mb-3" key={i}>
                                        <Link to={`/lowproductdata/${item.id}`}>{item.category}({item.count})</Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default Categories;