import React, { Key, ReactChild, ReactFragment, ReactPortal } from 'react'

const Completed = ({ completed }) => {
    return (
        <div>
            <h4>Completed</h4>
            {completed.map((todo: { completed: boolean; id: any; title: boolean | ReactChild | ReactFragment | ReactPortal }, i: Key) => {
                return (
                    <div key={i}>
                        <input type="checkbox" checked={todo.completed} value="" id={`checkbox${todo.id}`} disabled />
                        <label htmlFor={`checkbox${todo.id}`}>
                            {todo.title}
                        </label>
                    </div>
                )
            })}
        </div>
    )
}

export default Completed