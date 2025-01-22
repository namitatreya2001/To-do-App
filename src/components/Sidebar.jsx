import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CheckSquare, Calendar, Star, Users, Plus, ChevronLeft, Info } from 'lucide-react';
import TaskProgressCircle from './TaskProgressCircle';

const Sidebar = ({ user, isDarkMode, themeClasses }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [sidebarWidth] = useState(280);
  const tasks = useSelector((state) => state.tasks.items);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className={`fixed left-0 top-4 p-2 ${themeClasses.sidebar} ${themeClasses.button.secondary} rounded-r-lg`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
    );
  }

  const menuItemBaseClass = `flex items-center gap-4 px-6 py-3 w-full transition-colors`;
  const menuItemDefault = isDarkMode
    ? 'text-[#E2E2E2] hover:bg-[#343434]'
    : 'text-gray-700 hover:bg-gray-100';
  const menuItemActive = isDarkMode
    ? 'text-[#98E19B] bg-[#355B37]'
    : 'text-green-700 bg-green-50';

  return (
    <aside
  className={`fixed left-0 top-0 h-[850px] ${themeClasses.sidebar} flex flex-col gap-2 overflow-hidden`}
  style={{ width: `${sidebarWidth}px` }}
>
  <div className="flex flex-col items-center h-full overflow-y-auto">
    {/* User Section */}
    <div className={`w-full flex flex-col items-center pt-8 pb-4 border-b ${themeClasses.border}`}>
      <img
        src="/Public/image37.png"  // Assuming the image is in the public folder
        alt="User Avatar"
        className={`w-[100px] h-[100px] rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-3`}
      />
      <span className={`text-sm font-medium ${themeClasses.text.primary}`}>
        Hey, {user?.name || 'Guest'}
      </span>
    </div>

        {/* Navigation Section */}
        <nav className="w-full py-6">
          <button className={`${menuItemBaseClass} ${menuItemDefault}`}>
            <CheckSquare className="w-5 h-5" />
            <span className="text-sm font-medium">All Tasks</span>
          </button>
          <button className={`${menuItemBaseClass} ${menuItemActive} rounded-lg`}>
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">Today</span>
          </button>
          <button className={`${menuItemBaseClass} ${menuItemDefault}`}>
            <Star className="w-5 h-5" />
            <span className="text-sm font-medium">Important</span>
          </button>
          <button className={`${menuItemBaseClass} ${menuItemDefault}`}>
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">Planned</span>
          </button>
          <button className={`${menuItemBaseClass} ${menuItemDefault}`}>
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">Assigned to me</span>
          </button>
        </nav>

        {/* Add List Section */}
        <div className={`w-full py-4 border-t ${themeClasses.border}`}>
          <button className={`${menuItemBaseClass} ${menuItemDefault}`}>
            <Plus className="w-5 h-5" />
            <span className="text-sm font-medium">Add list</span>
          </button>
        </div>

        {/* Today Tasks Section */}
        <div className={`w-full flex flex-col items-center ${isDarkMode ? 'bg-[#232323]' : 'bg-gray-50'} p-6 mt-4`}>
          <div className="flex items-center justify-between w-full mb-4">
            <span className={`font-medium text-[13px] ${themeClasses.text.primary}`}>
              Today Tasks
            </span>
            <button className={themeClasses.button.secondary}>
              <Info className="w-4 h-4" />
            </button>
          </div>

          {/* Task Progress Circle */}
          <TaskProgressCircle 
            completedTasks={completedTasks} 
            totalTasks={totalTasks} 
            isDarkMode={isDarkMode} 
          />

          {/* Total Tasks Counter */}
          <div className={`w-full mt-4 pt-4 border-t ${themeClasses.border}`}>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${themeClasses.text.secondary}`}>Total Tasks</span>
              <span className={`text-sm font-medium ${themeClasses.text.primary}`}>{totalTasks}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className={`text-sm ${themeClasses.text.secondary}`}>Completed</span>
              <span className={`text-sm font-medium ${themeClasses.text.primary}`}>{completedTasks}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className={`text-sm ${themeClasses.text.secondary}`}>Pending</span>
              <span className={`text-sm font-medium ${themeClasses.text.primary}`}>
                {totalTasks - completedTasks}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;