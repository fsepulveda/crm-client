import React, {useState} from 'react';
import Layout from "../components/Layout";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {gql, useMutation} from "@apollo/client";
import {useRouter} from "next/router";
import {NEW_CLIENT} from "../graphql/mutations";
import {GET_CLIENTS_BY_SELLER} from "../graphql/queries";

const NewClient = () => {
    const [newClient] = useMutation(NEW_CLIENT, {
        update(cache, {data: {newClient}}) {
            // Get cache object to update
            const {getClientsBySeller} = cache.readQuery({query: GET_CLIENTS_BY_SELLER});

            // Rewrite cache
            cache.writeQuery({
                query: GET_CLIENTS_BY_SELLER,
                data: {
                    getClientsBySeller: [...getClientsBySeller, newClient]
                }
            })
        }
    });
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            company: '',
            email: '',
            phone: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('El dato nombre del cliente es obligatorio'),
            lastname: Yup.string().required('El dato apellido del cliente es obligatorio'),
            company: Yup.string().required('El dato empresa del cliente es obligatorio'),
            email: Yup.string().required('El dato email del cliente es obligatorio'),
            phone: Yup.string()
        }),
        onSubmit: async values => {
            try {
                const {name, lastname, company, email, phone} = values;
                const {data, errors} = await newClient({
                    variables: {
                        input: {
                            name,
                            lastname,
                            company,
                            email,
                            phone
                        }
                    }
                });

                console.log(data.newClient);

                if (data.newClient) {
                    setSuccess(`Cliente registrado exitosamente`)

                    setTimeout(() => {
                        setSuccess(null);
                        router.push('/');
                    }, 2000);
                }
            } catch (e) {
                console.log(e);
                setMessage(e.message);
                setTimeout(() => {
                    setMessage(null)
                }, 2000);
            }
        }
    })
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Cliente</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mt-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nombre</label>
                            <input
                                className={formik.touched.name && formik.errors.name ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                type="text" name="name" id="name" placeholder="Nombre cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            {
                                formik.touched.name && formik.errors.name && (<span
                                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{formik.errors.name}</span>)
                            }
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                   htmlFor="lastname">Apellido</label>
                            <input
                                className={formik.touched.lastname && formik.errors.lastname ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                type="text" name="lastname" id="lastname" placeholder="Apellido cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastname}
                            />
                            {
                                formik.touched.lastname && formik.errors.lastname && (<span
                                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{formik.errors.lastname}</span>)
                            }
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                   htmlFor="company">Empresa</label>
                            <input
                                className={formik.touched.company && formik.errors.company ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                type="text" name="company" id="company" placeholder="Empresa cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.company}
                            />
                            {
                                formik.touched.company && formik.errors.company && (<span
                                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{formik.errors.company}</span>)
                            }
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <input
                                className={formik.touched.email && formik.errors.email ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                type="email" name="email" id="email" placeholder="Email cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {
                                formik.touched.email && formik.errors.email && (<span
                                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{formik.errors.email}</span>)
                            }
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                   htmlFor="phone">Teléfono</label>
                            <input
                                className={formik.touched.phone && formik.errors.phone ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                type="tel" name="phone" id="phone" placeholder="Teléfono cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                            />
                            {
                                formik.touched.phone && formik.errors.phone && (<span
                                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{formik.errors.phone}</span>)
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
                               value="Registrar cliente"/>
                    </form>

                </div>
            </div>
        </Layout>
    );
};

export default NewClient;
