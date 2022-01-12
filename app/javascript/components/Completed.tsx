import * as React from 'react'
import { List, ListItem, ListItemButton, ListItemText, Checkbox } from '@mui/material'
import PendingItems from './PendingItems'
import { Paper } from '@material-ui/core'

const Completed = ({ completed, handleSubmit, handleDelete }) => {

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', backgroundColor: '#D7EAE9' }} >
            <Paper elevation={4}>
                {
                    completed.map((todo, i) => {
                        const labelId = `checkbox-list-label-${i}`
                        return (
                            <PendingItems key={i} todo={todo} handleSubmit={handleSubmit} labelId={labelId} handleDelete={handleDelete} />
                        )
                    })
                }
            </Paper>
        </List >
    )
}

export default Completed