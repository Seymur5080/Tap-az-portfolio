import axios from "axios";

// API FOR REGISTRATION
export const apiSignUp = async (newUser) => {
	let { data } = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBFXfnijar3E5M3tBtF4pTy3gOtrFfes8A',
		{ email: newUser.email, password: newUser.password, returnSecureToken: true });
	return data;
}

// API FOR RANDOM IMAGE IN BUTTON
export const apiRandomImage = async () => {
	let data = await axios.get('https://source.unsplash.com/random');
	return data.request.responseURL;
}

// API FOR CREATE TABLE IN FIREBASE(REALTIME DATABASE)
export const apiTableInDB = async (newProduct) => {
	let data = await axios.post('https://admin-panel4-9a6e8-default-rtdb.firebaseio.com/products.json', newProduct);
	return data;
}

// API FOR SIGN IN
export const apiSignIn = async (newUser) => {
	let { data } = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBFXfnijar3E5M3tBtF4pTy3gOtrFfes8A',
		{ email: newUser.email, password: newUser.password, returnSecureToken: true });
	return data;
}

// API FOR LIST PRODUCTS
export const apiListProduct = async () => {
	const { data } = await axios.get('https://admin-panel4-9a6e8-default-rtdb.firebaseio.com/products.json');
	const newData = [];
	for (let key in data) {
		data[key].id = key;
		newData.push(data[key]);
	}
	return newData;
}

// API FOR UPDATE PRODUCTS(EDIT)
export const apiBeforeEdit = async (id) => {
	let { data } = await axios.get(`https://admin-panel4-9a6e8-default-rtdb.firebaseio.com/products/${id}.json`);
	data.id = id;
	return data;
}

export const apiAfterEdit = async (newProducts) => {
	let { data } = await axios.put(`https://admin-panel4-9a6e8-default-rtdb.firebaseio.com/products/${newProducts.id}.json`,
		newProducts.values);
	return data;
}

// API FOR DELETE PRODUCTS
export const apiDeleteProducts = async (id) => {
	let { data } = await axios.delete(`https://admin-panel4-9a6e8-default-rtdb.firebaseio.com/products/${id}.json`);
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

// API FOR UPDATE CATEGORY(EDIT)
export const apiCategoryBeforeEdit = async (id) => {
	let { data } = await axios.get(`https://admin-panel4-9a6e8-default-rtdb.firebaseio.com/category/${id}.json`);
	return data;
}