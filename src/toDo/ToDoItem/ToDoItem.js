import React from 'react';
import './ToDoItem.scss';

const ToDoItem = props => {
    return(
        <div className="todo-item">
            <label>
                <input className="inputs" type="checkbox" onChange={props.handleChange} defaultChecked={props.completed}/>
                <span className="fake"></span>
            </label>
            <p className={props.completed === true ? 'description description__completed' : 'description'}>{props.description}</p>
            <button className="btn-delete btn" type="button" onClick={props.deleteCurTask}>Delete</button>
        </div>
    )
}

export default ToDoItem;