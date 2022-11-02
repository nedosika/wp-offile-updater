import {ApolloProvider} from "@apollo/client";
import React from "react";
import {apolloClient} from "./apollo/client";
import {SnackbarProvider} from "notistack";
import DialogProvider from "./contexts/DialogContext";
import AppRouter from "./router";

function App() {
    return (
        <ApolloProvider client={apolloClient}>
            <SnackbarProvider>
                <DialogProvider>
                    <AppRouter/>
                </DialogProvider>
            </SnackbarProvider>
        </ApolloProvider>
    );
}

export default App;
