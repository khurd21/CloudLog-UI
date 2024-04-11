import { Box } from '@mui/material'
import ResponsiveAppBar from './Navbar'

const Layout = (props) => {
    return (
        <Box>
            <ResponsiveAppBar />
            <br />
            <Box>
                {props.children}
            </Box>
        </Box>
    )
}

export default Layout