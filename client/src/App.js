import {ApolloProvider} from "@apollo/client";
import React from "react";
import {apolloClient} from "./apollo/client";
import {SnackbarProvider} from "notistack";
import DialogProvider from "./contexts/DialogContext";
import AppRouter from "./router";
import TasksProvider from "./contexts/TasksContext";

function App() {
    return (
        <ApolloProvider client={apolloClient}>
            <SnackbarProvider>
                <TasksProvider>
                    <DialogProvider>
                        <AppRouter/>
                    </DialogProvider>
                </TasksProvider>
            </SnackbarProvider>
        </ApolloProvider>
    );
}

export default App;
