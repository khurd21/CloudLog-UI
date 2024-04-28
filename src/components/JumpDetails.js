import { useState, useEffect } from 'react'
import { AccordionDetails, Box, Button, Grid } from '@mui/material'
import JumpType from './JumpType'
import { LabeledDropdown, LabeledTextField } from './LabeledTextField'

const JumpDetails = ({ jump, onChange }) => {
    const [jumpState, setJumpState] = useState(jump)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        setJumpState(jump);
    }, [jump]);

    const handleEditClick = () => {
        setEditMode(true)
    }

    const handleSaveClick = () => {
        setEditMode(false)
        onChange(jumpState)
    }

    const handleChange = (field, value) => {
        // Update the jump state with the new value
        console.log('Field:', field, 'Value:', value)
        setJumpState(prevJump => ({
            ...prevJump,
            [field]: value
        }))
    }

    return (
        <AccordionDetails>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
                    <LabeledTextField label="Date" value={jumpState.date} disabled={!editMode} onChange={ (value) => handleChange('date', value) } />
                </Grid>
                <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
                    <LabeledDropdown label="Type" value={jumpState.jumpType} options={Object.values(JumpType)} fullWidth disabled={!editMode} onChange={ (value) => handleChange('jumpType', value) } />
                </Grid>
                <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
                    <LabeledTextField label="Dropzone" value={jumpState.dropzone} disabled={!editMode} onChange={ (value) => handleChange('dropzone', value) } />
                </Grid>
                <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
                    <LabeledTextField label="Aircraft" value={jumpState.aircraft} disabled={!editMode} onChange={ (value) => handleChange('aircraft', value) } />
                </Grid>
                <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
                    <LabeledTextField label="Description" value={jumpState.description} disabled={!editMode} fullWidth multiline onChange={ (value) => handleChange('description', value) } />
                </Grid>
                <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
                    <LabeledTextField label="Signed by" value={jumpState.signedBy} disabled={!editMode} onChange={ (value) => handleChange('signedBy', value) } />
                </Grid>
                <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
                    <LabeledTextField label="USPA #" value={jumpState.uspaNumber} disabled={!editMode} onChange={ (value) => handleChange('uspaNumber', value) } />
                </Grid>
            </Grid>
            <Box mt={2} textAlign="center" width="100%">
                {editMode ? (
                    <Button variant="contained" color="inherit" onClick={handleSaveClick}>
                        Save
                    </Button>
                ) : (
                    <Button variant="contained" color="inherit" onClick={handleEditClick}>
                        Edit
                    </Button>
                )}
            </Box>
        </AccordionDetails>
    )
}

export default JumpDetails