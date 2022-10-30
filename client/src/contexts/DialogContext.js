import {createContext, useContext, useState} from "react";
import ReportDialog from "../dialogs/ReportDialog";
import ErrorsDialog from "../dialogs/ErrorsDialog";
import DeleteDialog from "../dialogs/DeleteDialog";
import CreateTaskDialog from "../dialogs/CreateTaskDialog";

export const DIALOGS = {
    createTaskDialog: 'createTaskDialog',
    reportDialog: 'reportDialog',
    errorsDialog: 'errorsDialog',
    deleteDialog: 'deleteDialog'
}

const DialogContext = createContext({});

export const useDialogContext = () => useContext(DialogContext);

export const DialogProvider = ({children}) => {
    const [dialogs, setDialogs] = useState({
        [DIALOGS.createTaskDialog]: false,
        [DIALOGS.reportDialog]: false,
        [DIALOGS.errorsDialog]: false,
        [DIALOGS.deleteDialog]: false
    });
    const [options, setOptions] = useState({});

    const toggleDialog = (dialog, options) =>
    {
        setOptions((prevState) => ({...prevState, [dialog]: options}));
        setDialogs((prevState) => ({
            ...prevState,
            [dialog]: !prevState[dialog]
        }));
    }

    return <DialogContext.Provider value={{
        dialogs,
        toggleDialog
    }}>
        {children}
        <CreateTaskDialog/>
        <ReportDialog {...options[DIALOGS.reportDialog]}/>
        <ErrorsDialog {...options[DIALOGS.errorsDialog]}/>
        <DeleteDialog {...options[DIALOGS.deleteDialog]}/>
    </DialogContext.Provider>
}

export default DialogProvider;
