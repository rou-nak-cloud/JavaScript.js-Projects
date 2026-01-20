# 🗂️ Kanban Board (v1)

A simple **Kanban Board** built with **Vanilla JavaScript**, supporting drag-and-drop task management, task persistence using `localStorage`, and dynamic UI updates.

This is **Version 1**, focused on core Kanban functionality without any frameworks.

---

## 🌐 Live Demo

🚀 **Live Link:**  
https://kanbanboardv1.vercel.app/

---

## 🚀 Features for (v1)

- ✅ Add new tasks with title and description
- 🧲 Drag & drop tasks between columns
- 🗑️ Delete tasks
- 📊 Live task count per column
- 🫙 Persistent data using `localStorage`
- 🧼 Clean empty-state handling (e.g., “No tasks”)
- 💡 Modular & readable JavaScript logic

---

## 📸 Screenshots

### Kanban Board – Overview

## 📷 Project Preview

| Kanban Board                            | Add Task Modal                          | Done Task State                             |
| --------------------------------------- | --------------------------------------- | ------------------------------------------- |
| ![Kanban Board](./assets/homeBoard.png) | ![Add Task Modal](./assets/addTask.png) | ![Done Task](./assets/doneTaskBoard%20.png) |
| Main Kanban board with all columns      | Modal for creating a new task           | Completed task with line-through state      |

### 🔹 Version 2 (v2) — Persistent & Interactive Board

**Goal:** Improve usability, persistence, and task lifecycle handling.

#### New & Enhanced Features

##### ✅ Advanced Task Data

- Tasks include:
  - **Created date**
  - **Optional due date**
- Clean date formatting and rendering

##### 🖱️ Improved Drag & Drop

- Smooth task movement between columns
- Automatic task count updates
- Column empty-state handling

##### ✔️ Completion Workflow

- When a task is moved to the **Done** column:
  - A **“Done?”** button appears
  - Clicking it:
    - Marks the task as completed
    - Applies **line-through** styling to the title
    - Button text changes to **“Completed”**
- Completion state is saved and restored using `localStorage`

##### 💾 Persistent State (localStorage)

- All tasks are saved with:
  - Title & description
  - Created date & due date
  - Column position
  - Completion status
- Board restores correctly after page reload

##### 🎨 UI & UX Improvements

- Hidden scrollbars for a clean dashboard look
- Visual distinction for completed tasks
- Flex-based task action buttons
- Modern dark-themed interface

---

## 📁 Columns

- **Todo**
- **In Progress**
- **Done**

Each column:

- Shows task count
- Displays an empty message when no tasks are present
- Updates automatically on add, delete, or drag

---

## 🛠️ Tech Stack

- **HTML**
- **CSS**
- **JavaScript (Vanilla)**

No libraries or frameworks used.

---

## 📦 How It Works

### ➕ Add Task

- Enter title & description
- Task is added to the **Todo** column
- Data is saved to `localStorage`

### 🧲 Drag & Drop

- Tasks are draggable across columns
- Column highlights on drag-over
- State updates on drop

### 🗑️ Delete Task

- Removes task from DOM
- Updates count & empty state
- Syncs changes to `localStorage`

### 💾 Persistence

- Tasks are stored in `localStorage`
- Reloading the page restores board state

---

## 🧠 Key Concepts Used

- Drag & Drop API
- Event Delegation
- DOM Manipulation
- `localStorage`
- Array & NodeList handling

---

## ⚠️ Known Limitations (v1)

- No edit task feature
- No mobile drag support
- No backend (localStorage only)

---

## 🔮 Future Improvements (v2+)

- ✏️ Edit task functionality
- 🏷️ Task labels & priorities
- 📱 Mobile drag support (Responsiveness)

---

## 📌 Why This Project Matters

This project demonstrates:

- Strong understanding of JavaScript fundamentals
- Ability to manage UI state without frameworks
- Clean DOM-based architecture
- Incremental feature development using versioning
- Practical problem-solving for real-world UI behavior

---

## 👨‍💻 Author

**Rounak Bakshi**

Feel free to fork, improve, or suggest enhancements 🚀

---

## ⭐ If you like this project

Give it a ⭐ on GitHub — it really helps!
