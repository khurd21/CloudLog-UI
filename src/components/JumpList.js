import { React, useCallback, useState, useEffect } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Typography } from '@mui/material'
import { JumpType, JumpTypeToEnum } from './JumpType'
import JumpDetails from './JumpDetails'
import AddJump from './AddJump'
import isAuth from '../auth'
import { Navigate } from 'react-router-dom'
import * as api from '../logbook-api'

const defaultJumpDetails = {
    jumpNumber: 0,
    date: '',
    jumpType: JumpType.NONE,
    aircraft: '',
    altitude: 0,
    pullAltitude: 0,
    windSpeedKnots: 0,
    parachute: '',
    // TODO: change back to zero when properly have field
    parachuteSize: 99,
    dropzone: '',
    description: '',
    signedBy: '',
    signersLicenseNumber: ''
}

const sort = (jumps) => {
    return jumps.sort((a, b) => b.jumpNumber - a.jumpNumber)
}

const JumpList = ({ element, requireAuth, ...rest }) => {

    const { isAuthenticated } = isAuth()
    const [jumps, setJumps] = useState([]) // State to keep track of jumps
    const [newJump, setNewJump] = useState({ ...defaultJumpDetails })
    const [isAddingNewJump, setIsAddingNewJump] = useState(false)

    const fetchJumps = useCallback(async () => {
        if (isAuthenticated) {
            api.getJump(1, 10000)
                .then(response => setJumps(sort(response.data.jumps)))
                .catch(error => console.error('Error fetching jumps: ', error))
        }
    }, [isAuthenticated])

    useEffect(() => {
        fetchJumps()
    }, [isAuthenticated, fetchJumps]);

    if (!isAuthenticated && requireAuth) {
        return <Navigate to='/login' />
    }

    const handleNewJump = () => {
        // Create a new jump with some default values
        if (isAddingNewJump) {
            setNewJump({ ...defaultJumpDetails })
            setIsAddingNewJump(false)
            return
        }
        var defaultJump = { ...defaultJumpDetails }
        defaultJump.jumpNumber = jumps.length + 1
        setNewJump(defaultJump)
        setIsAddingNewJump(true)
    }

    const handleSaveJump = async () => {
        if (isAddingNewJump) {
            newJump.jumpType = JumpTypeToEnum(newJump.jumpType)
            console.log('handling save jump: ' + JSON.stringify(newJump))
            await api.logJump(newJump)
            await fetchJumps()
        }
        setIsAddingNewJump(false)
    }

    const handleJumpDetailsChange = (jump) => {
        setJumps(prevJumps => prevJumps.map(j => j.jumpNumber === jump.jumpNumber ? jump : j))
    }

    const handleNewJumpChange = (field, value) => {
        setNewJump(prevJump => ({
            ...prevJump,
            [field]: value
        }))
    }

    return (
        <div style={{ width: '75%', margin: '0 auto' }}>
            <center>
                <h1>LogBook</h1>
                <Typography variant='body2' style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span style={{ width: '10%', textAlign: 'left' }}>#</span>
                    <span style={{ width: '25%', textAlign: 'left' }}>Date</span>
                    <span style={{ width: '20%', textAlign: 'left' }}>Type</span>
                    <span style={{ width: '25%', textAlign: 'left' }}>Dropzone</span>
                </Typography>
                <div style={{ maxHeight: '50vh', overflowY: 'scroll' }}>
                    {jumps.map((jump, index) => (
                        <Accordion key={index}>
                            <AccordionSummary style={{ width: '100%' }}>
                                <Typography variant="body2" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <span style={{ width: '10%', textAlign: 'left' }}>{jump.jumpNumber}</span>
                                    <span style={{ width: '25%', textAlign: 'left' }}>{jump.date}</span>
                                    <span style={{ width: '20%', textAlign: 'left' }}>{jump.jumpType}</span>
                                    <span style={{ width: '25%', textAlign: 'left' }}>{jump.dropzone}</span>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <JumpDetails jump={jump} onChange={handleJumpDetailsChange} />
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
                <br></br>
                <Divider sx={{ fontWeight: 'bold' }} />
                <Button variant="contained" color="inherit" style={{ marginTop: '20px', marginBottom: '20px' }} onClick={handleNewJump}>
                    {isAddingNewJump ? 'Cancel' : 'Add Jump'}
                </Button>

                {isAddingNewJump && (
                    <AddJump jump={newJump} onChange={handleNewJumpChange} onClick={handleSaveJump} />
                )}
            </center>
        </div>
    )
}

export default JumpList