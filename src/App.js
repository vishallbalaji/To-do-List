import React, { useState } from 'react';
import './App.css';


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

  // State for sorting (alphabetical, date added, due date, and priority)
  const [sortOption, setSortOption] = useState("");

  // State for subcategory input
  const [subcategory, setSubcategory] = useState("");  

  const addTask = () => {
    if (task.trim() && taskDate) {

      //priority colors
      let priorityColor = "black"; // Default
      if (taskPriority === "High") priorityColor = "red";
      else if (taskPriority === "Medium") priorityColor = "orange";
      else if (taskPriority === "Low") priorityColor = "green";

      // Add task with due date
      setTasks([...tasks, { text: task, completed: false, date: taskDate, priority: taskPriority, priorityColor, subcategories: []}]);
      
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

    //new color for the edited priority
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

  const sortedTasks = [...tasks];

  if (sortOption === "alphabetical") {
    sortedTasks.sort((a, b) => a.text.localeCompare(b.text));
  } else if (sortOption === "dateAdded") {
    sortedTasks.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
  } else if (sortOption === "dueDate") {
    sortedTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortOption === "priority") {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    sortedTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  // Function to add a subcategory
  const addSubcategory = (taskIndex) => {
  if (subcategory.trim()) {
    const newTasks = [...tasks];
    newTasks[taskIndex].subcategories.push(subcategory); // Add subcategory to task
    setTasks(newTasks);
    setSubcategory(""); // Reset subcategory input
    }
  };

  //Function to remove a subcategory
  const removeSubcategory = (taskIndex, subIndex) => {
    const newTasks = [...tasks];
    newTasks[taskIndex].subcategories.splice(subIndex, 1); // Remove subcategory
    setTasks(newTasks);
  };

  return (
    <div className="todo-container">
      <h1 className="todo-header">To do List</h1>

      <div className="input-group">
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
      </div>

      {editingIndex !== null && (
        <div className="edit-form">
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
          <div className="edit-buttons">
            <button className="save-button" onClick={saveEdit}>Save</button>
            <button className="cancel-button" onClick={cancelEdit}>Cancel</button>
          </div>
        </div>
      )}

      <select className="sort-select" onChange={(e) => setSortOption(e.target.value)}>
        <option value="">Sort by...</option>
        <option value="alphabetical">Alphabetically (A-Z)</option>
        <option value="dateAdded">Date Added (Oldest → Newest)</option>
        <option value="dueDate">Due Date (Earliest → Latest)</option>
        <option value="priority">Priority (High → Low)</option>
      </select>

      <ul className="task-list">
        {sortedTasks.map((t, index) => (
          <li key={index} className="task-item" style={{ borderLeftColor: t.priorityColor }}>
            <div className={`task-content ${t.completed ? 'completed' : ''}`}>
              <div className="task-main">
                {t.text}
                <div className="task-details">
                  {t.date && <span className="task-date">Due: {new Date(t.date).toLocaleString()}</span>}
                  <span className="task-priority">Priority: {t.priority}</span>
                </div>
              </div>
              
              <div className="task-actions">
                <div className="button-group">
                  <button className="task-button" onClick={() => toggleTask(index)}>✓</button>
                  <button className="task-button" onClick={() => removeTask(index)}>X</button>
                  <button className="task-button" onClick={() => startEdit(index)}>Edit</button>
                  <button className="task-button" onClick={() => moveTaskUp(index)}>↑</button>
                  <button className="task-button" onClick={() => moveTaskDown(index)}>↓</button>
                </div>
              </div>

              <div className="subcategory-section">
                <div className="subcategory-input">
                  <input
                    type="text"
                    placeholder="Add subcategory"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                  />
                  <button className="task-button" onClick={() => addSubcategory(index)}>+</button>
                </div>

                <ul className="subcategory-list">
                  {(t.subcategories || []).map((sub, subIndex) => (
                    <li key={subIndex} className="subcategory-item">
                      {sub}
                      <button 
                        className="task-button remove-subcategory"
                        onClick={() => removeSubcategory(index, subIndex)}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
