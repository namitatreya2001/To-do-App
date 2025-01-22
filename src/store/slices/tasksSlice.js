// 

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('tasks') || '[]'),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.items));
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.items));
    },
    toggleTask: (state, action) => {
      const task = state.items.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.items));
      }
    },
    toggleStarred: (state, action) => {
      const task = state.items.find(task => task.id === action.payload);
      if (task) {
        task.isStarred = !task.isStarred;
        localStorage.setItem('tasks', JSON.stringify(state.items));
      }
    },
    updateTaskPriority: (state, action) => {
      const { taskId, priority } = action.payload;
      const task = state.items.find(task => task.id === taskId);
      if (task) {
        task.priority = priority;
        localStorage.setItem('tasks', JSON.stringify(state.items));
      }
    }
  },
});

export const { 
  addTask, 
  deleteTask, 
  toggleTask, 
  toggleStarred,
  updateTaskPriority 
} = tasksSlice.actions;

export default tasksSlice.reducer;