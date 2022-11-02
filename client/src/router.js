import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import {useQuery} from "@apollo/client";
import {Backdrop, CircularProgress} from "@mui/material";

import Tasks from "./pages/Tasks";
import SignIn from "./pages/SignIn";
import {REFRESH_TOKEN} from "./apollo/queries";
import ProtectedRoutes from "./components/ProtectedRoutes";

const AppRouter = () => {
    const {loading, error} = useQuery(REFRESH_TOKEN);

    const isAuth = !error;

    if (loading)
        return <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open
    >
        <CircularProgress color="inherit"/>
    </Backdrop>

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <ProtectedRoutes isAllowed={isAuth} redirectPath="/signin"/>
                    }
                >
                    <Route path="/" element={<Tasks/>}/>
                </Route>
                <Route
                    element={<ProtectedRoutes isAllowed={!isAuth} redirectPath="/"/>}
                >
                    <Route path="/signin" element={<SignIn/>}/>
                </Route>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;