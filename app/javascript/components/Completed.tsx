import React from 'react'
import {
    Button,
    Checkbox,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Paper,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    checkbox: {
        '&$checked': {
            color: '#F5B369'
        },
    },
    checked: {},
    grid: {
        paddingTop: '10vh'
    },
    list: {
        width: '30vw'
    }
}))

const Completed = ({ completed }) => {
    const classes = useStyles()

    return (
        <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.grid}>
            <Paper elevation={3}>
                <List className={classes.list}>
                    {completed.map((todo, id) => <ListItem key={id}>{todo.title}</ListItem>)}
                </List>
            </Paper>
        </Grid>
    )
}

export default Completed