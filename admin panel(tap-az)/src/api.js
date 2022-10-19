import axios from "axios";

// API FOR SIGN IN
export const apiSignIn = async (newUser) => {
	let { data } = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBFXfnijar3E5M3tBtF4pTy3gOtrFfes8A',
		{ email: newUser.email, password: newUser.password, returnSecureToken: true });
	return data;
}

// API FOR LIST PRODUCTS
export const apiListProducts = async () => {
	let { data } = await axios.get('https://admin-panel4-9a6e8-default-rtdb.firebaseio.com/products.json');
	let newData = [];
	for (let key in data) {
		data[key].id = key;
		newData.push(data[key]);
	}
	return newData;
}

// API FOR UPDATE STATUS IN FIREBASE
export const apiUpdateStatusInDB = async (product) => {
	let data = await axios.put(`https://admin-panel4-9a6e8-default-rtdb.firebaseio.com/products/${product.id}.json`,
		product);
	return data;
}

// API FOR CREATE CATEGORY IN FIREBASE
export const apiAddCategory = async (product) => {
	let { data } = await axios.post('https://admin-panel4-9a6e8-default-rtdb.firebaseio.com/category.json',
		product);
	return data;
}

// API FOR GET CATEGORY IN FIREBASE
export const apiGetCategory = async () => {
	let { data } = await axios.get('https://admin-panel4-9a6e8-default-rtdb.firebaseio.com/category.json');
	let newData = [];
	for (let key in data) {
		data[key].id = key;
		newData.push(data[key]);
	}
	return newData;
}

// API FOR DELETE CLICK CATEGORY IN FIREBASE
export const apiDeleteClickCategory = async (id) => {
	let { data } = await axios.delete(`https://admin-panel4-9a6e8-default-rtdb.firebaseio.com/category/${id}.json`);
	return data;
}

// API FOR DELETE TOP CATEGORY WITH LOW CATEGORY IN FIREBASE
export const apiDeleteTopCategory = async (topCategory) => {
	for (let i = 0; i < topCategory.length; i++) {
		await axios.delete(`https://admin-panel4-9a6e8-default-rtdb.firebaseio.com/${topCategory[i].id}.json`)
	}
}

// API FOR UPDATE
export const updateProductWithCatId = async (category) => {
	let newData = '';
	for (let i = 0; i < category.length; i++) {
		let { data } = await axios.put(`https://admin-panel4-9a6e8-default-rtdb.firebaseio.com/products/${category[i].id}.json`,
			category[i]);
		newData = data;
	}
	return newData;
}