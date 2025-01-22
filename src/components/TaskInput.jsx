import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Plus, Calendar, Bell, ListTodo, ChevronDown } from 'lucide-react';
import { addTask, updateTaskPriority } from '../store/slices/tasksSlice';

const TaskInput = ({ isDarkMode, themeClasses }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      const newTaskId = crypto.randomUUID();
      dispatch(
        addTask({
          id: newTaskId,
          title: title.trim(),
          priority,
          completed: false,
          isStarred: false,
        })
      );
      setTitle('');
      setPriority('medium');
    }
  };

  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
    setIsDropdownOpen(false);
  };

  const getPriorityColor = (level) => {
    const colors = {
      low: isDarkMode ? 'text-gray-400' : 'text-gray-500',
      medium: 'text-yellow-500',
      high: 'text-red-500',
    };
    return colors[level] || colors.medium;
  };

  return (
    <div className={`${themeClasses.card} rounded-lg p-6 mb-8`}>
      <h2 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
        Add A Task
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className={`w-full p-3 rounded-lg border ${themeClasses.input} ${themeClasses.border} focus:outline-none focus:ring-2 focus:ring-green-500`}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button type="button" className={themeClasses.button.secondary}>
              <Calendar className="w-5 h-5" />
            </button>
            <button type="button" className={themeClasses.button.secondary}>
              <Bell className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-1 px-2 py-1 rounded ${getPriorityColor(priority)}`}
              >
                <ListTodo className="w-5 h-5" />
                <span className="capitalize">{priority}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isDropdownOpen && (
                <div className={`absolute top-full left-0 mt-1 ${themeClasses.card} rounded-lg shadow-lg border ${themeClasses.border} z-10`}>
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
          </div>
          <button
            type="submit"
            className={`px-4 py-2 rounded-lg transition-colors ${themeClasses.button.primary}`}
          >
            ADD TASK
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;