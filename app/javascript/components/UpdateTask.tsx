import * as React from 'react'
import { useState } from 'react'
import {
    Button, Grid, Stack, Typography, TextField,
    InputLabel, MenuItem, Select, SelectChangeEvent,
    FormControl, Box, NativeSelect
} from '@mui/material'

const UpdateTask = ({ task, allTags }) => {
    const [todo, setTodo] = useState(task)
    const [inputTag, setInputTag] = useState(task.tag)
    const [customTag, setCustomTag] = useState(false)

    const handleChange = (event) => {
        setTodo({
            ...todo,
            title: event.target.value
        })
    }

    const handleTagInput = (event) => {
        if (event.target.value == "Custom-tag") {
            setCustomTag(true)
        } else {
            //setCustomTag(false)
            setInputTag(event.target.value)
            setTodo({
                ...todo,
                tag: event.target.value
            })
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

        if (customTag) {
            handleCreateTag()
        }

        const todoBody = {
            ...todo,
            title: todo.title,
            completed: todo.completion,
            tag: inputTag
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
        <form onSubmit={handleSubmit} >
            < Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ paddingTop: '1vh' }}
            >
                <TextField sx={{ minWidth: 220 }} label="Task" id='outlined-basic' autoFocus onChange={handleChange} variant="outlined" multiline defaultValue={task.title} />
                {
                    customTag && <TextField label="Tag" id='outlined-basic' autoFocus onChange={handleTagInput} variant="outlined" sx={{ minWidth: 220 }} />
                }
                {
                    !customTag && (
                        <FormControl sx={{ minWidth: 220 }} >
                            <InputLabel id="simple-select-label">Tag</InputLabel>
                            <NativeSelect
                                defaultValue={inputTag}
                                fullWidth
                                inputProps={{
                                    name: 'tag',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                {
                                    allTags.map((cat, i) => {
                                        return (
                                            <option key={i} value={cat.tag}>{cat.tag}</option>
                                        )
                                    })
                                }
                                <option key={allTags.length} value="Custom-tag">Create New Tag</option>
                            </NativeSelect>
                        </FormControl>
                    )
                }
                <Button type='submit'>update</Button>
            </Stack>
        </form >
    )
}

export default UpdateTask