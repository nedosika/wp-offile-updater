import * as React from 'react';
import {useNavigate} from "react-router-dom";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import {gql, useMutation} from "@apollo/client";

export const MainListItems = () => {
    const navigate = useNavigate();

    return <>
        {/*<ListItemButton onClick={() => navigate('/dashboard')}>*/}
        {/*    <ListItemIcon>*/}
        {/*        <DashboardIcon/>*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Dashboard"/>*/}
        {/*</ListItemButton>*/}
        <ListItemButton onClick={() => navigate('/tasks')}>
            <ListItemIcon>
                <LayersIcon/>
            </ListItemIcon>
            <ListItemText primary="Tasks"/>
        </ListItemButton>
        {/*<ListItemButton>*/}
        {/*    <ListItemIcon>*/}
        {/*        <ShoppingCartIcon/>*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Orders"/>*/}
        {/*</ListItemButton>*/}
        {/*<ListItemButton>*/}
        {/*    <ListItemIcon>*/}
        {/*        <PeopleIcon/>*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Customers"/>*/}
        {/*</ListItemButton>*/}
        {/*<ListItemButton>*/}
        {/*    <ListItemIcon>*/}
        {/*        <BarChartIcon/>*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Reports"/>*/}
        {/*</ListItemButton>*/}
    </>
}

const SIGN_OUT = gql`mutation signOut{
    signOut{
        message
        error
    }
}`

export const SecondaryListItems = () => {
    const [signOut] = useMutation(SIGN_OUT, {
        refetchQueries: ['checkAuth']
    });

    const handleSignOut = () =>
        signOut()
            .then(() => {
                localStorage.removeItem("accessToken");
            })

    return (
        <>
            <ListItemButton onClick={handleSignOut}>
                <ListItemIcon>
                    <LogoutIcon/>
                </ListItemIcon>
                <ListItemText primary="Logout"/>
            </ListItemButton>
        </>
    );
}

export default {
    SecondaryListItems,
    MainListItems
}