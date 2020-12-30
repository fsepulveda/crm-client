import React from 'react';
import {gql, useQuery} from "@apollo/client";
import {useRouter} from "next/router";

const GET_USER = gql`
    query getUser{
        getUser  {
            id
            name
            lastname
        }
    }
`;

const Header = () => {
    const {client, data, loading, error} = useQuery(GET_USER, {fetchPolicy: "network-only"});
    const router = useRouter();

    if (loading) return 'Cargando...';


    const logout = async () => {
        await client.resetStore()
        await client.clearStore()
        client.cache.gc();

        localStorage.removeItem('token');

        setTimeout(async () => {
            await router.push('/login');
        }, 500);
    }

    return (
        <div className="flex justify-between mb-6">
            <p className="mr-2">Hola {data.getUser.name} {data.getUser.lastname}</p>
            <button
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
                onClick={logout}
                type="button">Cerrar sesión
            </button>
        </div>
    );
};

export default Header;
