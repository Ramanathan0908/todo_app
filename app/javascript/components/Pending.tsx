import React from 'react';
import { Checkbox } from '@material-ui/core';
import { Card } from '@material-ui/core';

const Pending = ({ pending }) => {
    return (
        <div>
            <h4>Pending</h4>
            {pending.map((todo, i) => {
                return (
                    <div className="form-check editing">
                        <Card children={todo.tite} />
                    </div>
                )
            })}
        </div>
    )
}

export default Pending;