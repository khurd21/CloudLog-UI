import { AccordionDetails, Box, Button, Grid } from '@mui/material'
import { JumpType } from './JumpType'
import { LabeledDropdown, LabeledTextField } from './LabeledTextField'

const AddJump = ({ jump, onChange, onClick }) => {
    return (
        <AccordionDetails>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <LabeledTextField label="Date" value={jump.date} onChange={(value) => onChange('date', value)} />
                </Grid>
                <Grid item>
                    <LabeledDropdown label="Type" value={jump.jumpType} options={Object.values(JumpType)} fullWidth onChange={(value) => onChange('jumpType', value)} />
                </Grid>
                <Grid item>
                    <LabeledTextField label="Dropzone" value={jump.dropzone} onChange={(value) => onChange('dropzone', value)} />
                </Grid>
                <Grid item>
                    <LabeledTextField label="Aircraft" value={jump.aircraft} onChange={(value) => onChange('aircraft', value)} />
                </Grid>
                <Grid item xs={12}>
                    <LabeledTextField label="Description" value={jump.description} fullWidth multiline onChange={(value) => onChange('description', value)} />
                </Grid>
                <Grid item>
                    <LabeledTextField label="Signed by" value={jump.signedBy} onChange={(value) => onChange('signedBy', value)} />
                </Grid>
                <Grid item>
                    <LabeledTextField label="USPA #" value={jump.signersLicenseNumber} onChange={(value) => onChange('signersLicenseNumber', value)} />
                </Grid>
            </Grid>
            <Box mt={2} textAlign="center" width="100%">
                <Button variant="contained" color="inherit" onClick={onClick}>
                    Save
                </Button>
            </Box>
        </AccordionDetails>
    )
}

export default AddJump