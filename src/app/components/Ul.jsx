"use client";


import React, { useState, useEffect } from 'react';

function Ul () {

// li component button component form title передавать props
const [tasks, setTasks] = useState([]);
// const [task, setTask] = useState('');
const [modalVisible, setModalVisible] = useState(false);
const [taskToDelete, setTaskToDelete] = useState(null);

useEffect(() => {
  
  fetchTasks();
}, []);

const fetchTasks = async () => {
  const response = await fetch('http://localhost:5001/tasks');
  const data = await response.json();
  setTasks(data);
};

// const addTask = async () => {
//   if (task.trim() !== '') {

//     const response = await fetch(`http://localhost:5001/tasks`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ text: task }),
//     });
//     const newTask = await response.json();
//     setTasks([...tasks, newTask]);
//     setTask('');
//   }
// };

const toggleTask = async (id) => {
  const taskToUpdate = tasks.find((t) => t.id === id);
  const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

  try {
    const response = await fetch(`http://localhost:5001/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: updatedTask.completed }),
    });

    if (!response.ok) {
      throw new Error('Failed to update task status');
    }

    await fetchTasks();
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

const confirmDeleteTask = (id) => {
  
  setTaskToDelete(id);
  setModalVisible(true);
};

const deleteTask = async () => {
  try {
    const response = await fetch(`http://localhost:5001/tasks/${taskToDelete}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    await fetchTasks();
  } catch (error) {
    console.error('Error deleting task:', error);
  } finally {
    setTaskToDelete(null);
    setModalVisible(false);
  }
};


const closeModal = () => {
  
  setModalVisible(false);
  setTaskToDelete(null);
}
return (

<div>

<ul className="task-list">
{tasks.map((t) => (
  <li key={t.id} className={t.completed ? 'completed' : ''}>
    <span onClick={() => toggleTask(t.id)}>{t.text}</span>
    <button onClick={() => confirmDeleteTask(t.id)}>Delete</button>
  </li>
))}
</ul>

{modalVisible && (
    <div className="modal-overlay">
      <div className="confirm-modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="button-container">
          <button className="confirm-button" onClick={deleteTask}>Yes</button>
          <button className="cancel-button" onClick={closeModal}>No</button>
        </div>
      </div>
    </div>
  )}
</div>

)}

export default Ul;





