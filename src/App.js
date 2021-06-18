import { useState } from 'react';
import './App.scss';
import ToDoItem from './toDo/ToDoItem/ToDoItem';


const App = () => {
  localStorage.length < 1 ? localStorage.setItem('tasks', JSON.stringify([])) : JSON.parse(localStorage.getItem('tasks'));

  const [data, setData] = useState(JSON.parse(localStorage.getItem('tasks')));
  const [output, setOutput] = useState('');
 
  const handleChange = id => {
    let [...newData] = data;
    const index = newData.map(item => item.id).indexOf(id);
    newData[index].completed = !newData[index].completed;
    localStorage.setItem('tasks', JSON.stringify(newData));
    setData(newData);
  };

  const getInputValue = e => {
    setOutput(e.target.value);
  }

  const addNewTask = () => {
    setOutput('');
    if(output.length === 0 || (!/[^\s]/.test(output) || /^\s*$/.test(output) || output.replace(/\s/g,"") === "")) {
      return false
    } else {
      let [...newData] = data;
      let newId = 0;

      data.length < 1 ? newId = 0 : newId = data[data.length - 1].id + 1;

      let newObj = {
        id: newId,
        text: output,
        completed: false
      };
      
      newData.push(newObj);
      localStorage.setItem('tasks', JSON.stringify(newData));
      setData(newData);
    }
  };

  const deleteCurTask = id => {
    let [...newData] = data;
    const index = newData.map(item => item.id).indexOf(id);
    newData.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(newData));
    setData(newData);
  }

  const activeTasks = data.filter(item => item.completed === false);
  const completedTasks = data.filter(item => item.completed === true);

  const finalTasks = [...activeTasks,...completedTasks].map(item => {
    return(
      <ToDoItem
        key={item.id}
        description={item.text}
        completed={item.completed}
        handleChange={() => handleChange(item.id)}
        deleteCurTask={() => deleteCurTask(item.id)}
      />
    );
  })
  return (
    <div className="app">
      <div className="todo-wrapper">
        <div className="todo-header">
          <p className="todo-title">{localStorage.length < 1 ? 0 : finalTasks.length} Tasks</p>
          <p className="todo-description">{activeTasks.length} Remain</p>
        </div>
        <div className="todo-body">
          {finalTasks}
        </div>
        <div className="todo-footer">
          <input className="todo-footer__add-task" type="text" value={output} placeholder="Add Todo..." onChange={getInputValue}></input>
          <button className="add-btn btn" type="button" onClick={addNewTask}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default App;
