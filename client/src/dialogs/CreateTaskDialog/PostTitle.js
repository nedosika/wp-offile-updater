import React from 'react';
import TextField from "@mui/material/TextField";
import {order, orderByList, TASK_FIELDS, useTasksContext} from "../../contexts/TasksContext";
import AccordionItem from "../../components/Accordion/AccordionItem";
import LabeledCheckBox from "../../ui/LabeledCheckBox";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const PostTitle = () => {
    const {task, setTask} = useTasksContext();
    return (
        <AccordionItem
            title='Title'
            description={task[TASK_FIELDS.tagTitle]}
        >
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
            <FormControl fullWidth>
                <InputLabel id="sort-by-label">Sort by</InputLabel>
                <Select
                    labelId="sort-by-label"
                    label="Sort by"
                    value={task[TASK_FIELDS.orderBy]}
                    onChange={(event) => setTask({
                        [TASK_FIELDS.orderBy]: event.target.value
                    })}
                >
                    <MenuItem value={orderByList.title}>Title</MenuItem>
                    <MenuItem value={orderByList.date}>Date</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="sort-label">Order</InputLabel>
                <Select
                    labelId="sort-label"
                    label="Order"
                    value={task[TASK_FIELDS.order]}
                    onChange={(event) => setTask({
                        [TASK_FIELDS.order]: event.target.value
                    })}
                >
                    <MenuItem value={order.asc}>ASC</MenuItem>
                    <MenuItem value={order.desc}>DESC</MenuItem>
                </Select>
            </FormControl>
        </AccordionItem>
    );
};

export default PostTitle;