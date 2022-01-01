import * as React from 'react'

const PendingItems = ({ todo, handleSubmit }) => {
    const [editing, setEditing] = React.useState(false)
    const [pendingTodo, setPendingTodo] = React.useState(todo)

    const handleClick = () => {
        setEditing(true)
    }

    const handleTitleChange = (event) => {
        setPendingTodo({
            ...pendingTodo,
            title: event.target.value
        })
    }

    const handleCompletedChange = (event) => {
        handleSubmit({
            ...pendingTodo,
            completed: event.target.checked
        })
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setEditing(false)
            handleSubmit(pendingTodo)
        }
    }

    return editing ? (
        <div>
            <input disabled type="checkbox" defaultChecked={pendingTodo.completed} id={`checkbox${pendingTodo.id}`} />
            <input type="text" id="staticEmail2" value={pendingTodo.title} onChange={handleTitleChange} onKeyDown={handleKeyDown} autoFocus />
        </div>
    ) : (
        <div>
            <input type="checkbox" defaultChecked={pendingTodo.completed} id={`checkbox${pendingTodo.id}`} onChange={handleCompletedChange} />
            <label htmlFor={`checkbox${pendingTodo.id}`} onClick={handleClick}>
                {pendingTodo.title}
            </label>
        </div>
    )
}

export default PendingItems