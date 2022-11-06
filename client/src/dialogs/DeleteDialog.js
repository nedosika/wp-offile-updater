import React from 'react';

import {useMutation} from "@apollo/client";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide
} from "@mui/material";
import {LoadingButton} from "@mui/lab";

import {useDialogContext} from "../contexts/DialogContext";
import {DELETE_TASK} from "../apollo/mutations";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog = ({id}) => {
    const [removeTask, {loading}] = useMutation(DELETE_TASK);
    const {closeDialog} = useDialogContext();

    const handleRemove = () =>
        removeTask({
            variables: {id}
        }).then(closeDialog);

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
                <LoadingButton loading={loading} onClick={handleRemove}>Agree</LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;