import React, {useState} from "react";
import {useQuery} from "react-query";
import {apiListProducts} from "../api";
import { useFormik } from 'formik';
import {apiUpdateStatusInDB} from "../api";

const ListProducts = () => {
    const [newView, setNewView] = useState('');
    const [product, setProduct] = useState('');


    const {handleSubmit, handleChange, values} = useFormik({
        initialValues: {
            status: 0,
        },
        onSubmit: async (values) => {
            product.status = values.status;
            await apiUpdateStatusInDB(product);
        },
    });

    const {isLoading, error, data} = useQuery('repoData', apiListProducts);

    if (isLoading) return 'Loading...';

    if (error) return 'An error has occurred: ';

    const viewProduct = (id) => {
        let newData = data.find(item => {
            return item.id == id;
        });
        setNewView(newData);
    }

    const statusProduct = (id) => {
        let newData = data.find(item => {
            return item.id == id;
        });
        setProduct(newData);
    }

    return (
        <div>
            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Number</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Image</th>
                        <th scope="col">Status</th>
                        <th scope="col">Operation</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td><img width='100px' src={item.image} alt=""/></td>
                                <td>
                                    {
                                        item.status == 0 &&
                                        <button
                                            type="button"
                                            className="btn btn-warning"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModalStatus"
                                            onClick={() => {
                                                statusProduct(item.id)
                                            }}
                                        >Gözləmədədir
                                        </button>
                                    }
                                    {
                                        item.status == 1 &&
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModalStatus"
                                            onClick={() => {
                                                statusProduct(item.id)
                                            }}
                                        >Aktivdir
                                        </button>
                                    }
                                    {
                                        item.status == 2 &&
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModalStatus"
                                            onClick={() => {
                                                statusProduct(item.id)
                                            }}
                                        >Ləğv olunub
                                        </button>
                                    }
                                </td>
                                <td>
                                    <button
                                        className='btn btn-info'
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => {
                                            viewProduct(item.id)
                                        }}
                                    >View
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                {/*MODAL FOR VIEW*/}
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
                                <h3>{newView.title}</h3>
                                <h6>{newView.price}</h6>
                                <p>{newView.context}</p>
                                <img width='100%' src={newView.image} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>

                {/*MODAL FOR STATUS*/}
                <div className="modal fade" id="exampleModalStatus" tabIndex="-1" aria-labelledby="exampleModalLabel"
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
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="status"
                                            id="status0"
                                            value='0'
                                            checked={values.status == 0}
                                            onChange={handleChange}
                                        />
                                            <label className="form-check-label" htmlFor="status0">
                                                Gözləmə
                                            </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="status"
                                            id="status1"
                                            value='1'
                                            checked={values.status == 1}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="status1">
                                            Aktiv et
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="status"
                                            id="status2"
                                            value='2'
                                            checked={values.status == 2}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="status2">
                                            Ləğv et
                                        </label>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            data-bs-dismiss="modal"
                                        >Save changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListProducts;

