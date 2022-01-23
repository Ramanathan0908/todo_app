import * as React from 'react'
import { List, ListItem, Paper, Typography } from '@mui/material'
import IndividualItems from './IndividualItems'

const Pending = ({ pending, handleSubmit, handleDelete, allCategories }) => {

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', backgroundColor: '#D7EAE9', paddingTop: '2vh' }}>
            <Paper elevation={4}>
                {
                    pending.length == 0 && (
                        <Typography variant="h5" gutterBottom align='center' color='secondary' component="div" sx={{ paddingTop: '2vh', paddingBottom: '2vh', color: '#001f3f' }}>
                            Yay no tasks!
                        </Typography>
                    )
                }
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