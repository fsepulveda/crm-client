import {gql} from "@apollo/client";

export const AUTH_USER = gql`
    mutation authenticateUser($input: AuthenticateInput  ) {
        authenticateUser(input: $input  ) {
            token
        }
    }
`;

export const NEW_CLIENT = gql`
    mutation  newClient($input: ClientInput) {
        newClient(input: $input  ) {
            id
            name
            lastname
            company
            email
            phone
        }
    }
`;

export const NEW_PRODUCT = gql`
    mutation  newProduct ($input: ProductInput) {
        newProduct  (input: $input) {
            id
            name
            price
            stock
            createdAt
        }
    }
`;

export const DELETE_CLIENTE = gql`
    mutation  deleteClient($id: ID!) {
        deleteClient(id: $id)
    }
`;

export const DELETE_PRODUCT = gql`
    mutation  deleteProduct($id: ID  !) {
        deleteProduct(id: $id)
    }
`;

export const UPDATE_PRODUCT = gql`
    mutation  updateProduct($id: ID  !, $input: ProductInput!) {
        updateProduct(id: $id, input: $input  ) {
            id
            name
            stock
            price
        }
    }
`;

export const NEW_ORDER = gql`
    mutation  newOrder ($input: OrderInput) {
        newOrder(input: $input) {
            id
            client
            seller
            order {
                id
                count
                name
                price
            }
            total
            status
        }
    }
`;

export const UPDATE_ORDER = gql`
    mutation  updateOrder ($id: ID!, $input: OrderInput) {
        updateOrder(id: $id, input: $input) {
            id
            status
        }
    }
`;
