import React from 'react';
import AccordionItem from "../../components/Accordion/AccordionItem";
import {Slider} from "@mui/material";
import {TASK_FIELDS, useTasksContext} from "../../contexts/TasksContext";

const marks = [...(new Array(11))].map((item, index) => ({value: index * 0.5, label: `${index * 0.5}s`}));

const TimeOut = () => {
    const {task, setTask} = useTasksContext();
    return (
        <AccordionItem title='Timeout' description={`${task[TASK_FIELDS.timeout]}s`}>
            <Slider
                value={task[TASK_FIELDS.timeout]}
                valueLabelDisplay="auto"
                step={0.5}
                marks={marks}
                min={0}
                max={5}
                onChange={({target: {value}}) => {
                    setTask({
                        [TASK_FIELDS.timeout]: value
                    })
                }}
                disabled={task[TASK_FIELDS.isLoading]}
            />
        </AccordionItem>
    );
};

export default TimeOut;