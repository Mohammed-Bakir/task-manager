# 🚀 TaskFlow - Modern Task Management App

A professional task management application with Kanban boards, real-time collaboration, and modern UI.

## ✨ Features

- 📋 **Kanban Boards** - Drag & drop task management
- 👥 **Team Collaboration** - Real-time updates with Socket.IO
- 🔐 **User Authentication** - Secure JWT-based auth
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Clean, professional interface
- 📊 **Project Management** - Multiple projects and boards
- ⏰ **Due Dates & Priorities** - Task scheduling and prioritization
- 💬 **Comments & Attachments** - Rich task details

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js** - Server framework
- **MongoDB** + **Mongoose** - Database
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React 19** + **Vite** - Modern React setup
- **React Router** - Client-side routing
- **@dnd-kit** - Drag and drop functionality
- **Socket.IO Client** - Real-time updates
- **Axios** - HTTP client
- **React Icons** - Icon library
- **date-fns** - Date utilities

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)

### Installation

1. **Clone and setup**
   ```bash
   cd task-manager
   ```

2. **Backend setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend setup** (in new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the app**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

## 📁 Project Structure

```
task-manager/
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── index.js         # Server entry point
│   └── .env            # Environment variables
└── frontend/
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   ├── hooks/       # Custom hooks
    │   ├── utils/       # Utility functions
    │   ├── context/     # React context
    │   └── App.jsx      # Main app component
    └── package.json
```

## 🔧 Environment Variables

Create `.env` file in backend directory:

```env
JWT_SECRET=your-super-secret-jwt-key
MONGODB_URI=mongodb://localhost:27017/taskmanager
NODE_ENV=development
PORT=5001
```

## 📝 API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/projects` - Get user projects
- `POST /api/projects` - Create new project
- `GET /api/tasks/:projectId` - Get project tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🎯 Development Roadmap

- [x] Project setup and structure
- [ ] User authentication system
- [ ] Project management
- [ ] Kanban board with drag & drop
- [ ] Task CRUD operations
- [ ] Real-time collaboration
- [ ] Comments and attachments
- [ ] Due dates and priorities
- [ ] Search and filtering
- [ ] Mobile responsiveness

## 🤝 Contributing

This is a portfolio project showcasing modern web development practices.

## 📄 License

MIT License - feel free to use this project for learning and portfolio purposes.