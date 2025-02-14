import React, { useState } from 'react';

function App() {
  // State for tasks, including text, completion status, and due date
  const [tasks, setTasks] = useState([]);
  
  // State for current task text input
  const [task, setTask] = useState('');
  
  // State for current task due date
  const [taskDate, setTaskDate] = useState('');
  
  // State for current task priority
  const [taskPriority, setTaskPriority] = useState('Low');

  // State for editing an existing task
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [editingDate, setEditingDate] = useState('');
  const [editingPriority, setEditingPriority] = useState('Low');

  const addTask = () => {
    if (task.trim() && taskDate) {

      //priority colors
      let priorityColor = "black"; // Default
      if (taskPriority === "High") priorityColor = "red";
      else if (taskPriority === "Medium") priorityColor = "orange";
      else if (taskPriority === "Low") priorityColor = "green";

      // Add task with due date
      setTasks([...tasks, { text: task, completed: false, date: taskDate, priority: taskPriority, priorityColor}]);
      
      setTask(''); // reset task input
      setTaskDate(''); // reset date input
      setTaskPriority('Low'); // reset priority to Low
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    // When clicking "Edit", populate the fields with the task's current values
    const taskToEdit = tasks[index];
    setEditingIndex(index);
    setEditingText(taskToEdit.text);
    setEditingDate(taskToEdit.date);
    setEditingPriority(taskToEdit.priority);
  };

  const saveEdit = () => {

    //new color for the edited priority (if it applies)
    let priorityColor = "black"; 
    if (editingPriority === "High") priorityColor = "red";
    else if (editingPriority === "Medium") priorityColor = "orange";
    else if (editingPriority === "Low") priorityColor = "green";

    // Save the edited task
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex] = { ...updatedTasks[editingIndex], text: editingText, date: editingDate, priority: editingPriority, priorityColor};
    setTasks(updatedTasks);
    cancelEdit(); // Reset the edit states after saving
  };

  const cancelEdit = () => {
    // Clear the editing state and return to task view
    setEditingIndex(null);
    setEditingText('');
    setEditingDate('');
    setEditingPriority('Low');
  };

  // Function to move the task up
  const moveTaskUp = (index) => {
  if (index > 0) {
    const newTasks = [...tasks];  // Copy the tasks array
    const temp = newTasks[index];  // Store the task to be moved
    newTasks[index] = newTasks[index - 1];  // Move the task above it
    newTasks[index - 1] = temp;  // Place the original task in the previous position
    setTasks(newTasks);  // Update the tasks state
    }
  };

  // Function to move the task down
  const moveTaskDown = (index) => {
    if (index < tasks.length - 1) {
      const newTasks = [...tasks];  // Copy the tasks array
      const temp = newTasks[index];  // Store the task to be moved
      newTasks[index] = newTasks[index + 1];  // Move the task below it
      newTasks[index + 1] = temp;  // Place the original task in the next position
      setTasks(newTasks);  // Update the tasks state
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>To do List</h1>

      {/* Input fields for adding new tasks */}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />
      <input
        type="datetime-local"
        value={taskDate}
        onChange={(e) => setTaskDate(e.target.value)}
        placeholder="Due Date"
      />
      <select
        value={taskPriority}
        onChange={(e) => setTaskPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button onClick={addTask}>Add</button>

      {/* If editing, show the edit form */}
      {editingIndex !== null && (
        <div>
          <h2>Edit Task</h2>
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            placeholder="Edit task"
          />
          <input
            type="datetime-local"
            value={editingDate}
            onChange={(e) => setEditingDate(e.target.value)}
          />
          <select
            value={editingPriority}
            onChange={(e) => setEditingPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button onClick={saveEdit}>Save</button>
          <button onClick={cancelEdit}>Cancel</button>
        </div>
      )}

      {/* Task List */}
      <ul>
        {tasks.map((t, index) => (
          <li key={index} style={{ textDecoration: t.completed ? "line-through" : "none", color: t.priorityColor}}>
            {t.text} 
            {t.date && `- Due: ${new Date(t.date).toLocaleString()}`} 
            - Priority: {t.priority}
            <button onClick={() => toggleTask(index)}>✓</button>
            <button onClick={() => removeTask(index)}>X</button>
            <button onClick={() => startEdit(index)}>Edit</button>
            {/* Add Move Up and Move Down buttons */}
            <button onClick={() => moveTaskUp(index)}>↑</button>
            <button onClick={() => moveTaskDown(index)}>↓</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
