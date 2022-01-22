import * as React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateTask from './UpdateTask';

const IndividualItems = ({ todo, handleSubmit, labelId, handleDelete, allCategories }) => {
    const [editing, setEditing] = React.useState(false)
    const [pendingTodo, setPendingTodo] = React.useState(todo)

    const handleClick = () => {
        setEditing(!editing)
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
        <>
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="comments" onClick={test}>
                        <DeleteIcon />
                    </IconButton>
                }
                disablePadding
            >
                <ListItemButton role={undefined} onDoubleClick={handleClick} dense>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={todo.completed}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                            onChange={handleCompletedChange}
                        />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={todo.title} secondary={todo.tag} />
                </ListItemButton>
            </ListItem>
            {
                editing && (
                    <UpdateTask task={todo} allTags={allCategories} />
                )
            }
        </>
    )
}

export default IndividualItems