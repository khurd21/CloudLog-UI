import { useState } from 'react';
import { Grid, MenuItem, Select, TextField, Typography } from '@mui/material';

const LabeledDropdown = ({ label, value, options, fullWidth, disabled, onChange }) => {
    const [selectedValue, setSelectedValue] = useState(value);
    const handleToggle = (event) => {
        setSelectedValue(event.target.value);
        onChange(event.target.value);
    };

    return (
        <Grid item>
            <div style={{ marginBottom: '50px', marginRight: '50px' }}>
                <Typography style={{ fontWeight: 'bold', marginRight: '8px' }}>{label}:</Typography>
                <Select
                    value={selectedValue}
                    onChange={handleToggle}
                    fullWidth={fullWidth}
                    disabled={disabled}
                    size='small'
                >
                    {options.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        </Grid>
    )
}

const LabeledTextField = ({ label, value, multiline, fullWidth, disabled, onChange }) => {
    const handleChange = (event) => {
        console.log('handleChange', event.target.value)
        onChange(event.target.value);
    };

    return (
        <div style={{ marginBottom: '50px', marginRight: '50px' }}>
            <Typography style={{ fontWeight: 'bold', marginRight: '8px' }}>{label}:</Typography>
            <TextField label={label} value={value} multiline={multiline} fullWidth={fullWidth} disabled={disabled} onChange={handleChange} size='small' />
        </div> 
    )
}

export { LabeledDropdown, LabeledTextField }