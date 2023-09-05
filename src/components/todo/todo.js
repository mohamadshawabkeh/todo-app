import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form.js';
import { v4 as uuid } from 'uuid';
import { Pagination } from '@mantine/core';
import { useSettings } from '../../context/settings/index.jsx';
import './todo.scss';
import Auth from '../auth/auth.js';
import LoginProvider from '../../context/auth/context.js';
import { LoginContext } from '../../context/auth/context.js';

const ToDo = () => {
  let contextType = useContext(LoginContext);

  const [defaultValues] = useState({
    difficulty: 3,
  });

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState(0);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  const { settings } = useSettings();
  const { displayCount, hideCompleted } = settings;

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList((prevList) => [...prevList, item]);
    localStorage.setItem('todoList', JSON.stringify([...list, item]));
    const incompleteCount = [...list, item].filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
  }

  function toggleComplete(id) {
    const updatedList = list.map((item) => {
      if (item.id === id) {
        return { ...item, complete: !item.complete };
      }
      return item;
    });
    setList(updatedList);
    const incompleteCount = updatedList.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incompleteCount} items pending`;

    localStorage.setItem('todoList', JSON.stringify(updatedList));
  }

  function deleteItem(id) {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
    const incompleteCount = updatedList.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    localStorage.setItem('todoList', JSON.stringify(updatedList));
  }

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('todoList')) || [];
    setList(savedList);
    const incompleteCount = savedList.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = displayCount;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const incompleteItems = hideCompleted ? list.filter((item) => !item.complete) : list;
  const itemsToDisplay = incompleteItems.slice(startIndex, endIndex);

  const [editingItemId, setEditingItemId] = useState(null);
  const [editFormData, setEditFormData] = useState({ text: '', assignee: '', difficulty: 1 });

  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedList = list.map((item) => {
      if (item.id === editingItemId) {
        return { ...item, ...editFormData };
      }
      return item;
    });
    setList(updatedList);
    setEditingItemId(null);
    localStorage.setItem('todoList', JSON.stringify(updatedList));
  };

  return (
    <>
      <LoginProvider>
        <div className="ToDo">
          <header className="todo-header">
            <h1 className="todo-title">To Do List: {incomplete} items pending</h1>
          </header>
          <div className="content-container">
            <div className="form-container">
              <Auth capabilities="create">
                <div className="form">
                  <h2>Add To Do Item</h2>
                  <form onSubmit={handleSubmit}>
                    <label>
                      <span>To Do Item</span>
                      <input
                        onChange={handleChange}
                        name="text"
                        type="text"
                        placeholder="Item Details"
                      />
                    </label>
                    <label>
                      <span>Assigned To</span>
                      <input
                        onChange={handleChange}
                        name="assignee"
                        type="text"
                        placeholder="Assignee Name"
                      />
                    </label>
                    <label>
                      <span>Difficulty</span>
                      <input
                        onChange={handleChange}
                        defaultValue={defaultValues.difficulty}
                        type="range"
                        min={1}
                        max={5}
                        name="difficulty"
                      />
                    </label>
                    <label>
                      <button type="submit">Add Item</button>
                    </label>
                  </form>
                </div>
              </Auth>
            </div>
            <div className="results-container">
              {itemsToDisplay.map((item) => (
                <div
                  key={item.id}
                  className={`todo-item ${item.complete ? 'completed' : ''}`}
                >
                  <p>{item.text}</p>
                  <p>
                    <small>Assigned to: {item.assignee}</small>
                  </p>
                  <p>
                    <small>Difficulty: {item.difficulty}</small>
                  </p>
                  {editingItemId === item.id ? (
                    <form onSubmit={handleUpdate}>
                      <label>
                        <span>To Do Item</span>
                        <input
                          value={editFormData.text}
                          onChange={(e) => setEditFormData({ ...editFormData, text: e.target.value })}
                          name="text"
                          type="text"
                          placeholder="Item Details"
                        />
                      </label>
                      <label>
                        <span>Assigned To</span>
                        <input
                          value={editFormData.assignee}
                          onChange={(e) => setEditFormData({ ...editFormData, assignee: e.target.value })}
                          name="assignee"
                          type="text"
                          placeholder="Assignee Name"
                        />
                      </label>
                      <label>
                        <span>Difficulty</span>
                        <input
                          value={editFormData.difficulty}
                          onChange={(e) => setEditFormData({ ...editFormData, difficulty: e.target.value })}
                          type="range"
                          min={1}
                          max={5}
                          name="difficulty"
                        />
                      </label>
                      <label>
                        <button type="submit">Save</button>
                      </label>
                    </form>
                  ) : (
                    <div onClick={() => toggleComplete(item.id)}>
                      Complete: {item.complete.toString()}
                    </div>
                  )}
                  <hr />
                  <Auth capabilities="update">
                    <button
                      onClick={() => setEditingItemId(item.id)}
                      style={{
                        backgroundColor: 'orange',
                        color: 'white',
                        padding: '10px 20px', 
                        borderRadius: '5px', 
                        fontSize: '12px', 
                        fontWeight: 'bold', 
                        
                      }}
                    >
                      Update
                    </button>
                  </Auth>
                  <Auth capabilities="delete">
                    <button
                      onClick={() => deleteItem(item.id)}
                      style={{
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '10px', 
                        borderRadius: '5px', 
                        fontSize: '12px', 
                        fontWeight: 'bold', 
                        marginLeft: '10px'
                      }}
                    >
                      Delete
                    </button>
                  </Auth>

                </div>
              ))}
              {incompleteItems.length > itemsPerPage && (
                <Pagination
                  total={Math.ceil(incompleteItems.length / itemsPerPage)}
                  value={currentPage}
                  onChange={setCurrentPage}
                  className="pagination"
                />
              )}
            </div>
          </div>
        </div>
      </LoginProvider>
    </>
  );
};

export default ToDo;
