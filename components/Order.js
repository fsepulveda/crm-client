import React, {useState, useEffect} from 'react';
import {useMutation} from "@apollo/client";
import {UPDATE_ORDER} from "../graphql/mutations";

const Order = ({order}) => {

    const {id, total, client: {name, lastname, phone, email}, status, client} = order
    const [orderStatus, setOrderStatus] = useState(status);
    const [classStatus, setClassStatus] = useState('');
    const [updateOrder] = useMutation(UPDATE_ORDER);

    useEffect(() => {
        if (orderStatus) {
            setOrderStatus(orderStatus);
        }
        changeColorStatus();
    }, [orderStatus]);

    const handleChange = async e => {
        console.log(e.target.value);
        try {
            const {data} = await updateOrder({
                variables: {
                    id,
                    input: {
                        status: e.target.value,
                        client: client.id
                    }
                }
            });

            setOrderStatus(data.updateOrder.status);
        } catch (e) {

        }
    }

    const changeColorStatus = () => {
        if (orderStatus === "PENDING") {
            setClassStatus('border-yellow-500');
        } else if (orderStatus === "COMPLETED") {
            setClassStatus('border-green-500');
        } else {
            setClassStatus('border-red-800');
        }
    }
    return (
        <div
            className={`${classStatus} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-2xl`}>
            <div>
                <p className="font-bold text-gray-800">Cliente: {name} {lastname}</p>
                {email && (
                    <p className="flex items-center my-2">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        {email}
                    </p>)
                }
                {phone && (
                    <p className="flex items-center my-2">
                        <svg className="w-4 4-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        {phone}
                    </p>)
                }
                <h2 className="text-gray-800 font-bold mt-10">Estado Pedido:</h2>
                <select
                    value={orderStatus}
                    onChange={handleChange}
                    className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold">
                    <option value="COMPLETED">Completado</option>
                    <option value="PENDING">Pendiente</option>
                    <option value="CANCELED">Cancelado</option>
                </select>
            </div>
            <div>
                <h2 className="text-gray-800 font-bold mt-10">Resumen del Pedido</h2>
                {
                    order.order.map(product => <div key={product.id} className="mt-4">
                        <p className="text-sm text-gray-600">Producto: {product.name}</p>
                        <p className="text-sm text-gray-600">Cantidad: {product.count}</p>
                    </div>)
                }
                <p className="text-gray-800 mt-3 font-bold">Total a pagar:
                    <span className="font-light"> $ {total}</span>
                </p>
                <button type="button"
                        className="flex items-center mt-4 bg-red-800 px-5 py-2 inline-block rounded text-white uppercase text-xs font-bold">Eliminar
                    pedido
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Order;
