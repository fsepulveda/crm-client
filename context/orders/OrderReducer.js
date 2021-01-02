import {COUNT_PRODUCT, SELECT_CLIENT, SELECT_PRODUCT, UPDATE_TOTAL} from "../../types";

export default (state, action) => {
    switch (action.type) {
        case SELECT_CLIENT: {
            return {...state, client: action.payload};
        }
        case SELECT_PRODUCT: {
            return {...state, products: action.payload}
        }
        case COUNT_PRODUCT: {
            return {
                ...state,
                products: state.products.map(product => product.id === action.payload.id ? product = action.payload : product)
            }
        }
        case UPDATE_TOTAL: {
            return {
                ...state,
                total: state.products.reduce((acc, product) => acc += product.price * product.count, 0)
            }
        }
        default:
            return state;
    }
}
