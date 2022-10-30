import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import {config} from "./config";
import {BrowserRouter} from "react-router-dom";
import {SnackbarProvider} from "notistack";
import DialogProvider from "./contexts/DialogContext";
import {AuthProvider} from "./contexts/AuthContext";
import {setContext} from "@apollo/client/link/context";

const httpLink = createHttpLink({uri: config.uri, credentials: 'include'});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('accessToken');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <SnackbarProvider>
                <AuthProvider>
                    <DialogProvider>
                        <App/>
                    </DialogProvider>
                </AuthProvider>
            </SnackbarProvider>
        </ApolloProvider>
    </BrowserRouter>
);
