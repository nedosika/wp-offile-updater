import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Switch} from "@mui/material";
import {TASK_FIELDS, useTasksContext} from "../../contexts/TasksContext";
import AccordionItem from "../../components/Accordion/AccordionItem";


const Categories = () => {
    const {task, setTask} = useTasksContext();
    const handleChange = (event) => {
        setTask({[TASK_FIELDS.isAddCategories]: event.target.checked})
    }
    return (
        <AccordionItem title='Categories' description={task[TASK_FIELDS.isAddCategories] ? 'On' : 'Off'}>
            <FormControlLabel
                control={
                    <Switch
                        checked={task[TASK_FIELDS.isAddCategories]}
                        onChange={handleChange}
                    />
                }
                label="Add categories"
            />
        </AccordionItem>
    );
};

export default Categories;