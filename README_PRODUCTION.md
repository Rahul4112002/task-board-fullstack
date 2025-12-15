# 🎯 Task Board - Full Stack Application

A modern, production-ready task management application built with FastAPI (Python) and React + Tailwind CSS.

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://your-app.netlify.app)
[![Backend API](https://img.shields.io/badge/API-docs-blue?style=for-the-badge)](https://your-backend.onrender.com/docs)

## ✨ Features

### Core Features

- ✅ **Add Tasks** - Quick task creation with clean interface
- ✅ **Complete/Uncomplete** - Toggle task status with checkbox
- ✅ **Delete Tasks** - Remove tasks you no longer need
- ✅ **Progress Tracking** - Visual progress bar with percentage
- ✅ **Statistics Dashboard** - Total, completed, pending tasks

### Unique Features 🎯

- 🔥 **Streak Counter** - Track consecutive completed tasks
- 🎊 **Confetti Celebration** - Animated celebration when all tasks complete
- 📊 **Real-time Stats** - Instant updates on task statistics
- ⚡ **Optimistic Updates** - Instant UI feedback
- 💪 **Responsive Design** - Works on all devices

## 🛠️ Tech Stack

### Backend

- **FastAPI** - Modern Python web framework
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server
- **JSON Storage** - File-based persistence

### Frontend

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Canvas Confetti** - Celebration effects

### Deployment

- **Netlify** - Frontend hosting
- **Render** - Backend hosting
- **GitHub** - Version control

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Local Development

#### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend runs on: http://localhost:8000

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:3000

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**

1. Push to GitHub
2. Deploy backend to Render
3. Deploy frontend to Netlify
4. Configure environment variables

## 🔧 Configuration

### Backend Environment Variables

```env
CORS_ORIGINS=https://your-frontend-url.netlify.app
PORT=8000
```

### Frontend Environment Variables

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## 📡 API Documentation

Once deployed, visit:

- **Swagger UI:** `https://your-backend.onrender.com/docs`
- **ReDoc:** `https://your-backend.onrender.com/redoc`

### Endpoints

| Method | Endpoint           | Description     |
| ------ | ------------------ | --------------- |
| GET    | `/api/tasks`       | Get all tasks   |
| POST   | `/api/tasks`       | Create new task |
| PATCH  | `/api/tasks/{id}`  | Update task     |
| DELETE | `/api/tasks/{id}`  | Delete task     |
| GET    | `/api/tasks/stats` | Get statistics  |

## 🎨 Design Features

- **Clean UI** - Minimalist, focused design
- **Smooth Animations** - Slide-up, fade-in effects
- **Progress Visualization** - Animated progress bar
- **Responsive Layout** - Mobile-first approach
- **Color Scheme** - Modern gradient palette

## 🧪 Testing

### Manual Testing

1. Add a task
2. Mark as complete
3. Delete a task
4. Complete all tasks (see confetti!)

### API Testing

```bash
# Get all tasks
curl https://your-backend.onrender.com/api/tasks

# Create task
curl -X POST https://your-backend.onrender.com/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test task"}'
```

## 📊 Project Structure

```
task-board-fullstack/
├── backend/
│   ├── app.py              # FastAPI application
│   ├── requirements.txt    # Python dependencies
│   └── .env.example        # Environment template
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── TaskBoard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── netlify.toml        # Netlify config
├── DEPLOYMENT.md           # Deployment guide
└── README.md              # This file
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Your Name**

- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your Name](https://linkedin.com/in/your-profile)

## 🌟 Show Your Support

Give a ⭐️ if you like this project!

## 📸 Screenshots

_Add screenshots of your application here after deployment_

## 🔮 Future Enhancements

- [ ] User authentication
- [ ] Task categories/tags
- [ ] Due dates and reminders
- [ ] Priority levels
- [ ] Dark mode
- [ ] Export/import tasks
- [ ] Database integration (PostgreSQL)
- [ ] Real-time collaboration
- [ ] Mobile app

## 🐛 Known Issues

- Tasks reset on backend restart (use database for persistence)
- Render free tier has cold starts (~30s)

## 💡 Acknowledgments

- FastAPI documentation
- React documentation
- Tailwind CSS
- Canvas Confetti library

---

Built with ❤️ using FastAPI and React
