import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

const TaskList = ({ isDarkMode, themeClasses }) => {
  const tasks = useSelector((state) => state.tasks.items);

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="space-y-4">
      {sortedTasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          isDarkMode={isDarkMode}
          themeClasses={themeClasses}
        />
      ))}
    </div>
  );
};

export default TaskList;