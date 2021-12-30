import React, { useState, useEffect } from 'react';
import Completed from './Completed';
import BasicList from './Test';

const Home = () => {
    const [todos, setTodos] = useState({ completed: [] });
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
        // <div>
        //     {loading ? <h1>wait</h1> : <Completed completed={todos.completed} />}
        // </div>
        <div>
            <BasicList />
        </div>
    )
}

export default Home;