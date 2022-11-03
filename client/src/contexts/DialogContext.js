import {createContext, createElement, useContext, useState} from "react";
import ReportDialog from "../dialogs/ReportDialog";
import ErrorsDialog from "../dialogs/ErrorsDialog";
import DeleteDialog from "../dialogs/DeleteDialog";
import CreateTaskDialog from "../dialogs/CreateTaskDialog";

export const DIALOGS = {
    createTaskDialog: CreateTaskDialog,
    reportDialog: ReportDialog,
    errorsDialog: ErrorsDialog,
    deleteDialog: DeleteDialog
}

const DialogContext = createContext({});

export const useDialogContext = () => useContext(DialogContext);

export const DialogProvider = ({children}) => {
    const [dialogs, setDialogs] = useState([]);

    const openDialog = ({dialog, props = {}}) => {
        setDialogs((prevState) => [...prevState, {dialog, props}]);
    }

    const closeDialog = () => {
        setDialogs((prevState) => prevState.slice(0, dialogs.length - 1));
    }

    return <DialogContext.Provider value={{
        openDialog,
        closeDialog
    }}>
        {children}
        {
            dialogs.map(({dialog, props}, index) =>
                createElement(dialog, {...props, key: index})
            )
        }
    </DialogContext.Provider>
}

export default DialogProvider;
