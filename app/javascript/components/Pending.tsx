import * as React from 'react'
import { List, ListItem, ListItemButton, ListItemText, Checkbox } from '@mui/material'
import PendingItems from './PendingItems'

const Pending = ({ pending }) => {
    const handleSubmit = (body) => {
        const url = "/todos/update"
        const token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(url, {
            method: "PUT",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Network response was not ok")
            })
            .then(response => {
                console.log(response)
                window.location.reload()
            })
            .catch(() => console.log("Error"))
    }

    return (
        // <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'Background.paper' }}>
        //     {
        //         pending.map((todo, id) => {
        //             const labelId = `checkbox-list-secondary-label-${id}`
        //             return (
        //                 <ListItem
        //                     key={id}
        //                     secondaryAction={
        //                         <Checkbox
        //                             edge="end"
        //                             // onChange={handleToggle(id)}
        //                             checked={todo.completed}
        //                             inputProps={{ 'aria-labelledby': labelId }}
        //                         />
        //                     }
        //                     disablePadding
        //                 >
        //                     <ListItemButton>
        //                         <ListItemText id={labelId} primary={todo.title} />
        //                     </ListItemButton>
        //                 </ListItem>
        //             )
        //         })
        //     }
        // </List>
        <div>
            <h4>Pending</h4>
            {
                pending.map((todo, i) => {
                    return (
                        <PendingItems key={i} todo={todo} handleSubmit={handleSubmit} />
                    )
                })
            }
        </div>
    )
}

export default Pending