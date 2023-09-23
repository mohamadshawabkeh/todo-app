import superagent from 'superagent';

const API = 'https://todo-api-l31x.onrender.com';

export const fetchTodoList = async () => {
  try {
    const response = await superagent.get(`${API}/api/tasks/v`);
    return response.body; 
  } catch (error) {
    console.error('Error fetching to-do list:', error);
    throw error;
  }
};

export const addTodoItem = async (newItem) => {
  try {
    const response = await superagent
      .post(`${API}/api/tasks/v`)
      .send(newItem);
    return response.body; 
  } catch (error) {
    console.error('Error adding to-do item:', error);
    throw error;
  }
};

export const updateTodoItem = async (itemId, updatedItem) => {
  try {
    const response = await superagent
      .put(`${API}/api/tasks/v/${itemId}`)
      .send(updatedItem);
    return response.body; 
  } catch (error) {
    console.error('Error updating to-do item:', error);
    throw error;
  }
};

export const deleteTodoItem = async (itemId) => {
  try {
    const response = await superagent.delete(`${API}/api/tasks/v/${itemId}`);
    return response.body; 
  } catch (error) {
    console.error('Error deleting to-do item:', error);
    throw error;
  }
};
