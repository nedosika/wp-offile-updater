import {Navigate, Route, Routes} from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Tasks from "./pages/Tasks";
import SignIn from "./pages/SignIn";
import {useAuthContext} from "./contexts/AuthContext";
import {Backdrop, CircularProgress} from "@mui/material";

function App() {
    const {isAuth, isCheckingAuth} = useAuthContext();

    if (isCheckingAuth) return <Backdrop
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
