import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    ApolloLink,
    concat,
    gql,
    fromPromise
} from '@apollo/client';
import {config} from "./config";
import {BrowserRouter} from "react-router-dom";
import {SnackbarProvider} from "notistack";
import DialogProvider from "./contexts/DialogContext";
import {setContext} from "@apollo/client/link/context";
import {onError} from "@apollo/client/link/error";

let apolloClient;

const REFRESH = gql`query refresh {
  refresh{
    accessToken,
    error
  }
}`;

const getNewToken = () => {
    return apolloClient.query({query: REFRESH}).then((response) => {
        // extract your accessToken from your response data and return it
        const {accessToken} = response.data;
        return accessToken;
    });
};

const httpLink = createHttpLink({uri: config.uri, credentials: 'include'});

const authLink = setContext((_, {headers}) => {
    const accessToken = localStorage.getItem('accessToken');

    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : "",
        }
    }
});

const errorLink = onError(({graphQLErrors, networkError, operation, forward}) => {
    if (graphQLErrors) {
        for (let err of graphQLErrors) {
            switch (err.message) {
                case 'UNAUTHENTICATED':
                    return fromPromise(
                        getNewToken().catch((error) => {
                            // Handle token refresh errors e.g clear stored tokens, redirect to login
                            return;
                        })
                    )
                        .filter((value) => Boolean(value))
                        .flatMap((accessToken) => {
                            const oldHeaders = operation.getContext().headers;
                            // modify the operation context with a new token
                            operation.setContext({
                                headers: {
                                    ...oldHeaders,
                                    authorization: `Bearer ${accessToken}`,
                                },
                            });

                            // retry the request, returning the new observable
                            return forward(operation);
                        });
            }
        }
    }
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        // if you would also like to retry automatically on
        // network errors, we recommend that you use
        // apollo-link-retry
    }
});

const apolloLink = concat(errorLink, concat(authLink, httpLink));

apolloClient = new ApolloClient({
    link: apolloLink,
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ApolloProvider client={apolloClient}>
            <SnackbarProvider>
                    <DialogProvider>
                        <App/>
                    </DialogProvider>
            </SnackbarProvider>
        </ApolloProvider>
    </BrowserRouter>
);
