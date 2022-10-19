import { actionType } from "./type/actionType";
import axios from "axios";

const getProducts = (data) => {
	return {
		type: actionType.Get_Products,
		payload: data,
	}
}

export const getProductsInDB = () => {
	return dispatch => {
		axios.get('https://admin-panel4-9a6e8-default-rtdb.firebaseio.com/products.json')
			.then(({ data }) => {
				let newData = [];
				for (let key in data) {
					data[key].id = key;
					newData.push(data[key]);
				}
				dispatch(getProducts(newData));
			})
	}
}