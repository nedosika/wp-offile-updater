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
import {DataGrid} from '@mui/x-data-grid';
import {DIALOGS, useDialogContext} from "../contexts/DialogContext";
import {gql, useQuery} from "@apollo/client";
import {GET_TASK} from "../apollo/queries";

const Transition = React.forwardRef((props, ref) =>
    <Slide direction="up" ref={ref} {...props} />
);

const columns = [
    {
        field: 'url',
        headerName: 'Url',
        width: 450,
        editable: true
    },
    {
        field: 'error',
        headerName: 'Error',
        width: 400,
        editable: true
    }
];

const ErrorsDialog = ({id}) => {
    const {loading, error, data} = useQuery(GET_TASK, {
        variables: {id},
    });
    const {closeDialog} = useDialogContext();

    console.log(data)

    return (
        <Dialog
            fullScreen
            open
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
                        Errors in {data?.task.name}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={closeDialog}>
                        Close
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{height: 400, width: '100%', padding: '10px 10px 0 10px'}}>
                <DataGrid
                    rows={data?.task?.report?.errors || []}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 15]}
                    getRowId={(row) => row.url}
                    loading={loading}
                />
            </Box>
        </Dialog>
    );
};

export default ErrorsDialog;
