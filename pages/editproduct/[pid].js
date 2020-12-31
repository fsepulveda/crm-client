import React, {useState} from 'react';
import {useRouter} from "next/router";
import Layout from "../../components/Layout";
import {Formik} from "formik";
import * as Yup from 'yup';
import {useMutation, useQuery} from "@apollo/client";
import {GET_PRODUCT_BY_ID} from "../../graphql/queries";
import {UPDATE_PRODUCT} from "../../graphql/mutations";

const validationSchema = Yup.object({
    name: Yup.string().required('El dato nombre es obligatorio'),
    stock: Yup.number()
        .positive("El dato stock debe ser mayor o igual a 0")
        .integer("El dato stock debe ser un numero entero")
        .required('El dato stock es obligatorio'),
    price: Yup.number()
        .positive("El dato precio debe ser mayor o igual a 0")
        .integer("El dato precio debe ser un numero entero")
        .required('El dato precio es obligatorio'),
})

const EditProduct = () => {
    const router = useRouter();
    const {query: {id}} = router;
    const {data, loading, error} = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            id
        }
    });
    const [updateProduct] = useMutation(UPDATE_PRODUCT);
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(null);

    if (loading) return 'Cargando...';
    if (error) return 'Error...';

    const {getProductById} = data;

    const handleSubmit = async values => {
        console.log(values);
        try {
            const {name, stock, price} = values;
            const {} = await updateProduct({
                variables: {
                    id,
                    input: {
                        name,
                        stock,
                        price
                    }
                }
            });

            if (data) {
                setSuccess(`Producto actualizado correctamente`);
                setTimeout(() => {
                    setSuccess(null);
                    router.push('/products');
                }, 2000);
            }
        } catch (e) {
            setMessage(e.message);
            setTimeout(() => {
                setMessage(null);
            }, 2000)
        }
    }

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        initialValues={{...getProductById}}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {props => (

                            <form
                                className="bg-white shadow-md px-8 pt-6 pb-8 mt-4"
                                onSubmit={props.handleSubmit}
                            >
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2"
                                           htmlFor="name">Nombre</label>
                                    <input
                                        className={props.touched.name && props.errors.name ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                        type="text" name="name" id="name" placeholder="Nombre producto"
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
                                           htmlFor="stock">Stock</label>
                                    <input
                                        className={props.touched.stock && props.errors.stock ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                        type="number" name="stock" id="stock" placeholder="Cantidad disponible"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.stock}
                                    />
                                    {
                                        props.touched.stock && props.errors.stock && (<span
                                            className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{props.errors.stock}</span>)
                                    }
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2"
                                           htmlFor="price">Precio</label>
                                    <input
                                        className={props.touched.price && props.errors.price ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                        type="number" name="price" id="price" placeholder="Precio"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.price}
                                    />
                                    {
                                        props.touched.price && props.errors.price && (<span
                                            className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{props.errors.price}</span>)
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
                                       value="Actualizar producto"/>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </Layout>
    );
};

export default EditProduct;
