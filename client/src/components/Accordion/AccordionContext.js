import React, {createContext, useContext} from "react";

const AccordionContext = createContext({});

export const useAccordion = () => useContext(AccordionContext);

const Accordion = ({children, defaultOpened = ''}) => {
    const [expanded, setExpanded] = React.useState(defaultOpened);

    const toggle = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return <AccordionContext.Provider value={{expanded, toggle}}>
        <div>{children}</div>
    </AccordionContext.Provider>
}

export default Accordion;