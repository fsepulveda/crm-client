import {gql} from "@apollo/client";

export const GET_PRODUCTS = gql`
    query getProducts {
        getProducts {
            id
            name
            stock
            price
            createdAt
        }
    }
`;

export const GET_CLIENTS_BY_SELLER = gql`
    query getClientsBySeller {
        getClientsBySeller  {
            name
            lastname
            company
            email
            id
            phone
        }
    }
`;

export const GET_USER = gql`
    query getUser{
        getUser  {
            id
            name
            lastname
        }
    }
`;

export const GET_PRODUCT_BY_ID = gql`
    query getProductById($id: ID!) {
        getProductById(id: $id  ){
            id
            name
            stock
            price
        }
    }
`;
