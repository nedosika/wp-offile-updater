import * as React from 'react';

import {useMutation} from "@apollo/client";

import Box from "@mui/material/Box";
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import SiteMap from "./SiteMap";
import PostTitle from "./PostTitle";
import Categories from "./Categories";
import {useDialogContext} from "../../contexts/DialogContext";
import Accordion from "../../components/Accordion/AccordionContext";
import WordPressSettings from "./WordPressSettings";
import {CREATE_TASK} from "../../apollo/mutations";
import {TASK_FIELDS, useTasksContext} from "../../contexts/TasksContext";
import TimeOut from "./TimeOut";

const Transition = React.forwardRef((props, ref) =>
    <Slide direction="up" ref={ref} {...props} />
);

export default function CreateTaskDialog() {
    const {task} = useTasksContext();
    const [createTask, {data, loading, error}] = useMutation(CREATE_TASK);
    const {closeDialog} = useDialogContext();

    const variables = {
        task: {
            name: task[TASK_FIELDS.wordpressApiUrl],
            categories: {
                isAdd: task[TASK_FIELDS.isAddCategories]
            },
            siteMap: {
                filter: {
                    onlyHtml: task[TASK_FIELDS.onlyHtml]
                },
                urls: task[TASK_FIELDS.urls]
            },
            title: {
                parser: {
                    regExp: task[TASK_FIELDS.tagTitle],
                    index: task[TASK_FIELDS.arraysIndex]
                },
                search: {
                    isStrong: task[TASK_FIELDS.isStrongSearch],
                    sortBy: task[TASK_FIELDS.orderBy],
                    order: task[TASK_FIELDS.order]
                }
            },
            wordpress: {
                login: task[TASK_FIELDS.username],
                password: task[TASK_FIELDS.password],
                url: task[TASK_FIELDS.wordpressApiUrl]
            },
            timeout: task[TASK_FIELDS.timeout]
        },
    };

    console.log(variables);

    const handleCreateTask = () => {
        createTask({
            variables
        }).then(closeDialog);
    }

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
                        Create Task
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleCreateTask}>
                        Create
                    </Button>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    margin: '20px auto',
                    '& > :not(style)': {m: 1, width: '60ch'},
                }}
            >
                <Accordion>
                    <SiteMap/>
                    <PostTitle/>
                    <Categories/>
                    <WordPressSettings/>
                    <TimeOut/>
                </Accordion>
            </Box>
        </Dialog>
    );
}