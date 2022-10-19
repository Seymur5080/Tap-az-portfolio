import { actionType } from "./type/actionType";
import axios from "axios";

const viewProducts = (data) => {
	return {
		type: actionType.View_Products,
		payload: data,
	}
}

export const viewProductsInDB = (id) => {
	return dispatch => {
		axios.get(`https://admin-panel4-9a6e8-default-rtdb.firebaseio.com/products/${id}.json`)
			.then(({ data }) => {
				data.id = id;
				dispatch(viewProducts(data));
			})
	}
}