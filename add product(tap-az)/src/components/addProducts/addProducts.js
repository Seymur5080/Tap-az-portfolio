import React, { useState } from "react";
import { useFormik } from "formik";
import validationSchema from "./validation";
import { apiRandomImage, apiTableInDB, apiGetCategory } from "../../api";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useQuery } from "react-query";
import DefaultImage from '../../image/default_image.jpg';
import LoadingImage from '../../image/Loading.gif';

const AddProducts = () => {
	const [viewDownCategory, setViewDownCategory] = useState('');
	const [image, setImage] = useState(DefaultImage);

	let mom = moment().format('LLL');

	let navigator = useNavigate();

	const randomImage = async () => {
		setImage(LoadingImage);
		let getImage = await apiRandomImage();
		values.image = getImage;
		setImage(getImage);
	}

	const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
		initialValues: {
			title: '',
			context: '',
			price: '',
			image: '',
			status: 0,
			time: mom,
			favoriteProduct: 0,
			mainCategory: '',
			downCategory: '',
		},
		validationSchema,
		onSubmit: async (values, { resetForm }) => {
			await apiTableInDB(values);
			resetForm({ values: '' });
			navigator('/listProducts');
			console.log(values)
		},
	});

	const { isLoading, error, data } = useQuery('Add_Category', apiGetCategory);

	if (isLoading) return 'Loading...';

	if (error) return 'An error has occurred: ';

	const topCategory = data.filter(item => {
		return item.topMenu == 0;
	})

	const downCategoryFunction = (e) => {
		let newData = data.filter(item => {
			return item.topMenu == e.target.value;
		})
		setViewDownCategory(newData);
	}

	return (
		<div>
			<div className="row pt-5">
				<div className="col-6 offset-3">
					<main className="form-signin">
						<form onSubmit={handleSubmit}>
							<h1 className="h3 mb-3 fw-normal">Add Products</h1>
							<div className="mb-3">
								<select
									className='form-control'
									name='mainCategory'
									onChange={handleChange}
									value={values.mainCategory}
									onInput={downCategoryFunction}
								>
									<option selected>Kategoriya seçin</option>
									{
										topCategory.map((item, i) => (
											<option key={i} value={item.id}>{item.category}</option>
										))
									}
								</select>
							</div>
							{
								viewDownCategory &&
								<div className='mb-3'>
									<select
										className='form-control'
										name="downCategory"
										onChange={handleChange}
										value={values.downCategory}
									>
										<option selected>Kategoriya seçin</option>
										{
											viewDownCategory.map((item, i) => (
												<option key={i} value={item.id}>{item.category}</option>
											))
										}
									</select>
								</div>
							}
							<div className="form-floating mb-3">
								<input
									type="text"
									name="title"
									className={`form-control ${touched.title && errors.title && 'is-invalid'} ${touched.title && !errors.title && 'is-valid'}`}
									placeholder="title"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.title}
								/>
								<label htmlFor="floatingInput">Title</label>
							</div>
							<div className="form-floating mb-3">
								<input
									type="text"
									name="context"
									className={`form-control ${touched.context && errors.context && 'is-invalid'} ${touched.context && !errors.context && 'is-valid'}`}
									placeholder="context"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.context}
								/>
								<label htmlFor="floatingInput">Context</label>
							</div>
							<div className="form-floating mb-3">
								<input
									type="number"
									name="price"
									className={`form-control ${touched.price && errors.price && 'is-invalid'} ${touched.price && !errors.price && 'is-valid'}`}
									placeholder="name@example.com"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.price}
								/>
								<label htmlFor="floatingInput">Price</label>
							</div>
							<div className='form-floating mb-3 d-flex justify-content-between align-items-center'>
								<button
									className='btn btn-warning'
									type='button'
									onClick={randomImage}>Random image
								</button>
								<div className="image_div">
									<img src={image} width='100%' alt="" />
								</div>
							</div>

							<button className="w-100 btn btn-lg btn-primary" type="submit">Add</button>
						</form>
					</main>
				</div>
			</div>
		</div>
	)
}

export default AddProducts;