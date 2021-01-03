import React, {useEffect} from 'react';
import Layout from "../components/Layout";
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {useQuery} from "@apollo/client";
import {GET_BEST_CLIENTS} from "../graphql/queries";

const BestClients = () => {
    const {data, loading, error, startPolling, stopPolling} = useQuery(GET_BEST_CLIENTS);

    useEffect(() => {
        startPolling(1000);

        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling]);

    if (loading) return 'Cargando...';

    const {bestClients} = data;

    const clientsGraph = [];
    bestClients.map((client, index) => {
        clientsGraph[index] = {
            ...client.client[0],
            total: client.total
        }
    })


    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Mejores clientes</h1>
            <BarChart
                className="mt-5"
                width={600} height={500} data={clientsGraph}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="total" fill="#3182ce"/>
            </BarChart>
        </Layout>
    );
};

export default BestClients;
