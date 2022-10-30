import React from 'react';
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import { DataGrid } from '@mui/x-data-grid';
import {DIALOGS, useDialogContext} from "../contexts/DialogContext";
import {gql, useQuery} from "@apollo/client";

const Transition = React.forwardRef((props, ref) =>
    <Slide direction="up" ref={ref} {...props} />
);

const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
        field: 'link',
        headerName: 'Url',
        width: 240,
        editable: true
    },
    {
        field: 'slug',
        headerName: 'Slug',
        width: 200,
        editable: true
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 200,
        valueGetter: (params) =>
            `${params.row.title.rendered || ''}`,
    },
    {
        field: 'categories',
        headerName: 'Categories',
        width: 10,
    },
    {
        field: 'tags',
        headerName: 'Tags',
        width: 90
    },
];

const ReportDialog = ({id}) => {
    const {dialogs: {[DIALOGS.reportDialog]: isOpen}, toggleDialog} = useDialogContext();
    const GET_TASK = gql`query {
        task(id: ${id}){
            name
        }
    }`;
    const {loading, error, data: task} = useQuery(GET_TASK);

    const posts = task && JSON.parse(task.posts) || [];

    const closeDialog = () =>
        toggleDialog(DIALOGS.reportDialog);

    return (
        <Dialog
            fullScreen
            open={isOpen}
            onClose={closeDialog}
            TransitionComponent={Transition}
        >
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={closeDialog}
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        Added posts in {task?.name}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={closeDialog}>
                        Close
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ height: 400, width: '100%', padding: '10px 10px 0 10px' }}>
                <DataGrid
                    rows={posts}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 15]}
                    getRowId={(row) => row.slug}
                />
            </Box>
        </Dialog>
    );
};

export default ReportDialog;
