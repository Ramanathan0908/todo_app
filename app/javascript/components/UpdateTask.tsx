import * as React from 'react'
import { useState } from 'react'
import {
    Button, Grid, Stack, Typography, TextField,
    InputLabel, MenuItem, Select, SelectChangeEvent, FormControl
} from '@mui/material'

const UpdateTask = ({ task }) => {
    const [todo, setTodo] = useState(task.title)
    const [tag, setTag] = useState(task.tag)
    const [completion, setCompletion] = useState(task.completed)

    const handleChange = (event) => {
        setTodo(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const todoBody = {
            title: todo,
            completed: completion,
            tag: tag
        }

        const url = "/todos/update"
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "PUT",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todoBody)
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Network response was not ok")
            })
            .then(response => {
                console.log(response)
                //window.location.reload()
            })
            .catch(() => console.log("Error"))
    }

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ paddingTop: '3vh' }}
        >

        </Stack>
    )
}