import * as React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const PendingItems = ({ todo, handleSubmit, labelId, handleDelete }) => {
    const [editing, setEditing] = React.useState(false)
    const [pendingTodo, setPendingTodo] = React.useState(todo)

    const handleClick = () => {
        setEditing(true)
    }

    const test = () => {
        handleDelete(pendingTodo)
    }

    const handleTitleChange = (event) => {
        setPendingTodo({
            ...pendingTodo,
            title: event.target.value
        })
    }

    const handleCompletedChange = (event) => {
        handleSubmit({
            ...pendingTodo,
            completed: event.target.checked
        })
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setEditing(false)
            handleSubmit(pendingTodo)
        }
    }

    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="comments" onClick={test}>
                    <DeleteIcon />
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton role={undefined} onClick={handleCompletedChange} dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={todo.completed}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText id={labelId} primary={todo.title} secondary={todo.tag} />
            </ListItemButton>
        </ListItem>
    )
}

export default PendingItems