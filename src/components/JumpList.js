import { React, useState, useEffect } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Typography } from '@mui/material'
import JumpType from './JumpType'
import JumpDetails from './JumpDetails'
import AddJump from './AddJump'
import { logJump } from '../logbook-api'

const jumpList = [
    { jumpNumber: 1, date: '2022-01-01', jumpType: JumpType.Belly, dropzone: 'Skydive City', aircraft: 'Twin Otter' },
    { jumpNumber: 2, date: '2022-01-05', jumpType: JumpType.Freefly, dropzone: 'Skydive Perris', aircraft: 'Cessna 182' },
    { jumpNumber: 3, date: '2022-01-10', jumpType: JumpType.HighPull, dropzone: 'Empuriabrava', aircraft: 'Beechcraft King Air' },
    { jumpNumber: 4, date: '2022-01-15', jumpType: JumpType.CRW, dropzone: 'Zephyrhills Skydive City', aircraft: 'Twin Otter' },
    { jumpNumber: 5, date: '2022-01-20', jumpType: JumpType.AFF, dropzone: 'Skydive Dubai', aircraft: 'Pilatus Porter' },
    // Add more jumps as needed
]

const defaultJumpDetails = {
    jumpNumber: 0,
    date: '',
    jumpType: JumpType.NONE,
    aircraft: '',
    altitude: 0,
    pullAltitude: 0,
    windSpeedKnots: 0,
    parachute: '',
    parachuteSize: 0,
    dropzone: '',
    description: '',
    signedBy: '',
    signersLicenseNumber: ''
}

const sort = (jumps) => {
    return jumps.sort((a, b) => b.jumpNumber - a.jumpNumber)
}

const JumpList = () => {
    const [jumps, setJumps] = useState(sort(jumpList)) // State to keep track of jumps
    const [newJump, setNewJump] = useState({ ...defaultJumpDetails })
    const [isAddingNewJump, setIsAddingNewJump] = useState(false)

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

    const handleSaveJump = () => {
        if (isAddingNewJump) {
            // logJump({ jump: newJump })
            // TODO: It looks like the index 0 is still the original value..
            console.log('handling save jump: ' + JSON.stringify(newJump))
            setJumps(prevJumps => {
                const updatedJumps = [...prevJumps, newJump]
                console.log(`New JumpList end: ${JSON.stringify(updatedJumps[updatedJumps.length - 1])}`)
                return sort(updatedJumps)
            })
            console.log(`Set jumps end: ${JSON.stringify(jumps[0])}`)
        }
        setIsAddingNewJump(false)
    }

    const handleJumpDetailsChange = (jump) => {
        //setJumps(prevJumps => prevJumps.map(j => j.jumpNumber === jump.jumpNumber ? jump : j))
    }

    const handleNewJumpChange = (field, value) => {
        setNewJump(prevJump => ({
            ...prevJump,
            [field]: value
        }))
    }

    useEffect(() => {
        console.log(`Set jumps end: ${JSON.stringify(jumps[0])}`);
    }, [jumps]);

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