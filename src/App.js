import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, text) => {
    setEditTaskId(id);
    setEditTaskText(text);
  };

  const saveTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: editTaskText } : task));
    setEditTaskId(null);
    setEditTaskText('');
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="task-input">
        <input 
          type="text" value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          onKeyPress={handleKeyPress} 
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="tasks">
        {tasks.map(task => (
          <div key={task.id} className="task">
            {editTaskId === task.id ? (
              <div>
                <input 
                  type="text" 
                  value={editTaskText} 
                  onChange={(e) => setEditTaskText(e.target.value)} 
                />
                <button onClick={() => saveTask(task.id)}>Save</button>
              </div>
            ) : (
              <div className="task-content">
                <span>{task.text}</span>
                <div className="edbuttons">
                  <button onClick={() => editTask(task.id, task.text)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
