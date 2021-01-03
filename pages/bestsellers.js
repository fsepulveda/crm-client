import React, {useEffect} from 'react';
import Layout from "../components/Layout";
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {useQuery} from "@apollo/client";
import {GET_BEST_SELLERS} from "../graphql/queries";

const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const BestSellers = () => {
    const {data, loading, error, startPolling, stopPolling} = useQuery(GET_BEST_SELLERS);

    useEffect(() => {
        startPolling(1000);

        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling]);

    if (loading) return 'Cargando...';

    const {bestSellers} = data;

    const sellerGraph = [];
    bestSellers.map((seller, index) => {
        sellerGraph[index] = {
            ...seller.seller[0],
            total: seller.total
        }
    })


    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Mejores vendedores</h1>
            <ResponsiveContainer width="99%" height={550}>
                <BarChart
                    className="mt-5"
                    width={600} height={500} data={sellerGraph}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="total" fill="#3182ce"/>
                </BarChart>
            </ResponsiveContainer>
        </Layout>
    );
};

export default BestSellers;
