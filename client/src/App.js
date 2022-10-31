import {Navigate, Route, Routes} from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Tasks from "./pages/Tasks";
import SignIn from "./pages/SignIn";
import {Backdrop, CircularProgress} from "@mui/material";
import {gql, useMutation, useQuery} from "@apollo/client";
import {useEffect} from "react";

const CHECK_AUTH = gql`query checkAuth {
  refresh{
    accessToken,
    error
  }
}`;

function App() {
    const {data, loading, error} = useQuery(CHECK_AUTH);
    const accessToken = data?.refresh.accessToken;
    const isAuth = !!accessToken;

    useEffect(() => {
        accessToken && localStorage.setItem("accessToken", accessToken);
    }, [data]);

    if (loading) return <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open
    >
        <CircularProgress color="inherit"/>
    </Backdrop>

    return (
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
    );
}

export default App;
