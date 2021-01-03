import React, {useState, useContext} from 'react';
import Layout from "../components/Layout";
import OrderContext from "../context/orders/OrderContext";
import AssignClient from "../components/orders/AssignClient";
import AssignProducts from "../components/orders/AssignProducts";
import OrderSummary from "../components/orders/OrderSummary";
import Total from "../components/orders/Total";
import {useMutation} from "@apollo/client";
import {NEW_ORDER} from "../graphql/mutations";
import {useRouter} from "next/router";
import {GET_ORDERS_BY_SELLER} from "../graphql/queries";


const NewOrder = () => {
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(null);
    const context = useContext(OrderContext);
    const {client, products, total} = context;
    const [newOrder] = useMutation(NEW_ORDER, {
        update(cache, {data: {newOrder}}) {
            const {getOrdersBySeller} = cache.readQuery({
                query: GET_ORDERS_BY_SELLER
            });

            cache.writeQuery({
                query: GET_ORDERS_BY_SELLER,
                data: {
                    getOrdersBySeller: [...getOrdersBySeller, newOrder]
                }
            })
        }
    });
    const router = useRouter();

    const validateOrder = () => {
        return !products.every(product => product.count > 0) || total === 0 || client.length === 0 ? " opacity-50 cursor-not-allowed" : "";
    }

    const handleOrder = async () => {
        const {id} = client;
        const order = products.map(({stock, createdAt, __typename, ...product}) => product);
        console.log(id, order, total);
        try {
            const {data} = await newOrder({
                variables: {
                    input: {
                        client: id,
                        total,
                        order
                    }
                }
            });
            console.log(data);
            if (data) {
                setSuccess(`El pedido fue ingresado exitosamente`);
            }
            setTimeout(async () => {
                await router.push('/orders');
            }, 3000);

        } catch (e) {
            setMessage(e.message);

            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    }

    return (
        <Layout>
            <h1>Nuevo pedido</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <AssignClient/>
                    <AssignProducts/>
                    <OrderSummary/>
                    <Total/>
                    {
                        success && (
                            <div className="bg-green-300 p-2 rounded mt-5">
                                <span className="text-green-700 text-sm">{success}</span>
                            </div>
                        )
                    }

                    {
                        message && (<span
                            className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{message}</span>)
                    }
                    <button type="button"
                            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validateOrder()}`}
                            onClick={handleOrder}
                    >Registrar
                        pedido
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default NewOrder;
