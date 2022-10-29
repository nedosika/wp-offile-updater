import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Stack, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useAccordion} from "./AccordionContext";

const AccordionItem = ({children, title, description = ''}) => {
    const {expanded, toggle} = useAccordion();

    return (
        <Accordion expanded={expanded === title} onChange={toggle(title)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
            >
                <Typography sx={{width: '40%', flexShrink: 0}}>
                    {title}
                </Typography>
                <Typography sx={{color: 'text.secondary'}}>{description}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={2}>
                    {children}
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionItem;