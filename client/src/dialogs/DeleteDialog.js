import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {DIALOGS, useDialogContext} from "../contexts/DialogContext";
import {useTasksContext} from "../contexts/TasksContext";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog = ({id}) => {
    const {removeTask, isLoading} = useTasksContext();
    const {closeDialog} = useDialogContext();

    const handleRemove = () =>
        removeTask(id).then(closeDialog);

    return (
        <Dialog
            open
            TransitionComponent={Transition}
            keepMounted
            onClose={closeDialog}
        >
            <DialogTitle>{"Delete task"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are You sure to delete this Task?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Disagree</Button>
                <LoadingButton loading={isLoading} onClick={handleRemove}>Agree</LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;