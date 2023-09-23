import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form';
import { v4 as uuid } from 'uuid';
import { Pagination } from '@mantine/core';
import './todo.scss';
import {
  fetchTodoList,
  addTodoItem,
  updateTodoItem,
  deleteTodoItem,
} from '../../hooks/superagent';
import LoginProvider from '../../context/auth/context';
import Auth from '../auth/auth';
import { useSettings } from '../../context/settings/index';

const ToDo = () => {
  const [defaultValues] = useState({
    difficulty: 3,
  });

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState(0);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    text: '',
    assignee: '',
    difficulty: 3,
  });

  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);
  const { settings } = useSettings(); // Get settings from the context

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 2;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    // Function to load the to-do list from the API
    const loadTodoList = async () => {
      try {
        const todoList = await fetchTodoList();
        setList(todoList);
        const incompleteCount = todoList.filter((item) => !item.complete).length;
        setIncomplete(incompleteCount);
      } catch (error) {
        console.error('Error fetching to-do list:', error);
      }
    };

    loadTodoList();
  }, []);

  function addItem(item) {
    // Optimistically update the UI
    item.id = uuid();
    item.complete = false;
    const updatedList = [...list, item];
    setList(updatedList);
    setIncomplete((prevIncomplete) => prevIncomplete + 1);

    // Function to add a new to-do item to the API
    const addNewItem = async () => {
      try {
        const newItem = await addTodoItem(item);
        window.location.reload();
      } catch (error) {
        // If there's an error, revert the UI back to its previous state
        setList((prevList) => prevList.filter((todo) => todo.id !== item.id));
        setIncomplete((prevIncomplete) => prevIncomplete - 1);
        console.error('Error adding to-do item:', error);
        // You can display an error message to the user here
      }
    };

    addNewItem();
  }

  function toggleComplete(id) {
    const updatedList = list.map((item) => {
      if (item.id === id) {
        return { ...item, complete: !item.complete };
      }
      return item;
    });

    // Function to update an existing to-do item in the API
    const updateItem = async () => {
      try {
        await updateTodoItem(id, updatedList.find((item) => item.id === id));
        setList(updatedList);
        const incompleteCount = updatedList.filter((item) => !item.complete).length;
        setIncomplete(incompleteCount);
      } catch (error) {
        console.error('Error updating to-do item:', error);
      }
    };

    updateItem();
  }

  const deleteItem = async (id) => {
    try {
      await deleteTodoItem(id);
      const updatedList = list.filter((item) => item.id !== id);
      setList(updatedList);
      const incompleteCount = updatedList.filter((item) => !item.complete).length;
      setIncomplete(incompleteCount);
    } catch (error) {
      console.error('Error deleting to-do item:', error);
    }
  };

  // Filter the items based on the "Hide Completed" setting
  const filteredItemsToDisplay = settings.hideCompleted
    ? list.filter((item) => !item.complete)
    : list;

  return (
    <>
      <LoginProvider>
        <div className="ToDo">
          <header className="todo-header">
            <h1 className="todo-title">To Do List: {incomplete} items pending</h1>
          </header>
          <div className="content-container">
            <div className="form-container">
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
            </div>
            <div className="results-container">
              {filteredItemsToDisplay.slice(startIndex, endIndex).map((item) => (
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
                          onChange={(e) =>
                            setEditFormData({ ...editFormData, text: e.target.value })
                          }
                          name="text"
                          type="text"
                          placeholder="Item Details"
                        />
                      </label>
                      <label>
                        <span>Assigned To</span>
                        <input
                          value={editFormData.assignee}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              assignee: e.target.value,
                            })
                          }
                          name="assignee"
                          type="text"
                          placeholder="Assignee Name"
                        />
                      </label>
                      <label>
                        <span>Difficulty</span>
                        <input
                          value={editFormData.difficulty}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              difficulty: e.target.value,
                            })
                          }
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
                    <div>
                      <button
                        onClick={() => toggleComplete(item.id)}
                        className="complete-button"
                      >
                        {item.complete ? 'Mark as Incomplete' : 'Mark as Complete'}
                      </button>

                    </div>
                  )}
                  <hr />
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
                  <button
                    onClick={() => deleteItem(item.id)}
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      padding: '10px',
                      borderRadius: '5px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      marginLeft: '10px',
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
              {filteredItemsToDisplay.length > itemsPerPage && (
                <Pagination
                  total={Math.ceil(filteredItemsToDisplay.length / itemsPerPage)}
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
