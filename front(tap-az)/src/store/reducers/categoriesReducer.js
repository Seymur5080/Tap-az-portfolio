import {actionType} from "../actions/type/actionType";

const initialState = {
    categories: [],
}

const categoriesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionType.Get_Categories :
            return {...state, categories: payload};
        default :
            return state;
    }
}

export default categoriesReducer;