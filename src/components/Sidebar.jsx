import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CheckSquare, Calendar, Star, Users, Plus, ChevronLeft, Info } from 'lucide-react';
import { addTask } from '../store/slices/tasksSlice';

const TaskProgressCircle = ({ completedTasks, totalTasks, isDarkMode }) => {
  const calculateSegments = () => {
    if (totalTasks === 0) return [0, 0];
    const completedAngle = (completedTasks / totalTasks) * 360;
    const pendingAngle = 360 - completedAngle;
    return [completedAngle, pendingAngle];
  };

  const [completedAngle, pendingAngle] = calculateSegments();

  // Theme-based colors
  const pendingColor = isDarkMode ? "#347136" : "#166534";
  const completedColor = isDarkMode ? "#74ab77" : "#86efac";

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {pendingAngle > 0 && (
            <path
              d={describeArc(50, 50, 40, 0, pendingAngle)}
              fill="none"
              stroke={pendingColor}
              strokeWidth="12"
              strokeLinecap="round"
            />
          )}
          {completedAngle > 0 && (
            <path
              d={describeArc(50, 50, 40, pendingAngle, 360)}
              fill="none"
              stroke={completedColor}
              strokeWidth="12"
              strokeLinecap="round"
            />
          )}
          <circle cx="50" cy="50" r="30" fill="transparent" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {totalTasks}
          </span>
        </div>
      </div>
      <div className={`flex gap-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
        <span className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-[#347136]' : 'bg-green-700'}`}></div>
          Pending
        </span>
        <span className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-[#74ab77]' : 'bg-green-300'}`}></div>
          Done
        </span>
      </div>
    </div>
  );
};

const Sidebar = ({ user, themeClasses, isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [sidebarWidth] = useState(280);
  const dispatch = useDispatch();
  
  const tasks = useSelector((state) => state.tasks.items);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const starredTasks = tasks.filter((task) => task.isStarred).length;

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      title: `Task ${totalTasks + 1}`,
      completed: false,
      isStarred: false,
      priority: 'normal',
      createdAt: new Date().toISOString(),
    };
    dispatch(addTask(newTask));
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className={`fixed left-0 top-4 p-2 ${themeClasses.sidebar} rounded-r-lg shadow-md`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
    );
  }

  const menuItemBaseClass = "flex items-center gap-4 px-6 py-3 w-full transition-colors";
  const menuItemDefault = `${themeClasses.text.primary} ${themeClasses.hover}`;
  const menuItemActive = `${themeClasses.text.accent} ${themeClasses.card}`;

  return (
    <aside
      className={`fixed left-0 top-0 h-screen ${themeClasses.sidebar} flex flex-col overflow-hidden border-r ${themeClasses.border}`}
      style={{ width: `${sidebarWidth}px` }}
    >
      <div className="flex flex-col h-full">
        <div className={`sticky top-0 z-10 w-full flex flex-col items-center pt-8 pb-4 border-b ${themeClasses.border} ${themeClasses.sidebar}`}>
          <div className={`w-[100px] h-[100px] rounded-full overflow-hidden ${themeClasses.card} mb-3`}>
            <img src="Public\image37.png" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <span className={`text-sm font-medium ${themeClasses.text.primary}`}>
            Hey, {user?.name || 'Guest'}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="w-full py-6">
            <button className={`${menuItemBaseClass} ${menuItemDefault}`}>
              <CheckSquare className="w-5 h-5" />
              <span className="text-sm font-medium">All Tasks ({totalTasks})</span>
            </button>
            <button className={`${menuItemBaseClass} ${menuItemActive} rounded-lg`}>
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">Today</span>
            </button>
            <button className={`${menuItemBaseClass} ${menuItemDefault}`}>
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium">Important ({starredTasks})</span>
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

          <div className={`w-full py-4 border-t ${themeClasses.border}`}>
            <button 
              className={`${menuItemBaseClass} ${menuItemDefault}`}
              onClick={handleAddTask}
            >
              <Plus className="w-5 h-5" />
              <span className="text-sm font-medium">Add Task</span>
            </button>
          </div>

          <div className={`mx-4 rounded-lg ${themeClasses.card} p-6`}>
            <div className="flex items-center justify-between w-full mb-4">
              <span className={`font-medium text-[13px] ${themeClasses.text.primary}`}>
                Today Tasks
              </span>
              <button className={themeClasses.button.secondary}>
                <Info className="w-4 h-4" />
              </button>
            </div>

            <TaskProgressCircle 
              completedTasks={completedTasks} 
              totalTasks={totalTasks}
              isDarkMode={isDarkMode}
            />

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
      </div>
    </aside>
  );
};

export default Sidebar;