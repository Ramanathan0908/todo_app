import * as React from 'react'
import { useState } from 'react'
import {
    Button, Grid, Stack, Typography, TextField,
    InputLabel, MenuItem, Select, SelectChangeEvent,
    FormControl, Box
} from '@mui/material'

const UpdateTask = ({ task, allTags }) => {
    const [task1, setTask1] = useState(task)
    const [todo, setTodo] = useState(task.title)
    const [tag, setTag] = useState(task.tag)
    const [completion, setCompletion] = useState(task.completed)
    const [inputTag, setInputTag] = useState('')
    const [customTag, setCustomTag] = useState(false)

    const handleChange = (event) => {
        setTodo(event.target.value)
    }

    const handleTagInput = (event) => {
        if (event.target.value == "Custom-tag") {
            setCustomTag(true)
        } else {
            //setCustomTag(false)
            setInputTag(event.target.value)
        }
    }

    const handleCreateTag = () => {
        if (inputTag === '') return

        const tagBody = {
            tag: inputTag
        }

        const url = "/todos/tag/create"
        const token = document.querySelector('meta[name="csrf-token"]').content

        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tagBody)
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Network response was not okay")
            })
            .then(response => {
                console.log(response)
                //window.location.reload()
            })
            .catch(() => console.log('Error'))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const todoBody = {
            ...task1,
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
        <form onSubmit={handleSubmit} onKeyDown={() => console.log("key2")}>
            < Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ paddingTop: '1vh' }}
            >
                <TextField sx={{ minWidth: 220 }} label="Task" id='outlined-basic' autoFocus onChange={handleChange} variant="outlined" multiline />
                {
                    customTag && <TextField label="Tag" id='outlined-basic' autoFocus onChange={handleTagInput} variant="outlined" fullWidth />
                }
                {
                    !customTag && (
                        <FormControl sx={{ minWidth: 220 }} onKeyDown={() => console.log("key down")} >
                            <InputLabel id="simple-select-label">Tag</InputLabel>
                            <Select
                                value={inputTag}
                                label="Tag"
                                onChange={handleTagInput}
                                fullWidth
                                labelId="simple-select-label"
                            >
                                {
                                    allTags.map((cat, i) => {
                                        return (
                                            <MenuItem key={i} value={cat.tag}>{cat.tag}</MenuItem>
                                        )
                                    })
                                }
                                <MenuItem key={allTags.length} value="Custom-tag">Create New Tag</MenuItem>
                            </Select>
                        </FormControl>
                    )
                }
                <Button type='submit'>update</Button>
            </Stack>
        </form >
    )
}

export default UpdateTask