import React, {useEffect, useState, useContext} from 'react';
import Select from 'react-select';
import {useQuery} from "@apollo/client";
import {GET_CLIENTS_BY_SELLER} from "../../graphql/queries";
import OrderContext from "../../context/orders/OrderContext";

const AssignClient = () => {
    const [client, setClient] = useState({});
    const context = useContext(OrderContext);
    const {addClient} = context;
    const {data, loading, error} = useQuery(GET_CLIENTS_BY_SELLER);

    useEffect(() => {
        addClient(client)
    }, [client])

    const handleChange = value => {
        setClient(value);
    }

    if (loading) return null;

    const {getClientsBySeller} = data;
    return (
        <div>
            <p className="mt-2 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">1.- Asigna
                un cliente al pedido</p>
            <Select
                isLoading={loading}
                className="mt-3"
                options={getClientsBySeller}
                onChange={handleChange}
                getOptionValue={options => options.id}
                getOptionLabel={options => options.name}
                placeholder="Seleccione el cliente"
                noOptionsMessage={() => "No hay resultados"}
            />
        </div>
    );
};

export default AssignClient;
