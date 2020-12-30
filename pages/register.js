import React, {useState} from 'react';

import Layout from "../components/Layout";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useMutation, gql} from "@apollo/client";
import {useRouter} from "next/router";

const NEW_USER = gql`
    mutation newUser($input: UserInput) {
        newUser(input: $input){
            id
            name
            lastname
            email
        }
    }
`;


const Register = () => {
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(null);
    const [newUser] = useMutation(NEW_USER);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('El nombre es obligatorio'),
            lastname: Yup.string()
                .required('El apellido es obligatorio'),
            email: Yup.string()
                .email("El email no es válido")
                .required('El email es obligatorio'),
            password: Yup.string()
                .required('El password es obligatoria')
                .min(6, 'El password debe contener al menos 6 caracteres')
        }),
        onSubmit: async values => {
            console.log(values);
            const {name, lastname, email, password} = values

            try {
                const {data, errors} = await newUser({
                    variables: {
                        input: {
                            name,
                            lastname,
                            email,
                            password
                        }
                    }
                });

                console.log(data);
                if (data) {
                    setSuccess(`El usario ${data.newUser.name} ha sido registrado exitosamente`);
                    setTimeout(() => {
                        setSuccess(null);
                        router.push('/login');
                    })
                }
                console.log(errors);
            } catch (e) {
                console.log(e);
                setMessage(e.message);

                setTimeout(() => {
                    setMessage(null)
                }, 3000);
            }
        }
    })
    return (
        <Layout>
            <h1 className="text-center text-2xl text-white font-light">Crear Nueva Cuenta</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                            <input
                                className={formik.touched.name && formik.errors.name ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                type="text" name="name" id="name" placeholder="Nombre usuario"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.errors.name && (<span
                                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{formik.errors.name}</span>)
                            }

                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                   htmlFor="lastname">Apellido</label>
                            <input
                                className={formik.touched.lastname && formik.errors.lastname ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                type="text" name="lastname" id="lastname" placeholder="Apellido usuario"
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.errors.lastname && (<span
                                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{formik.errors.lastname}</span>)
                            }
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <input
                                className={formik.touched.email && formik.errors.email ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                type="email" name="email" id="email" placeholder="Email usuario"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.errors.email && (<span
                                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{formik.errors.email}</span>)
                            }
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                   htmlFor="password">Password</label>
                            <input
                                className={formik.touched.password && formik.errors.password ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                type="password" name="password" id="password" placeholder="Password usuario"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.errors.password && (<span
                                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{formik.errors.password}</span>)
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

                        <input type="submit" value="Crear Cuenta"
                               className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"/>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
