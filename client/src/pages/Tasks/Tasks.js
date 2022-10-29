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
import {DIALOGS, useDialogContext} from "../../contexts/DialogContext";
import {gql, useQuery} from "@apollo/client";

const GET_TASKS = gql`query {
  tasks{
    name
  }
}`;

const formatDate = (date) =>
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

const Tasks = () => {
    const {loading, error, data: {tasks}} = useQuery(GET_TASKS);
    const {toggleDialog} = useDialogContext();

    if(loading)
        return <div>loading...</div>

    if(error)
        return <div>{error}</div>

    console.log(tasks)

    const openCreateTaskDialog = () =>
        toggleDialog(DIALOGS.createTaskDialog);

    const openReportDialog = (id) => () => {
        toggleDialog(DIALOGS.reportDialog, {id});
    }

    const openErrorsDialog = (id) => () => {
        toggleDialog(DIALOGS.errorsDialog, {id});
    }

    const openDeleteDialog = (id) => () => {
        toggleDialog(DIALOGS.deleteDialog, {id});
    }

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
                                    {tasks.map((task) => (
                                        <TableRow
                                            key={task.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell>{formatDate(new Date(Date.parse(task.start)))}</TableCell>
                                            <TableCell>{task.name}</TableCell>
                                            <TableCell>{task.status}</TableCell>
                                            <TableCell>{task.stop && formatDate(new Date(Date.parse(task.stop)))}</TableCell>
                                            <TableCell>{task.progress && `${task.progress} %`}</TableCell>
                                            <TableCell align='right'>
                                                <Tooltip title="Added posts" arrow>
                                                    <IconButton size="small" onClick={openReportDialog(task.id)}>
                                                        <AssessmentIcon fontSize="inherit"/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Errors" arrow>
                                                    <IconButton size="small" onClick={openErrorsDialog(task.id)}>
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
                                                    <IconButton size="small" onClick={openDeleteDialog(task.id)}>
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
                    onClick={openCreateTaskDialog}
                >
                    <AddIcon/>
                </Fab>
            </Container>
        </Layout>
    );
};

export default Tasks;