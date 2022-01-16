import * as React from 'react'
import { useState } from 'react'
import {
    Button, Grid, Stack, Typography, TextField,
    InputLabel, MenuItem, Select, SelectChangeEvent, FormControl
} from '@mui/material'

const AddTask = ({ tags }) => {
    const [addTodo, setAddTodo] = useState(false)
    const [todo, setTodo] = useState('')
    const [inputTag, setInputTag] = useState('')
    const [customTag, setCustomTag] = useState(false)

    const showAddTodo = () => setAddTodo(true)
    const cancelAdd = () => {
        setCustomTag(false)
        setInputTag('')
        setAddTodo(false)
    }

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

    const handleCreateSubmit = (event) => {
        event.preventDefault()

        if (customTag) {
            console.log("test")
            handleCreateTag()
        }

        if (todo === '') return

        const todoBody = {
            title: todo,
            completed: false,
            tag: inputTag
        }

        const url = "/todos/create"
        const token = document.querySelector('meta[name="csrf-token"]').content

        fetch(url, {
            method: "POST",
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
                throw new Error("Network response was not okay")
            })
            .then(response => {
                console.log(response)
                //window.location.reload()
            })
            .catch(() => console.log('Error'))
    }

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ paddingTop: '3vh' }}
        >
            {
                !addTodo && <Button variant='contained' onClick={showAddTodo}>Add Todo</Button>
            }
            {
                addTodo && (
                    <Grid sx={{ width: '100%', maxWidth: 360 }} >
                        <form onSubmit={handleCreateSubmit}>
                            <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                                <TextField label="Task" id='outlined-basic' autoFocus onChange={handleChange} variant="outlined" multiline fullWidth />
                                {
                                    customTag && <TextField label="Tag" id='outlined-basic' autoFocus onChange={handleTagInput} variant="outlined" fullWidth />
                                }
                                {
                                    !customTag && (
                                        <FormControl fullWidth>
                                            <InputLabel id="simple-select-label">Tag</InputLabel>
                                            <Select
                                                value={inputTag}
                                                label="Tag"
                                                onChange={handleTagInput}
                                                fullWidth
                                                labelId="simple-select-label"
                                            >
                                                {
                                                    tags.map((cat, i) => {
                                                        return (
                                                            <MenuItem key={i} value={cat.tag}>{cat.tag}</MenuItem>
                                                        )
                                                    })
                                                }
                                                <MenuItem key={tags.length} value="Custom-tag">Create New Tag</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )
                                }
                                <Stack direction="row" spacing={2}>
                                    <Button variant='outlined' type='submit'>Add</Button>
                                    <Button variant='outlined' onClick={cancelAdd}>Cancel</Button>
                                </Stack>
                            </Stack>
                        </form>
                    </Grid>
                )
            }
        </Stack>
    )
}

export default AddTask