import React, {useEffect, useState, useContext} from 'react';
import Select from 'react-select';
import {useQuery} from "@apollo/client";
import {GET_PRODUCTS} from "../../graphql/queries";
import OrderContext from "../../context/orders/OrderContext";

const AssignProducts = () => {
    const [products, setProducts] = useState([]);
    const context = useContext(OrderContext);
    const {addProducts} = context;
    const {data, loading, error} = useQuery(GET_PRODUCTS);

    useEffect(() => {
        addProducts(products);
    }, [products])

    const handleChange = value => {
        setProducts(value);
    }

    if (loading) return null;

    const {getProducts} = data;
    return (
        <div>
            <p className="mt-2 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">2.-
                Selecciona los productos</p>
            <Select
                isMulti
                isLoading={loading}
                className="mt-3"
                options={getProducts}
                onChange={handleChange}
                getOptionValue={options => options.id}
                getOptionLabel={options => `${options.name} - ${options.stock} disponibles`}
                placeholder="Busque o seleccione productos"
                noOptionsMessage={() => "No hay resultados"}
            />
        </div>
    );
};

export default AssignProducts;
