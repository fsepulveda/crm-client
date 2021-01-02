import Layout from "../components/Layout";
import Link from 'next/link';
import {useQuery} from "@apollo/client";
import {GET_ORDERS_BY_SELLER} from "../graphql/queries";
import Order from "../components/Order";

export default function Orders() {
    const {data, loading, error} = useQuery(GET_ORDERS_BY_SELLER);

    if (loading) return 'Cargando...';

    const {getOrdersBySeller} = data

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>

            <Link href="/neworder">
                <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">
                    Nuevo Pedido</a>
            </Link>

            {
                getOrdersBySeller.length === 0 ? (<p className="mt-5 text-center text-2xl">No hay pedidos</p>) : (
                    getOrdersBySeller.map(order => <Order key={order.id} order={order}/>)
                )
            }
        </Layout>
    )
}
