import React from 'react';
import TextField from "@mui/material/TextField";
import {TASK_FIELDS, useTasksContext} from "../../contexts/TasksContext";
import AccordionItem from "../../components/Accordion/AccordionItem";
import LabeledCheckBox from "../../ui/LabeledCheckBox";

const PostTitle = () => {
    const {task, setTask} = useTasksContext();
    return (
        <AccordionItem title='Title'
              description={task[TASK_FIELDS.tagTitle]}>
            <TextField
                label="RegExp"
                variant="outlined"
                onChange={(event) => setTask({
                    [TASK_FIELDS.tagTitle]: event.target.value
                })}
                defaultValue={task[TASK_FIELDS.tagTitle]}
            />
            <TextField
                label="Index of results"
                variant="outlined"
                onChange={(event) => setTask({
                    [TASK_FIELDS.arraysIndex]: event.target.value < 0 ? 0 : event.target.value
                })}
                value={task[TASK_FIELDS.arraysIndex]}
                type="number"
            />
            <LabeledCheckBox
                label='Strong search'
                onChange={(event) => setTask({
                    [TASK_FIELDS.isStrongSearch]: event.target.checked
                })}
                checked={task[TASK_FIELDS.isStrongSearch]}
            />
        </AccordionItem>
    );
};

export default PostTitle;