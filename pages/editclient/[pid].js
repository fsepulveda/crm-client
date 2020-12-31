import React, {useState} from 'react';
import {useRouter} from "next/router";
import Layout from "../../components/Layout";
import {gql, useMutation, useQuery} from "@apollo/client";
import {Formik} from "formik";
import * as Yup from "yup";

const GET_CLIENT_BY_ID = gql`
    query getClient($id: ID!) {
        getClient(id: $id) {
            id
            name
            lastname
            company
            email
            phone
        }
    }
`;

const UPDATE_CLIENT = gql`
    mutation  updateClient($id: ID!, $input: ClientInput) {
        updateClient(id: $id, input: $input) {
            id
            name
            lastname
            company
            email
            phone
        }
    }
`;

const EditClient = () => {
    const router = useRouter();
    const {query: {id}} = router;
    const {data, loading, error} = useQuery(GET_CLIENT_BY_ID, {
        variables: {
            id
        }
    });
    const [updateClient] = useMutation(UPDATE_CLIENT);
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(null);

    const validationSchema = Yup.object({
        name: Yup.string().required('El dato nombre del cliente es obligatorio'),
        lastname: Yup.string().required('El dato apellido del cliente es obligatorio'),
        company: Yup.string().required('El dato empresa del cliente es obligatorio'),
        email: Yup.string().required('El dato email del cliente es obligatorio'),
        phone: Yup.string()
    });

    if (loading) return 'Cargando...';

    const {getClient} = data;

    const handleSubmit = async values => {
        const {name, lastname, company, email, phone} = values;

        try {
            const {data} = await updateClient({
                variables: {
                    id,
                    input: {
                        name,
                        lastname,
                        company,
                        email,
                        phone
                    }
                }
            });

            console.log(data);

            if (data) {
                setSuccess(`Cliente actualizado`);

                setTimeout(() => {
                    router.push('/')
                }, 2000);
            }
        } catch (e) {
            setMessage(e.message);

            setTimeout(() => {
                setMessage(null)
            }, 2000)
        }
    }

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        validationSchema={validationSchema}
                        enableReinitialize
                        initialValues={{...getClient}}
                        onSubmit={handleSubmit}
                    >
                        {props => {
                            return (
                                <form
                                    className="bg-white shadow-md px-8 pt-6 pb-8 mt-4"
                                    onSubmit={props.handleSubmit}
                                >
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="name">Nombre</label>
                                        <input
                                            className={props.touched.name && props.errors.name ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                            type="text" name="name" id="name" placeholder="Nombre cliente"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.name}
                                        />
                                        {
                                            props.touched.name && props.errors.name && (<span
                                                className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{props.errors.name}</span>)
                                        }
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="lastname">Apellido</label>
                                        <input
                                            className={props.touched.lastname && props.errors.lastname ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                            type="text" name="lastname" id="lastname" placeholder="Apellido cliente"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.lastname}
                                        />
                                        {
                                            props.touched.lastname && props.errors.lastname && (<span
                                                className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{props.errors.lastname}</span>)
                                        }
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="company">Empresa</label>
                                        <input
                                            className={props.touched.company && props.errors.company ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                            type="text" name="company" id="company" placeholder="Empresa cliente"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.company}
                                        />
                                        {
                                            props.touched.company && props.errors.company && (<span
                                                className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{props.errors.company}</span>)
                                        }
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="email">Email</label>
                                        <input
                                            className={props.touched.email && props.errors.email ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                            type="email" name="email" id="email" placeholder="Email cliente"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.email}
                                        />
                                        {
                                            props.touched.email && props.errors.email && (<span
                                                className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{props.errors.email}</span>)
                                        }
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="phone">Teléfono</label>
                                        <input
                                            className={props.touched.phone && props.errors.phone ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                            type="tel" name="phone" id="phone" placeholder="Teléfono cliente"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.phone}
                                        />
                                        {
                                            props.touched.phone && props.errors.phone && (<span
                                                className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{props.errors.phone}</span>)
                                        }
                                    </div>

                                    {
                                        message && (<span
                                            className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{message}</span>)
                                    }

                                    {
                                        success && (
                                            <div className="bg-green-300 p-2 rounded">
                                                <span className="text-green-700 text-sm">{success}</span>
                                            </div>
                                        )
                                    }

                                    <input type="submit"
                                           className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hove: bg-gray-900"
                                           value="Actualizar cliente"/>
                                </form>
                            )
                        }}

                    </Formik>
                </div>
            </div>
        </Layout>
    );
};

export default EditClient;
