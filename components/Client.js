import Swal from 'sweetalert2';
import {gql, useMutation} from "@apollo/client";
import Router from 'next/router';
import {GET_CLIENTS_BY_SELLER} from '../graphql/queries';
import {DELETE_CLIENTE} from "../graphql/mutations";



export function Client({client}) {
    const {id, name, lastname, company, email} = client;
    const [deleteClient] = useMutation(DELETE_CLIENTE, {
        update(cache) {
            const {getClientsBySeller} = cache.readQuery({query: GET_CLIENTS_BY_SELLER});

            // Rewrite cache
            cache.writeQuery({
                query: GET_CLIENTS_BY_SELLER,
                data: {
                    getClientsBySeller: getClientsBySeller.filter(client => client.id !== id)
                }
            })
        }
    });

    const handleDelete = () => {

        Swal.fire({
            title: '¿Deseas eliminar a este cliente?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'No, Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const {data} = await deleteClient({
                        variables: {
                            id
                        }
                    });

                    console.log(data);
                    Swal.fire(
                        'Eliminado!',
                        'Your file has been deleted.',
                        'success'
                    )
                } catch (e) {

                }

            }
        })
    }

    const handleEdit = () => {
        Router.push({
            pathname: '/editclient/[id]',
            query: {id}
        })
    }

    return <tr>
        <td className="border px-4 py-2">{name} {lastname}</td>
        <td className="border px-4 py-2">{company}</td>
        <td className="border px-4 py-2">{email}</td>
        <td className="border px-4 py-2">
            <button type="button"
                    className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={() => handleDelete(id)}
            >Eliminar
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </button>
        </td>
        <td className="border px-4 py-2">
            <button type="button"
                    className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={handleEdit}
            >Editar
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
            </button>
        </td>
    </tr>;
}
