import { React, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import JumpType from './JumpType';

const jumpList = [
    { jumpNumber: 1, date: '2022-01-01', jumpType: JumpType.Belly, dropzone: 'Skydive City', aircraft: 'Twin Otter' },
    { jumpNumber: 2, date: '2022-01-05', jumpType: JumpType.Freefly, dropzone: 'Skydive Perris', aircraft: 'Cessna 182' },
    { jumpNumber: 3, date: '2022-01-10', jumpType: JumpType.HighPull, dropzone: 'Empuriabrava', aircraft: 'Beechcraft King Air' },
    { jumpNumber: 4, date: '2022-01-15', jumpType: JumpType.CRW, dropzone: 'Zephyrhills Skydive City', aircraft: 'Twin Otter' },
    { jumpNumber: 5, date: '2022-01-20', jumpType: JumpType.AFF, dropzone: 'Skydive Dubai', aircraft: 'Pilatus Porter' },
    // Add more jumps as needed
];

const LabeledDropdown = ({ label, defaultValue, options, fullWidth, disabled }) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    const handleToggle = (event) => {
        setSelectedValue(event.target.value);
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

const LabeledTextField = ({ label, defaultValue, multiline, fullWidth, disabled }) => {
    return (
        <div style={{ marginBottom: '50px', marginRight: '50px' }}>
            <Typography style={{ fontWeight: 'bold', marginRight: '8px' }}>{label}:</Typography>
            <TextField defaultValue={defaultValue} multiline={multiline} fullWidth={fullWidth} disabled={disabled}/>
        </div> 
    )
}

const JumpDetails = ({ jump, onEditClick, onSaveClick, editMode }) => {
    return (
        <AccordionDetails>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <LabeledTextField label="Date" defaultValue={jump.date} disabled={!editMode} />
                </Grid>
                <Grid item>
                    <LabeledDropdown label="Type" defaultValue={jump.jumpType} options={Object.values(JumpType)} fullWidth disabled={!editMode} />
                </Grid>
                <Grid item>
                    <LabeledTextField label="Dropzone" defaultValue={jump.dropzone} disabled={!editMode} />
                </Grid>
                <Grid item>
                    <LabeledTextField label="Aircraft" defaultValue={jump.aircraft} disabled={!editMode} />
                </Grid>
                <Grid item xs={12}>
                    <LabeledTextField label="Description" defaultValue={jump.description} disabled={!editMode} fullWidth multiline />
                </Grid>
                <Grid item>
                    <LabeledTextField label="Signed by" defaultValue={jump.signedBy} disabled={!editMode} />
                </Grid>
                <Grid item>
                    <LabeledTextField label="USPA #" defaultValue={jump.uspaNumber} disabled={!editMode} />
                </Grid>
            </Grid>
            <Box mt={2} textAlign="center" width="100%">
                {editMode ? (
                    <Button variant="contained" color="secondary" onClick={onSaveClick}>
                        Save
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={onEditClick}>
                        {jump.isNew ? 'Add' : 'Edit'}
                    </Button>
                )}
            </Box>
        </AccordionDetails>
    );
}

// TODO: Make the Typography , TextField items be their own component. Then you can use the flex and space-between to maybe center them
const JumpList = () => {
    const [jumps, setJumps] = useState(jumpList); // State to keep track of jumps
    const [newJump, setNewJump] = useState(null); // State for the newly added jump
    const handleNewJump = () => {
        // Create a new jump with some default values
        const defaultJump = {
            jumpNumber: 'New Jump',
            date: '',
            jumpType: '',
            aircraft: '',
            dropzone: ''
        };
        setNewJump(defaultJump);
    };
    const handleSaveJump = () => {
        // Add the newly added jump to the jumps list
        setJumps([...jumps, newJump]);
        // Clear the new jump state
        setNewJump(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewJump(prevJump => ({
            ...prevJump,
            [name]: value
        }));
    };
    return (
        <div style={{ width: '75%', margin: '0 auto' }}>
            <Typography variant="subtitle1">Summary:</Typography>
            <Typography variant="body2" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>#</span>
                <span>Date</span>
                <span>Type</span>
                <span>Aircraft</span>
                <span>Dropzone</span>
            </Typography>
            {jumps.map((jump, index) => (
                <Accordion key={index}>
                    <AccordionSummary style={{ width: '100%' }}>
                        <Typography variant="body2" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <span>{jump.jumpNumber}</span>
                            <span>{jump.date}</span>
                            <span>{jump.jumpType}</span>
                            <span>{jump.aircraft}</span>
                            <span>{jump.dropzone}</span>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <JumpDetails jump={jump} />
                    </AccordionDetails>
                </Accordion>
            ))}
            <Button variant="contained" color="primary" style={{ marginTop: '20px', marginBottom: '20px' }} onClick={handleNewJump}>
                New Jump
            </Button>

            {newJump && (
                <div style={{ marginBottom: '20px' }}>
                    <Typography variant="body2" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                        New Jump
                    </Typography>
                    <TextField
                        label="Jump Number"
                        name="jumpNumber"
                        value={newJump.jumpNumber}
                        onChange={handleInputChange}
                        variant="outlined"
                        style={{ marginBottom: '8px' }}
                    />
                    {/* Add other input fields for jump details */}
                    <Button variant="contained" color="primary" onClick={handleSaveJump}>
                        Save Jump
                    </Button>
                </div>
            )}
        </div>
    );
}


export default JumpList;