import React, {useContext} from 'react';
import OrderContext from "../../context/orders/OrderContext";
import ProductSummary from "./ProductSummary";

const OrderSummary = () => {
    const context = useContext(OrderContext);
    const {products} = context
    return (
        <div>
            <p className="mt-2 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">3.- Asigna
                cantidades de los productos</p>

            {products.length > 0 ? <>
                {products.map(product => <ProductSummary key={product.id} product={product}/>)}
            </> : (<p className="mt-5 text-sm">No hay productos</p>)}

        </div>
    );
};

export default OrderSummary;
