import React, {useReducer} from 'react';
import OrderContext from './OrderContext';
import {COUNT_PRODUCT, SELECT_CLIENT, SELECT_PRODUCT, UPDATE_TOTAL} from "../../types";
import OrderReducer from "./OrderReducer";

const OrderState = ({children}) => {
    // state
    const initialState = {
        client: {},
        products: [],
        total: 0
    }

    const [state, dispatch] = useReducer(OrderReducer, initialState);

    const addClient = (client) => {
        dispatch({type: SELECT_CLIENT, payload: client})
    }

    const addProducts = selectedProducts => {
        let newState;

        if (state.products.length > 0) {
            newState = selectedProducts.map(product => {
                const newProduct = state.products.find(productState => productState.id === product.id);
                return {
                    ...product, ...newProduct
                }
            })
        } else {
            newState = selectedProducts;
        }
        dispatch({type: SELECT_PRODUCT, payload: newState});
    }

    const countProducts = newProduct => {
        dispatch({type: COUNT_PRODUCT, payload: newProduct});
    }

    const updateTotal = () => {
        dispatch({type: UPDATE_TOTAL});
    }

    return (
        <OrderContext.Provider value={{
            products: state.products,
            total: state.total,
            client: state.client,
            addClient,
            addProducts,
            countProducts,
            updateTotal
        }}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderState;
