import {actionType} from "../actions/type/actionType";

const initialState = {
    products: []
}

const productsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionType.Get_Products :
            return {...state, products: payload};
        default :
            return state;
    }
}

export default productsReducer;