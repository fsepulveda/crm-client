import Layout from "../components/Layout";
import {gql, useQuery} from "@apollo/client";
import {Product} from "../components/Product";
import Link from "next/link";
import {GET_PRODUCTS} from "../graphql/queries";

export default function Products() {
    const {data, loading, error} = useQuery(GET_PRODUCTS);

    if (loading) return 'Cargando...';

    console.log(data);

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Productos</h1>

            <Link href="/newproduct">
                <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">Nuevo
                    Producto</a>
            </Link>

            <table className="table-auto shadow-md mt-10 w-full">
                <thead className="bg-gray-800">
                <tr className="text-white">
                    <th className="w-1/5 py-2">
                        Nombre
                    </th>
                    <th className="w-1/5 py-2">
                        Stock
                    </th>
                    <th className="w-1/5 py-2">
                        Precio
                    </th>
                    <th className="w-1/5 py-2">
                        Eliminar
                    </th>
                    <th className="w-1/5 py-2">
                        Editar
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white">
                {data.getProducts.map(product => (
                    <Product key={product.id} product={product}/>
                ))}
                </tbody>
            </table>
        </Layout>
    )
}
