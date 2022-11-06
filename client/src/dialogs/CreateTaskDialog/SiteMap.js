import React from 'react';

import {JsonURLsParser, XmlURLsParser} from "../../helpers/URLsParser";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import {useSnackbar} from "notistack";
import {TASK_FIELDS, useTasksContext} from "../../contexts/TasksContext";
import AccordionItem from "../../components/Accordion/AccordionItem";
import LabeledCheckBox from "../../ui/LabeledCheckBox";

const SiteMap = () => {
    const {task, setTask} = useTasksContext();
    const {enqueueSnackbar} = useSnackbar();

    const handleLoad = (parser) => ({target: {files}}) => {
        parser
            .parse(files[0])
            .then((urls) => {
                const filteredUrls = urls.filter((url) =>
                    task[TASK_FIELDS.onlyHtml] ? url.includes('.html') : true
                ).filter((url) => !url.includes('?'));
                setTask({[TASK_FIELDS.urls]: filteredUrls });
                enqueueSnackbar(`Loaded ${filteredUrls.length} url(s)`, {variant: 'success'});
            });
    }

    return (
        <AccordionItem title='Sitemap' description={`Loaded ${task[TASK_FIELDS.urls].length} urls`}>
            <LabeledCheckBox
                label='Only .html'
                onChange={(event) => setTask({
                    [TASK_FIELDS.onlyHtml]: event.target.checked
                })}
                disabled={task[TASK_FIELDS.isLoading]}
                checked={task[TASK_FIELDS.onlyHtml]}
            />
            <LoadingButton variant="contained" component="label">
                JSON
                <input
                    type="file"
                    hidden
                    onChange={handleLoad(new JsonURLsParser())}
                />
            </LoadingButton>
            <LoadingButton variant="contained" component="label">
                XML
                <input
                    type="file"
                    hidden
                    onChange={handleLoad(new XmlURLsParser())}
                />
            </LoadingButton>
        </AccordionItem>
    );
};

export default SiteMap;