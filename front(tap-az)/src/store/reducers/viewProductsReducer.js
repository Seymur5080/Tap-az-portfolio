import {actionType} from "../actions/type/actionType";

const initialState = {
    viewProducts: []
}

const viewProductsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionType.View_Products :
            return {...state, viewProducts: payload}
        default :
            return state;
    }
}

export default viewProductsReducer;