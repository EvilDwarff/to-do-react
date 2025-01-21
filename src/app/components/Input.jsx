"use client";


import React, { useState, useEffect } from 'react';


function Input () {

//code 
const [tasks, setTasks] = useState([]);
const [task, setTask] = useState('');
// const [modalVisible, setModalVisible] = useState(false);
// const [taskToDelete, setTaskToDelete] = useState(null);

useEffect(() => {
  
  fetchTasks();
}, []);

const fetchTasks = async () => {
  const response = await fetch('http://localhost:5001/tasks');
  const data = await response.json();
  setTasks(data);
};

const addTask = async () => {
    if (task.trim() !== '') {
      const response = await fetch(`http://localhost:5001/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: task }),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setTask('');
  
    
    
    }
  
  };




// const addTask = async () => {
//   if (task.trim() !== '') {
    
//     await fetchTasks();
//     try{
//     const response = await fetch(`http://localhost:5001/tasks`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ text: task }),
//     });
//     const newTask = await response.json();
//     setTasks([...tasks, newTask]);
//     setTask('');
//     if (!response.ok) {
//         throw new Error('Failed to add task');
//       }
//       await fetchTasks();
// }
// catch (error) {
//         console.error('Error adding task:', error);
//       }
//   }
// };

// const toggleTask = async (id) => {
//   const taskToUpdate = tasks.find((t) => t.id === id);
//   const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

//   try {
//     const response = await fetch(`http://localhost:5001/tasks/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ completed: updatedTask.completed }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to update task status');
//     }

//     await fetchTasks();
//   } catch (error) {
//     console.error('Error updating task:', error);
//   }
// };

// const confirmDeleteTask = (id) => {
  
//   setTaskToDelete(id);
//   setModalVisible(true);
// };

// const deleteTask = async () => {
//   try {
//     const response = await fetch(`http://localhost:5001/tasks/${taskToDelete}`, {
//       method: 'DELETE',
//     });

//     if (!response.ok) {
//       throw new Error('Failed to delete task');
//     }
//     await fetchTasks();
//   } catch (error) {
//     console.error('Error deleting task:', error);
//   } finally {
//     setTaskToDelete(null);
//     setModalVisible(false);
//   }
// };


// const closeModal = () => {
  
//   setModalVisible(false);
//   setTaskToDelete(null);
// };

return (

<div className="input-container">
<input
  id="taskInput"
  type="text"
  placeholder="Add a new task"
  value={task}
  onChange={(e) => setTask(e.target.value)}
/>
<button onClick={addTask}>Add</button>

</div>

)}

export default Input;








