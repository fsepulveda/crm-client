import {ApolloClient, HttpLink, createSignalIfSupported, InMemoryCache, createHttpLink} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import fetch from 'node-fetch';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
    fetch
});

const authLink = setContext((_, {headers}) => {
    // Read Storage
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client;
