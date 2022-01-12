import * as React from 'react'
import { List, ListItem, ListItemButton, ListItemText, Checkbox } from '@mui/material'
import PendingItems from './PendingItems'

const Completed = ({ completed }) => {
    const handleSubmit = (body) => {
        const url = "/todos/update"
        const token = document.querySelector('meta[name="csrf-token"]').content;
        console.log(body)
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

    const handleDelete = () => {
        const url = "/todos/delete"
        const token = document.querySelector('meta[name="csrf-token"]').content

        fetch(url, {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
            //body: JSON.stringify(body)
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
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
                completed.map((todo, i) => {
                    const labelId = `checkbox-list-label-${i}`
                    return (
                        <PendingItems key={i} todo={todo} handleSubmit={handleSubmit} labelId={labelId} id={i} handleDelete={handleDelete} />
                    )
                })
            }
        </List>
    )
}

export default Completed