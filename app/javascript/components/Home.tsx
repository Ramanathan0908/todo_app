import React, { useState, useEffect } from 'react';
import Completed from './Completed';
import Pending from './Pending';

const Home = () => {
    const [todos, setTodos] = useState({ completed: [], uncompleted: [] });
    const [loading, setLoading] = useState(true);
    const [test, setTest] = useState(0)

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

    return (
        <div>
            <h1>Todo</h1>
            <Pending pending={todos.uncompleted} />
            <hr />
            <Completed completed={todos.completed} />
        </div>
    )
}

export default Home;