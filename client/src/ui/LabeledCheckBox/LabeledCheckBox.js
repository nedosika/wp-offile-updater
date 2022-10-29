import React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const LabeledCheckBox = ({label, onChange, disabled, checked}) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                />
            }
            label={label}
        />
    );
};

export default LabeledCheckBox;