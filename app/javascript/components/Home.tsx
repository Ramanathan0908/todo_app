import React, { useState, useEffect } from 'react';
import { Grid, Paper, Box } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material';
import Completed from './Completed';
import Pending from './Pending';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const Home = () => {
    const [todos, setTodos] = useState({ completed: [], uncompleted: [] });
    const [loading, setLoading] = useState(true);
    const [addTodo, setAddTodo] = useState(false)
    const [todo, setTodo] = useState('')

    const fetchTodos = async () => {
        const url = "/todos/all_todos"
        const res = await fetch(url)
        const data = await res.json()

        return data
    }

    useEffect(() => {
        const getTodos = async () => {
            const todosFromServer = await fetchTodos()
            setTodos(todosFromServer)
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

    const handleSubmit = (event) => {
        event.preventDefault()

        if (todo === '') return

        const todoBody = {
            title: todo,
            completed: false
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

    return (
        <div style={{ backgroundColor: '#D7EAE9', minHeight: '100vh', height: '100%' }}>
            <ThemeProvider theme={lightTheme}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    {/* <Item key={3} elevation={3}>
                        <h1>Todo</h1>
                    </Item> */}
                    <Item key={3} elevation={3}>
                        {
                            !addTodo && <button type="button" className="btn btn-primary align-right" onClick={showAddTodo}>Add Todo</button>
                        }
                        {
                            addTodo && (
                                <form className="add-todo" onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <div className="col-9">
                                            <input type="text" className="form-control-plaintext mr-3" autoFocus placeholder="Todo Item" onChange={handleChange} />
                                        </div>
                                        <button type="submit" className="btn btn-primary col mr-2">Add</button>
                                        <button className="btn btn-outline-primary col" onClick={cancelAdd}>Cancel</button>
                                    </div>
                                </form>
                            )
                        }
                    </Item>
                    <hr />
                    <Pending pending={todos.uncompleted} />
                    <hr />
                    <Completed completed={todos.completed} />
                </Grid>
            </ThemeProvider>
        </div>
    )
}

export default Home;