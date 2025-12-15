# Task Board - Full Stack Application

A beautiful, polished task management application built with FastAPI (Python) and React + Tailwind CSS.

## ✨ Features

### Core Features

- ✅ Add tasks with a clean input interface
- ✅ Mark tasks as complete/incomplete with checkboxes
- ✅ Delete tasks
- ✅ Real-time progress tracking with animated progress bar
- ✅ Task statistics dashboard (total, completed, pending, completion rate)

### Unique Features 🎯

1. **Streak Counter**: Track consecutive completed tasks with a fire emoji indicator
2. **Confetti Celebration**: Animated confetti explosion when all tasks are completed
3. **Beautiful Gradient UI**: Modern glass-morphism design with smooth animations
4. **Optimistic Updates**: Instant UI feedback for better UX
5. **Motivational Messages**: Encouraging feedback when you hit a 3+ task streak

## 🏗️ Tech Stack

**Backend:**

- FastAPI (Python)
- Pydantic for data validation
- JSON file-based persistence
- RESTful API design
- CORS enabled for local development

**Frontend:**

- React 18
- Vite (fast build tool)
- Tailwind CSS (utility-first styling)
- Canvas Confetti (celebration effects)
- Modern gradient and glass-morphism design

## 🚀 Setup & Installation

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

```bash
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```

The backend will run on `http://localhost:8000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint           | Description                          |
| ------ | ------------------ | ------------------------------------ |
| GET    | `/api/tasks`       | Get all tasks                        |
| POST   | `/api/tasks`       | Create a new task                    |
| PATCH  | `/api/tasks/{id}`  | Update task completion status        |
| DELETE | `/api/tasks/{id}`  | Delete a task                        |
| GET    | `/api/tasks/stats` | Get task statistics including streak |

## 🎨 Design Highlights

- **Glass Morphism**: Semi-transparent cards with backdrop blur
- **Gradient Accents**: Purple-to-pink gradient theme throughout
- **Smooth Animations**: Slide-up, fade-in, and bounce-in effects
- **Responsive Layout**: Works beautifully on all screen sizes
- **Hover Effects**: Interactive feedback on all clickable elements

## 🔥 Unique Features Explained

### Streak Counter

The app tracks consecutive completed tasks. Each time you complete a task, if the previous task was also completed, your streak increases. This gamification element encourages productivity!

### Confetti Celebration

When you complete ALL tasks on your board, the app triggers a beautiful confetti animation using canvas-confetti library, celebrating your achievement!

### Optimistic UI Updates

The UI updates immediately when you check/uncheck tasks, providing instant feedback while the API request processes in the background.

## 📁 Project Structure

```
Fluid AI/
├── backend/
│   ├── app.py              # FastAPI application
│   ├── requirements.txt    # Python dependencies
│   ├── tasks.json          # Runtime data storage (auto-generated)
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── TaskBoard.jsx    # Main task board component
│   │   ├── App.jsx              # Root component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .gitignore
└── README.md
```

## 🛠️ Development Notes

- **Data Persistence**: Tasks are stored in `tasks.json` during runtime
- **CORS**: Configured to allow frontend development on port 3000
- **Proxy**: Vite is configured to proxy `/api` requests to the backend
- **Hot Reload**: Both frontend and backend support hot reloading during development

## 🎯 What Makes This Stand Out

1. **Polished UI/UX**: Not just functional, but beautiful to use
2. **Gamification**: Streak counter adds a fun, motivational element
3. **Celebration**: Confetti effect creates a delightful moment of achievement
4. **Clean Code**: Well-structured, commented, and following best practices
5. **Modern Stack**: Using latest tools and frameworks
6. **Smooth Animations**: Every interaction feels premium

## 📝 Future Enhancements

- Task categories/tags
- Due dates and reminders
- Task priority levels
- Dark mode toggle
- Persistent storage (SQLite/PostgreSQL)
- User authentication
- Task search and filtering

---

Built with ❤️ for demonstrating full-stack development skills
