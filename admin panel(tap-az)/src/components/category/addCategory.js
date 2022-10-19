import React, {useEffect, useState} from "react";
import {useFormik} from 'formik';
import {apiAddCategory, apiGetCategory, apiDeleteClickCategory, apiDeleteTopCategory, apiListProducts, updateProductWithCatId} from "../../api";
import {useQuery} from "react-query";

const AddCategory = () => {
    const {handleSubmit, handleChange, values} = useFormik({
        initialValues: {
            category: '',
            topMenu: 0,
        },
        onSubmit: async (values) => {
            await apiAddCategory(values);
            console.log(values)
        },
    });

    const {isLoading, error, data} = useQuery('AddCategory', apiGetCategory);
    const {isLoading: isLoadingProduct, error: errorProduct, data: dataProduct} = useQuery('GetProduct', apiListProducts);

    const [category, setCategory] = useState(data);

    useEffect(() => {
        setCategory(data);
    }, [data])

    if (isLoading) return 'Loading...';

    if (error) return 'An error has occurred: ';

    if (isLoadingProduct) return 'Loading...';

    if (errorProduct) return 'An error has occurred: ';

    console.log(data)
    console.log(dataProduct)

    const deleteCategory = (id) => {
        let clickCategory = category.find(item => {
            return item.id === id;
        })
        if (clickCategory.topMenu === 0) {
            let findTopMenuCategory = category.filter(item => {
                return item.topMenu == clickCategory.id;
            });
            apiDeleteClickCategory(id);
            apiDeleteTopCategory(findTopMenuCategory);
        } else {
            apiDeleteClickCategory(id);
        }

        let newCategory = category.filter(item => {
            return item.topMenu != id && item.id != id;
        })
        setCategory(newCategory);

        let newDataProduct = dataProduct.filter(item => {
            return item.mainCategory == id || item.downCategory == id;
        })
        for(let i = 0; i < newDataProduct.length; i++) {
            newDataProduct[i].status = 0;
        }
        updateProductWithCatId(newDataProduct);
    }

    return (
        <div>
            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Kind</th>
                        <th scope="col">Operation</th>
                        <th scope="col">
                            <button
                                type="button"
                                className="btn btn-primary btn_category"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >Add category
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        category && category.map((item, i) => (
                            <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>{item.category}</td>
                                <td>
                                    {item.topMenu == 0 && <p>Ust kategoriyadır</p>}
                                    {item.topMenu !== 0 && <p>Alt kategoriyadır</p>}
                                </td>
                                <td>
                                    <button className='btn btn-warning m-1'>Edit</button>
                                    <button
                                        className='btn btn-danger m-1'
                                        onClick={() => {
                                            deleteCategory(item.id)
                                        }}
                                    >Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>

                {/*MODAL FOR ADD CATEGORY*/}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <input
                                        className='form-control'
                                        placeholder='Add category'
                                        name="category"
                                        onChange={handleChange}
                                        value={values.category}
                                    />
                                    <select
                                        className='form-control mt-3'
                                        name="topMenu"
                                        onChange={handleChange}
                                        value={values.topMenu}>
                                        <option value="0">Ust Kategoriya</option>
                                        {
                                            category && category.map((item, i) => (
                                                item.topMenu == 0 &&
                                                <option key={i} value={item.id}>{item.category}</option>
                                            ))
                                        }
                                    </select>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <form onSubmit={handleSubmit}>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        data-bs-dismiss="modal">Add</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCategory;