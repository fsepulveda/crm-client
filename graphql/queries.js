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

export const GET_ORDERS_BY_SELLER = gql`
    query getOrdersBySeller {
        getOrdersBySeller {
            id
            order {
                id
                count
                name
            }
            client {
                id
                name
                lastname
                email
                phone
            }
            seller
            total
            status
        }
    }
`;

export const GET_BEST_SELLERS = gql`
    query bestSellers {
        bestSellers {
            total
            seller {
                name
                lastname
                email
                createAt
            }
        }
    }
`;

export const GET_BEST_CLIENTS = gql`
    query bestClients {
      bestClients {
        client {
          name
          lastname
          company
        }
        total
      }
    }
`
;
