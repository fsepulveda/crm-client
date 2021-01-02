import React, {useContext, useState, useEffect} from 'react';
import OrderContext from "../../context/orders/OrderContext";

const ProductSummary = ({product}) => {
    const {name, price} = product
    const context = useContext(OrderContext);
    const {countProducts, updateTotal} = context;
    const [count, setCount] = useState(0)

    const handleChange = e => {
        setCount(e.target.value);
    }

    useEffect(() => {
        updateProduct();
        updateTotal();
    }, [count]);
    const updateProduct = () => {
        const newProduct = {...product, count: Number(count)};
        countProducts(newProduct);
    }

    return (
        <div>
            <div className="md:flex md:justify-between md:items-center mt-5">
                <div className="md:w-2/4 mb-2 mb:mb-0">
                    <p className="text-sm">{name}</p>
                    <p>$ {price}</p>
                </div>
                <input type="number" placeholder="Cantidad"
                       onChange={handleChange}
                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none md:ml-4"/>
            </div>

        </div>
    );
};

export default ProductSummary;
