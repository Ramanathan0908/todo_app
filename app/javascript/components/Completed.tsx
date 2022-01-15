import * as React from 'react'
import { List, ListItem, ListItemButton, ListItemText, Checkbox } from '@mui/material'
import PendingItems from './IndividualItems'
import { Paper } from '@material-ui/core'
import { Collapse } from '@mui/material'
import { ExpandMore, ExpandLess, StarBorder } from '@mui/icons-material'

const Completed = ({ completed, handleSubmit, handleDelete }) => {
    const [open, setOpen] = React.useState(false)

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <List sx={{
            width: '100%', maxWidth: 360, bgcolor: 'background.paper',
            backgroundColor: '#D7EAE9'
        }} component="nav" >
            <Paper elevation={4}>
                <ListItemButton onClick={handleClick}>
                    <ListItemText primary="Completed" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {
                        completed.map((todo, i) => {
                            const labelId = `checkbox-list-label-${i}`
                            return (
                                <PendingItems key={i} todo={todo} handleSubmit={handleSubmit} labelId={labelId} handleDelete={handleDelete} />
                            )
                        })
                    }
                </Collapse>
            </Paper>
        </List >
    )
}

export default Completed