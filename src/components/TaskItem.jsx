import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Trash2, MoreVertical, Star, ListTodo, ChevronDown } from 'lucide-react';
import { deleteTask, toggleTask, toggleStarred, updateTaskPriority } from '../store/slices/tasksSlice';

const TaskItem = ({ task, isDarkMode, themeClasses }) => {
  const dispatch = useDispatch();
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);

  const getPriorityColor = (level) => {
    const colors = {
      low: isDarkMode ? 'text-gray-400' : 'text-gray-500',
      medium: 'text-yellow-500',
      high: 'text-red-500',
    };
    return colors[level] || colors.medium;
  };

  const handlePriorityChange = (newPriority) => {
    dispatch(updateTaskPriority({ taskId: task.id, priority: newPriority }));
    setIsPriorityOpen(false);
  };

  return (
    <div className={`task-item flex justify-between items-center p-4 ${themeClasses.card} rounded-lg`}>
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleTask(task.id))}
          className={`w-5 h-5 rounded-sm border ${
            task.completed 
              ? 'border-green-500 bg-green-500' 
              : `${isDarkMode ? 'border-gray-500' : 'border-gray-300'}`
          }`}
        />
        <span className={`${
          task.completed 
            ? 'line-through text-gray-500' 
            : isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {task.title}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsPriorityOpen(!isPriorityOpen)}
            className={`flex items-center gap-1 px-2 py-1 rounded ${getPriorityColor(task.priority)}`}
          >
            <ListTodo className="w-4 h-4" />
            <span className="capitalize text-sm">{task.priority}</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          {isPriorityOpen && (
            <div className={`absolute top-full right-0 mt-1 ${themeClasses.card} rounded-lg shadow-lg border ${themeClasses.border} z-10`}>
              {['low', 'medium', 'high'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePriorityChange(p)}
                  className={`block w-full px-4 py-2 text-left ${themeClasses.hover} capitalize ${getPriorityColor(p)}`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => dispatch(toggleStarred(task.id))}
          className={`${
            task.isStarred ? 'text-yellow-500' : isDarkMode ? 'text-gray-500' : 'text-gray-400'
          } hover:text-yellow-400`}
        >
          <Star className="w-5 h-5" />
        </button>
        <button
          onClick={() => dispatch(deleteTask(task.id))}
          className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} hover:text-red-500`}
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button className={themeClasses.button.secondary}>
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;