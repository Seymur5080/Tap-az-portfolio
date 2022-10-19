import React, {useState, useEffect} from "react";
import {apiListProduct, apiDeleteProducts} from "../../api";
import {useQuery} from "react-query";
import {Link} from "react-router-dom";

const ListProducts = () => {
    const [newView, setNewView] = useState('');

    const {isLoading, error, data} = useQuery('repoData', apiListProduct);

    const [products, setProducts] = useState(data);

    useEffect(() => {
        setProducts(data);
    }, [data]);

    if (isLoading) return 'Loading...';

    if (error) return 'An error has occurred: ';

    // FUNCTION FOR VIEW PRODUCT IN LIST PRODUCTS
    const viewProduct = (id) => {
        let newId = products.find(item => {
            return item.id == id;
        });
        setNewView(newId);
    }

    // FUNCTION FOR DELETE PRODUCT IN LIST PRODUCTS
    const deleteProduct = (id) => {
        apiDeleteProducts(id);
        let productsFilter = products.filter(item => {
            return item.id != id;
        });
        setProducts(productsFilter);
    }

    return (
        <div>
            <div className='container pt-5'>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Number</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Image</th>
                        <th scope="col">Status</th>
                        <th scope="col">Operation</th>
                        <th scope="col">Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products && products.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td><img width='100px' src={item.image} alt=""/></td>
                                <td>
                                    {item.status == 0 && <p style={{color: "orange"}}>Gözləmədədir</p>}
                                    {item.status == 1 && <p style={{color: "green"}}>Aktiv olundu</p>}
                                    {item.status == 2 && <p style={{color: "red"}}>Ləğv olundu</p>}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary ms-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => {
                                            viewProduct(item.id)
                                        }}
                                    >View
                                    </button>
                                    <Link to={`/edit/${item.id}`}>
                                        <button
                                            type="button"
                                            className="btn btn-warning ms-2"
                                        >Edit
                                        </button>
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn btn-danger ms-2"
                                        onClick={() => {
                                            deleteProduct(item.id)
                                        }}
                                    >Delete
                                    </button>
                                </td>
                                <td>{item.time}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>


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
            </div>
        </div>
    )
}

export default ListProducts;