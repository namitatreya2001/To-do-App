import React, { useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./store";
import {
  Menu,
  LogOut,
  Calendar,
  Star,
  Users,
  CheckSquare,
  Plus,
  Bell,
  Search,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { logout } from "./store/slices/authSlice";
import { toggleLeftSidebar, toggleRightSidebar } from "./store/slices/uiSlice";
import Auth from "./components/Auth";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Sidebar from "./components/Sidebar";
import RecipeList from "./components/RecipeList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const themeConfig = {
  light: {
    main: "bg-gray-100 text-gray-800",
    sidebar: "bg-white",
    header: "bg-white shadow-sm",
    card: "bg-white shadow-sm",
    input: "bg-white text-gray-800",
    button: {
      primary: "bg-green-600 text-white hover:bg-green-700 transition-colors",
      secondary: "text-gray-600 hover:text-green-600 transition-colors",
    },
    border: "border-gray-200",
    hover: "hover:bg-gray-50",
    text: {
      primary: "text-gray-900",
      secondary: "text-gray-600",
      accent: "text-green-600",
    },
  },
  dark: {
    main: "bg-[#232323] text-gray-300",
    sidebar: "bg-[#2C2C2C]",
    header: "bg-[#2b2b2b]",
    card: "bg-[#2f3630]",
    input: "bg-[#232323] text-gray-300",
    button: {
      primary: "bg-[#347136] text-[#a1b3a2] hover:bg-[#3d8040] transition-colors",
      secondary: "text-gray-400 hover:text-[#74ab77] transition-colors",
    },
    border: "border-[#3d4d3e]",
    hover: "hover:bg-[#3d4d3e]",
    text: {
      primary: "text-gray-200",
      secondary: "text-gray-400",
      accent: "text-[#74ab77]",
    },
  },
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { leftSidebarVisible, rightSidebarVisible } = useSelector(
    (state) => state.ui
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  const themeClasses = isDarkMode ? themeConfig.dark : themeConfig.light;

  const renderHeader = () => (
    <header className={`p-4 flex justify-between items-center ${themeClasses.header}`}>
      <div className="flex items-center gap-2">
        <button
          onClick={() => dispatch(toggleLeftSidebar())}
          className={themeClasses.button.secondary}
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className={themeClasses.text.accent + " font-bold text-xl"}>
          DoIt
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {[
          { id: 'search', icon: Search },
          { id: 'notification', icon: Bell },
          { id: 'theme', icon: isDarkMode ? Sun : Moon },
          { id: 'logout', icon: LogOut }
        ].map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              if (id === 'theme') toggleTheme();
              if (id === 'logout') dispatch(logout());
            }}
            className={themeClasses.button.secondary}
          >
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    </header>
  );

  const renderRightSidebar = () => (
    <aside 
      className={`fixed right-0 top-0 w-[450px] h-full p-6 ${themeClasses.sidebar} border-l ${themeClasses.border}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-lg font-semibold ${themeClasses.text.primary}`}>
          Task Details
        </h2>
        <button
          onClick={() => dispatch(toggleRightSidebar())}
          className={themeClasses.button.secondary}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <button 
          className={`w-full flex items-center gap-3 p-3 text-sm ${themeClasses.hover} rounded-lg`}
        >
          <Plus className="w-5 h-5" />
          <span>Add Step</span>
        </button>

        <div className="w-full p-3 space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <Bell className="w-5 h-5" />
            <span>Set Reminder</span>
          </div>
          <DatePicker
            selected={selectedTime}
            onChange={(date) => setSelectedTime(date)}
            showTimeOnly
            showTimeSelect
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className={`w-full p-2 rounded-lg ${themeClasses.input} border ${themeClasses.border}`}
            
          />
        </div>

        <div className="w-full p-3 space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-5 h-5" />
            <span>Add Due Date</span>
          </div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className={`w-full p-2 rounded-lg ${themeClasses.input} border ${themeClasses.border}`}
          />
        </div>
      </div>
    </aside>
  );

  return (
    <div className={`min-h-screen flex ${isDarkMode ? "bg-[#242424]" : "bg-gray-50"}`}>
      {leftSidebarVisible && (
        <aside 
          className={`fixed left-0 top-0 h-[850px] ${themeClasses.sidebar} flex flex-col gap-2 overflow-hidden`}
          style={{ width: "280px" }}
        >
          <Sidebar 
  user={user} 
  themeClasses={themeClasses}
  isDarkMode={isDarkMode}
/>
        </aside>
      )}

      <main
        className={`flex-1 transition-all ${
          leftSidebarVisible ? "ml-[280px]" : "ml-[50px]"
        } ${rightSidebarVisible ? "mr-[450px]" : "mr-0"} ${themeClasses.main}`}
      >
        {renderHeader()}

        <div className="p-6">
          <TaskInput isDarkMode={isDarkMode} themeClasses={themeClasses} />
          <TaskList isDarkMode={isDarkMode} themeClasses={themeClasses} />
          <RecipeList isDarkMode={isDarkMode} themeClasses={themeClasses} />
        </div>
      </main>

      {rightSidebarVisible ? (
        renderRightSidebar()
      ) : (
        <button
          onClick={() => dispatch(toggleRightSidebar())}
          className={`fixed right-0 top-4 p-2 rounded-l-lg ${themeClasses.sidebar} ${themeClasses.button.secondary}`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Dashboard /> : <Auth />;
}

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppWrapper;