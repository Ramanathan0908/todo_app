import React, { useState, useEffect } from 'react';
import { Grid, Paper, Box } from '@mui/material';
import { createTheme, ThemeProvider, styled, Button, Stack, Typography } from '@mui/material';
import Completed from './Completed';
import Pending from './Pending';
import BasicTabs from './Tabs';
import { TextField } from '@material-ui/core';
import { InputLabel, MenuItem, Select, SelectChangeEvent, FormControl } from '@mui/material';

const Home = () => {
    const [todos, setTodos] = useState({ completed: [], uncompleted: [] });
    const [tag, setTag] = useState({ tags: [] })
    const [loading, setLoading] = useState(true);
    const [addTodo, setAddTodo] = useState(false)
    const [todo, setTodo] = useState('')
    const [inputTag, setInputTag] = useState('')

    const fetchTodos = async () => {
        const url = "/todos/all_todos"
        const res = await fetch(url)
        const data = await res.json()

        return data
    }

    const fetchTags = async () => {
        const url = "/todos/all_tags"
        const res = await fetch(url)
        const data = await res.json()

        return data
    }

    useEffect(() => {
        const getTodos = async () => {
            const todosFromServer = await fetchTodos()
            setTodos(todosFromServer)
            const tagsFromServer = await fetchTags()
            setTag(tagsFromServer)
            setLoading(false)
        }
        getTodos()
    }, []);

    const showAddTodo = () => {
        setAddTodo(true)
    }

    const cancelAdd = () => {
        setAddTodo(false)
    }

    const handleChange = (event) => {
        setTodo(event.target.value)
    }

    const handleTagInput = (event) => {
        setInputTag(event.target.value)
    }

    const handleCreateSubmit = (event) => {
        event.preventDefault()

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
                window.location.reload()
            })
            .catch(() => console.log('Error'))
    }

    const handleUpdateSubmit = (body) => {
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

    const handleDelete = (body) => {
        const url = "/todos/delete"
        const token = document.querySelector('meta[name="csrf-token"]').content

        fetch(url, {
            method: "DELETE",
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
        <div style={{ backgroundColor: '#D7EAE9', minHeight: '100vh', height: '100%' }}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ paddingTop: '5vh', paddingBottom: '5vh' }}
            >
                <Typography variant="h5" gutterBottom component="div">
                    Your Todos
                </Typography>
                <BasicTabs tags={tag.tags} />
                <Pending pending={todos.uncompleted} handleSubmit={handleUpdateSubmit} handleDelete={handleDelete} />
                <Completed completed={todos.completed} handleSubmit={handleUpdateSubmit} handleDelete={handleDelete} />
                {
                    !addTodo && <Button variant='contained' onClick={showAddTodo}>Add Todo</Button>
                }
                {
                    addTodo && (
                        <Grid sx={{ width: '100%', maxWidth: 360 }} >
                            <form onSubmit={handleCreateSubmit}>
                                <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                                    <TextField label="Task" id='outlined-basic' autoFocus onChange={handleChange} variant="outlined" multiline fullWidth />
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
                                                tag.tags.map((cat, i) => {
                                                    return (
                                                        <MenuItem key={i} value={cat.tag}>{cat.tag}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
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
        </div >
    )
}

export default Home;