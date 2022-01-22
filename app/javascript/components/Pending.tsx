import * as React from 'react'
import { List, ListItem, Paper } from '@mui/material'
import IndividualItems from './IndividualItems'

const Pending = ({ pending, handleSubmit, handleDelete, allCategories }) => {

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', backgroundColor: '#D7EAE9' }}>
            <Paper elevation={4}>
                {
                    pending.map((todo, i) => {
                        const labelId = `checkbox-list-label-${i}`
                        return (
                            <IndividualItems key={i} todo={todo} handleSubmit={handleSubmit} labelId={labelId} handleDelete={handleDelete} allCategories={allCategories} />
                        )
                    })
                }
            </Paper>
        </List>
    )
}

export default Pending