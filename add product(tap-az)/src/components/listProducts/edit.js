import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {Formik} from "formik";
import {useQuery} from "react-query";
import {apiBeforeEdit, apiAfterEdit, apiGetCategory} from "../../api";
import {useNavigate} from "react-router-dom";

const Edit = () => {
    const [category, setCategory] = useState('');
    // const [topC, setTopC] = useState('');
    // const [downC, setDownC] = useState('');

    let navigator = useNavigate();

    let {id} = useParams();

    //product
    const {isLoading, error, data} = useQuery(['products', id], () => apiBeforeEdit(id));

    //category
    const {
        isLoading: isLoadingCategory,
        error: errorCategory,
        data: dataCategory
    } = useQuery('getCategory', apiGetCategory);

    //product
    if (isLoading) return 'Loading...';
    if (error) return 'An error has occurred: ';

    //category
    if (isLoadingCategory) return 'Loading...';
    if (errorCategory) return 'An error has occurred: ';

    const topCategory = dataCategory.filter(item => {
        return item.topMenu === 0;
    })

    const downCategory = (e) => {
        let newDataCategory = dataCategory.filter(item => {
            return item.topMenu === e.target.value;
        })
        setCategory(newDataCategory);
    }

    return (
        <div>
            <div className='container'>
                <h1 className='mb-3 mt-3'>Update</h1>
                <Formik
                    initialValues={
                        {
                            title: data.title,
                            price: data.price,
                            context: data.context,
                            image: data.image,
                            status: 0,
                            mainCategory: data.mainCategory,
                            downCategory: data.downCategory,
                        }
                    }
                    onSubmit={async (values) => {
                        console.log(values)
                        await apiAfterEdit({values, id});
                        navigator('/listProducts');

                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <select
                                className='form-control mb-3'
                                name="mainCategory"
                                onChange={handleChange}
                                onInput={downCategory}
                                value={values.mainCategory}
                            >
                                <option selected>Kategoriyanı seçin</option>
                                {
                                    topCategory && topCategory.map((item, i) => (
                                        <option key={i} value={item.id}>{item.category}</option>
                                    ))
                                }
                            </select>
                            {
                                category &&
                                <select
                                    className='form-control mb-3'
                                    name="downCategory"
                                    onChange={handleChange}
                                    value={values.downCategory}
                                >
                                    <option selected>Kategoriyanı seçin</option>
                                    {
                                        category.map((item, i) => (
                                            <option key={i} value={item.id}>{item.category}</option>
                                        ))
                                    }
                                </select>
                            }
                            <input
                                type="text"
                                name="title"
                                className={`form-control mb-3 ${touched.title && !errors.title && 'is-valid'} ${touched.title && errors.title && 'is-invalid'} `}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title}
                            />
                            <input
                                type="number"
                                name="price"
                                className={`form-control mb-3 ${touched.price && !errors.price && 'is-valid'} ${touched.price && errors.price && 'is-invalid'} `}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price}
                            />
                            <input
                                type="text"
                                name="context"
                                className={`form-control mb-3 ${touched.context && !errors.context && 'is-valid'} ${touched.context && errors.context && 'is-invalid'} `}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.context}
                            />
                            <button
                                className='btn btn-warning me-5'
                                type='button'
                            >Random image
                            </button>
                            <img className='mb-3' width='150px' src={values.image} alt=""/>
                            <button className='btn btn-success d-block mb-3' type="submit">
                                Update
                            </button>
                            <button
                                className='btn btn-danger'
                                onClick={() => {
                                    navigator('/listProducts')
                                }}
                            >List Products
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Edit;