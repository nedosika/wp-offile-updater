import React from 'react';

import {
    Fab,
    Paper,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Container,
    TableContainer, Tooltip, CircularProgress, Backdrop,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';
import AssessmentIcon from '@mui/icons-material/Assessment';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';

import Layout from "../../layout";
import {useDialogContext} from "../../contexts/DialogContext";
import {gql, useQuery} from "@apollo/client";
import {GET_TASKS} from "../../apollo/queries";
import CreateTaskDialog from "../../dialogs/CreateTaskDialog";
import ErrorsDialog from "../../dialogs/ErrorsDialog";
import ReportDialog from "../../dialogs/ReportDialog";
import DeleteDialog from "../../dialogs/DeleteDialog";

const formatDate = (date) =>
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

const Tasks = () => {
    const {loading, error, data} = useQuery(GET_TASKS, {
        pollInterval: 500
    });
    const {openDialog} = useDialogContext();

    return (
        <Layout title='Tasks'>
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                {
                    loading
                        ? <Backdrop
                            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                            open
                        >
                            <CircularProgress color="inherit"/>
                        </Backdrop>
                        :
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 650}} size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Name of site</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>End Date</TableCell>
                                        <TableCell>Progress</TableCell>
                                        <TableCell/>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.tasks?.map(({id, status, name, progress}) => (
                                        <TableRow
                                            key={id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell>{new Date(status?.start).toLocaleDateString('uk-UA', {
                                                year: 'numeric',
                                                month: 'numeric',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}</TableCell>
                                            <TableCell>{name}</TableCell>
                                            <TableCell>{status?.error}</TableCell>
                                            <TableCell>{status?.stop}</TableCell>
                                            <TableCell>{progress && `${progress} %`}</TableCell>
                                            <TableCell align='right'>
                                                <Tooltip title="Added posts" arrow>
                                                    <IconButton size="small" onClick={() => openDialog({
                                                        dialog: ReportDialog,
                                                        props: {id}
                                                    })}>
                                                        <AssessmentIcon fontSize="inherit"/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Errors" arrow>
                                                    <IconButton size="small" onClick={() => openDialog({
                                                        dialog: ErrorsDialog,
                                                        props: {id}
                                                    })}>
                                                        <ErrorIcon fontSize="inherit"/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Restart task" arrow>
                                                    <IconButton size="small">
                                                        <RestartAltIcon fontSize="inherit"/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Cancel task" arrow>
                                                    <IconButton size="small">
                                                        <CancelIcon fontSize="inherit"/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Remove task" arrow>
                                                    <IconButton size="small" onClick={() => openDialog({
                                                        dialog: DeleteDialog,
                                                        props: {id}
                                                    })}>
                                                        <DeleteIcon fontSize="inherit"/>
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                }
                <Fab
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16
                    }}
                    color='primary'
                    onClick={() => openDialog({dialog: CreateTaskDialog})}
                >
                    <AddIcon/>
                </Fab>
            </Container>
        </Layout>
    );
};

export default Tasks;