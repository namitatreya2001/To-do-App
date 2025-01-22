# Advanced React To-Do Application with API Integration

## Overview
This repository contains an advanced To-Do application developed using React with API integration, Redux for state management, and responsive design principles. The application is designed to provide a seamless and user-friendly experience across all devices.

---

## Features

### Core Functionality
- **Add Task:** Users can add tasks via an input field and a button or by pressing Enter.
- **View Tasks:** Displays all added tasks in a structured list format.
- **Delete Task:** Each task has a delete button for removal.
- **Task Prioritization:** Users can assign priorities (High, Medium, Low) to tasks and view them accordingly.
- **Persistent Storage:** Utilizes local storage for saving tasks and authentication status across sessions.

### Advanced State Management
- Uses Redux for managing global state and Redux Thunk for handling asynchronous API calls.
- Simulates user authentication with mock login/logout functionality and protects the To-Do list behind authentication.

### API Integration
- Integrates the [Spoonacular Food API](https://spoonacular.com/food-api) to fetch relevant data for tasks.
- Includes robust error handling for API requests, ensuring errors are displayed gracefully in the UI.

### Responsive Design
- Fully responsive design implemented using CSS Grid, Flexbox, and a mobile-first approach.
- Compatible with mobile, tablet, and desktop devices.

### User Experience Enhancements
- Displays contextual API data .
- Ensures a clean and intuitive user interface using Material-UI.

---

## Screenshots

### Login Page
<img width="959" alt="Image" src="https://github.com/user-attachments/assets/10829847-2056-43ab-8975-1e8b231ebbca" />

### Task List View
<img width="944" alt="Image" src="https://github.com/user-attachments/assets/ad072601-c907-4033-9291-bd1c941ce1c4" />

### Recipe Suggestions
<img width="923" alt="Image" src="https://github.com/user-attachments/assets/8417569b-0126-48b9-a633-2eb3fddba826" />

### Light theme
<img width="948" alt="Image" src="https://github.com/user-attachments/assets/91999b66-a55c-48ca-b810-e48f5c76d654" />

### Sidebar Section
<img width="179" alt="Image" src="https://github.com/user-attachments/assets/a5c6a146-dcc2-4b93-9a29-af5bcb0519c6" />

### Task Details Section


---

## Setup Instructions

### Prerequisites
Ensure the following are installed on your system:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Clone the Repository
```bash
git clone https://github.com/namitatreya2001/To-do-App.git
cd To-do-App

```
###Install Dependecies
```bash
npm install
```
###Run the application
```bash
npm run dev
```
Application will run on http://localhost:5173/

# To-Do List Application

A feature-rich To-Do List application built with React and Redux that helps users manage tasks efficiently. This app supports task prioritization, user authentication, and API integration with the Spoonacular Food API.

---

## 🚀 Features

### Adding a Task
- Enter the task description in the input field.
- Optionally, set the task's priority (High, Medium, Low).
- Press `Enter` or click the `+` button to add the task.

### Viewing Tasks
- Tasks are displayed in a list format.
- Tasks with higher priority are highlighted for better visibility.

### Deleting a Task
- Click the `Delete` button next to a task to remove it from the list.

### Authentication
- **Login**: Access the To-Do list by logging into your account.
- **Logout**: Clear session data by logging out.

---

## 🛠️ Technologies Used

### Frontend
- **React**: For building the UI.
- **Redux**: For state management.
- **Redux Thunk**: For handling asynchronous operations.
- **Material-UI**: For styling and component design.
- **CSS**: Layout designed using Flexbox and Grid.

### API Integration
- **Spoonacular Food API**: Integrated for enhanced functionality.

### State Management
- **Redux**: Ensures a smooth flow of data and state updates across the application.

### Package Management
- **npm**: For managing dependencies and scripts.

---

### License

This project is licensed under the **MIT License**.

---

### Author

GitHub: [@namitatreya2001](https://github.com/namitatreya2001)  
Feel free to contribute to this project by submitting issues or pull requests!

---

### Additional Notes
- Ensure you update the `.env` file with your API key for the Spoonacular Food API:
  ```bash
  REACT_APP_API_KEY=your_api_key_here
```
