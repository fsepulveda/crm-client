import Layout from "../components/Layout";
import {gql, useQuery} from "@apollo/client";
import {useRouter} from "next/router";

const GET_CLIENTS_BY_SELLER = gql`
    query getClientsBySeller {
        getClientsBySeller  {
            name
            lastname
            company
            email
            id
            phone
        }
    }
`;

export default function Index() {
    const {data, loading, error, client} = useQuery(GET_CLIENTS_BY_SELLER, {fetchPolicy: "no-cache"});
    const router = useRouter();

    if (loading) return <span>Cargando...</span>;


    if (!data.getClientsBySeller) {
        router.push('/login')
        return <span>Cargando...</span>;
    }


    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>

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
                </tr>
                </thead>
                <tbody className="bg-white">
                {
                    data.getClientsBySeller.map(client => (
                        <tr key={client.id}>
                            <td className="border px-4 py-2">{client.name} {client.lastname}</td>
                            <td className="border px-4 py-2">{client.company}</td>
                            <td className="border px-4 py-2">{client.email}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </Layout>
    )
}
