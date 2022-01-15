import * as React from 'react'
import { List, ListItem, ListItemButton, ListItemText, Checkbox, Stack } from '@mui/material'
import { Paper } from '@material-ui/core'
import { ListSubheader, ListItemIcon, Collapse } from '@mui/material'
import { ExpandMore, ExpandLess, StarBorder } from '@mui/icons-material'
import Pending from './Pending'
import Completed from './Completed'

const Dispatcher = ({ tag }) => {
    const [todos, setTodos] = React.useState({ completed: [], uncompleted: [] })
    const fetchTodos = async () => {
        const url = (tag === "All Tasks") ? "/todos/all_todos" : `/todos/tag/${tag}`
        const res = await fetch(url)
        const data = await res.json()
        return data
    }

    React.useEffect(() => {
        const getTodos = async () => {
            const todosFromServer = await fetchTodos()
            setTodos(todosFromServer)
        }
        getTodos()
    }, [])

    const newUpdate = (body, flag) => {
        if (flag == 'U') {
            const addedList = body.completed ? [...todos.completed, body] : [...todos.uncompleted, body]
            const removedList = body.completed ? todos.uncompleted.filter(todo => todo.id != body.id) : todos.completed.filter(todo => todo.id != body.id)
            const combined = body.completed ? { completed: addedList, uncompleted: removedList } : { completed: removedList, uncompleted: addedList }
            console.log(combined)
            setTodos(combined)
        } else {
            const removedList = body.completed ? todos.completed.filter(todo => todo.id != body.id) : todos.uncompleted.filter(todo => todo.id != body.id)
            const combined = body.completed ? { completed: removedList, uncompleted: todos.uncompleted } : { completed: todos.completed, uncompleted: removedList }
            setTodos(combined)
        }
    }

    const handleUpdateSubmit = (body) => {
        newUpdate(body, 'U')

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
                //window.location.reload()
            })
            .catch(() => console.log("Error"))
    }

    const handleDelete = (body) => {
        newUpdate(body, 'D')

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
                //window.location.reload()
            })
            .catch(() => console.log("Error"))
    }

    return (
        <>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Pending pending={todos.uncompleted} handleSubmit={handleUpdateSubmit} handleDelete={handleDelete} />
                <Completed completed={todos.completed} handleSubmit={handleUpdateSubmit} handleDelete={handleDelete} />
            </Stack>

        </>
    )

}

export default Dispatcher