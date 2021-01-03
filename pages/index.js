import Layout from "../components/Layout";
import {gql, useQuery} from "@apollo/client";
import {useRouter} from "next/router";
import Link from 'next/link';
import {Client} from "../components/Client";
import {GET_CLIENTS_BY_SELLER} from "../graphql/queries";

export default function Index() {
    const {data, loading, error, client} = useQuery(GET_CLIENTS_BY_SELLER);
    const router = useRouter();

    if (loading) return <span>Cargando...</span>;

    if (!data.getClientsBySeller) {
        router.push('/login')
        return <span>Cargando...</span>;
    }


    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
            <Link href="/newclient">
                <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold lg:w-auto text-center">Nuevo
                    Cliente</a>
            </Link>

            <div className="overflow-x-scroll">


                <table className="table-auto shadow-md mt-10 w-full">
                    <thead className="bg-gray-800">
                    <tr className="text-white">
                        <th className="w-1/5 py-2">
                            Nombre
                        </th>
                        <th className="w-1/5 py-2">
                            Empresa
                        </th>
                        <th className="w-1/5 py-2">
                            Email
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
                    {data.getClientsBySeller.map(client => (
                        <Client key={client.id} client={client}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}
