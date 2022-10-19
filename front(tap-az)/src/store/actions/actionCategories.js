import { actionType } from "./type/actionType";
import axios from "axios";

const GetCategories = (data) => {
	return {
		type: actionType.Get_Categories,
		payload: data,
	}
}

export const GetCategoriesInDB = () => {
	return dispatch => {
		axios.get('https://admin-panel4-9a6e8-default-rtdb.firebaseio.com/category.json')
			.then(({ data }) => {
				let newData = [];
				for (let key in data) {
					data[key].id = key;
					newData.push(data[key]);
				}
				dispatch(GetCategories(newData));
			})
	}
}