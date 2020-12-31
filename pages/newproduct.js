import React, {useState} from 'react';
import Layout from "../components/Layout";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {gql, useMutation} from "@apollo/client";
import {useRouter} from "next/router";
import {GET_PRODUCTS} from "../graphql/queries";
import {NEW_PRODUCT} from "../graphql/mutations";

const NewProduct = () => {
    const router = useRouter();
    const [newProduct] = useMutation(NEW_PRODUCT, {
        update(cache, {data: {newProduct}}) {
            // 1.- get cache data
            const {getProducts} = cache.readQuery({query: GET_PRODUCTS});

            // 2.- Rewrite cache object
            cache.writeQuery({
                query: GET_PRODUCTS,
                data: {
                    getProducts: [...getProducts, newProduct]
                }
            })
        }
    });

    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(null);
    const formik = useFormik({
        initialValues: {
            name: '',
            stock: '',
            price: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('El dato nombre es obligatorio'),
            stock: Yup.number()
                .positive("El dato stock debe ser mayor o igual a 0")
                .integer("El dato stock debe ser un numero entero")
                .required('El dato stock es obligatorio'),
            price: Yup.number()
                .positive("El dato precio debe ser mayor o igual a 0")
                .integer("El dato precio debe ser un numero entero")
                .required('El dato precio es obligatorio'),
        }),
        onSubmit: async values => {
            const {name, stock, price} = values;
            try {
                const {data} = await newProduct({
                    variables: {
                        input: {
                            name,
                            stock,
                            price
                        }
                    }
                });

                if (data) {
                    setSuccess(`Proucto creado correctamente`);

                    setTimeout(() => {
                        router.push('/products');
                    }, 2000)
                }

            } catch (e) {

            }
        }
    });

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo Producto</h1>

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
                                type="text" name="name" id="name" placeholder="Nombre producto"
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">Stock</label>
                            <input
                                className={formik.touched.stock && formik.errors.stock ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                type="number" name="stock" id="stock" placeholder="Cantidad disponible"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.stock}
                            />
                            {
                                formik.touched.stock && formik.errors.stock && (<span
                                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{formik.errors.stock}</span>)
                            }
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Precio</label>
                            <input
                                className={formik.touched.price && formik.errors.price ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                type="number" name="price" id="price" placeholder="Precio"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                            />
                            {
                                formik.touched.price && formik.errors.price && (<span
                                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{formik.errors.price}</span>)
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
                               value="Agregar producto"/>
                    </form>

                </div>
            </div>
        </Layout>
    );
};

export default NewProduct;
