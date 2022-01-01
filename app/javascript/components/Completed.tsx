import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'

export default function CheckboxListSecondary({ completed }) {
    const [checked, setChecked] = React.useState([1])

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    return (
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'Background.paper' }}>
            {
                completed.map((todo, id) => {
                    const labelId = `checkbox-list-secondary-label-${id}`
                    return (
                        <ListItem
                            key={id}
                            secondaryAction={
                                <Checkbox
                                    edge="end"
                                    // onChange={handleToggle(id)}
                                    checked={todo.completed}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            }
                            disablePadding
                        >
                            <ListItemButton>
                                <ListItemText id={labelId} primary={todo.title} />
                            </ListItemButton>
                        </ListItem>
                    )
                })
            }
        </List>
    )
}