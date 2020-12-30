import React, {useState} from 'react';
import Layout from "../components/Layout";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {gql, useMutation} from "@apollo/client";
import {useRouter} from "next/router";
import {route} from "next/dist/next-server/server/router";

const AUTH_USER = gql`
    mutation authenticateUser($input: AuthenticateInput  ) {
        authenticateUser(input: $input  ) {
            token
        }
    }
`;

const Login = () => {
    const [authenticateUser] = useMutation(AUTH_USER);
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
            password: Yup.string().required('El password es obligatorio'),
        }),
        onSubmit: async values => {
            console.log(values);
            const {email, password} = values;
            try {
                const {data, errors} = await authenticateUser({
                    variables: {
                        input: {
                            email,
                            password
                        }
                    }
                });

                console.log(data);
                if (data.authenticateUser.token) {
                    setSuccess(`Login ok!`);

                    localStorage.setItem('token', data.authenticateUser.token);

                    setTimeout(() => {
                        setSuccess(null);
                        router.push('/');
                    }, 3000);
                }
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
            <h1 className="text-center text-2xl text-white font-light">Login</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <input
                                className={formik.touched.name && formik.errors.name ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                type="email" name="email" id="email" placeholder="Email usuario"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
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

                        <input type="submit" value="Login"
                               className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"/>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
