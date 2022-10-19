import {combineReducers} from "redux";
import productsReducer from "./productsReducer";
import viewProductsReducer from "./viewProductsReducer";
import categoriesReducer from "./categoriesReducer";

const rootReducer = combineReducers({
    allProducts: productsReducer,
    allViewProducts: viewProductsReducer,
    allCategories: categoriesReducer,
})

export default rootReducer;