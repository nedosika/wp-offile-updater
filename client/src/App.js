import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {SnackbarProvider} from "notistack";
import DialogProvider from "./contexts/DialogContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Tasks from "./pages/Tasks";
import SignIn from "./pages/SignIn";

function App() {
    const isAuth = true;

    return (
        <SnackbarProvider>
            <DialogProvider>
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
            </DialogProvider>
        </SnackbarProvider>
    );
}

export default App;
