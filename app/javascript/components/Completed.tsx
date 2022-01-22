import * as React from 'react'
import IndividualItems from './IndividualItems'
import { List, ListItemButton, ListItemText, Collapse, Paper } from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'

const Completed = ({ completed, handleSubmit, handleDelete, allCategories }) => {
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
                                <IndividualItems key={i} todo={todo} handleSubmit={handleSubmit} labelId={labelId} handleDelete={handleDelete} allCategories={allCategories} />
                            )
                        })
                    }
                </Collapse>
            </Paper>
        </List >
    )
}

export default Completed