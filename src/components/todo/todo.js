import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form.js';
import { v4 as uuid } from 'uuid';
import { Pagination } from '@mantine/core';
import { useSettings } from '../../context/settings/index.jsx'; 
import './todo.scss';

const ToDo = () => {
  const [defaultValues] = useState({
    difficulty: 4,
  });

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState(0);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  const { settings } = useSettings();
  const { displayCount, hideCompleted } = settings;

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList(prevList => [...prevList, item]);
    localStorage.setItem('todoList', JSON.stringify([...list, item]));
    const incompleteCount = [...list, item].filter(item => !item.complete).length;
    setIncomplete(incompleteCount);

  }

  function toggleComplete(id) {
    const updatedList = list.map(item => {
      if (item.id === id) {
        return { ...item, complete: !item.complete };
      }
      return item;
    });
    setList(updatedList);
    // console.log(updatedList);
    const incompleteCount = updatedList.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incompleteCount} items pending`;
    
    localStorage.setItem('todoList', JSON.stringify(updatedList));
  }
  
  // useEffect(() => {
    
    // }, [list, incomplete]);
    
    useEffect(() => {
      const savedList = JSON.parse(localStorage.getItem('todoList'))
    // console.log(savedList,"jdfngdh");
    
      setList(savedList)
      const incompleteCount = savedList?.filter(item => !item.complete)?.length;
    setIncomplete(incompleteCount);
    
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = displayCount;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const incompleteItems = hideCompleted ? list.filter(item => !item.complete) : list;
  const itemsToDisplay = incompleteItems.slice(startIndex, endIndex);

  return (
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
          {itemsToDisplay.map(item => (
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
              <div onClick={() => toggleComplete(item.id)}>
                Complete: {item.complete.toString()}
              </div>
              <hr />
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
  );
};

export default ToDo;
