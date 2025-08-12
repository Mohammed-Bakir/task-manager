import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Import routes
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import taskRoutes from './routes/tasks.js';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);

// Socket.IO setup
const io = new Server(server, {
    cors: {
        origin: process.env.NODE_ENV === 'production'
            ? ["https://task-management-livid-three.vercel.app"]
            : ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? ["https://task-management-livid-three.vercel.app"]
        : ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.get('/api/health', (req, res) => {
    res.json({
        message: 'Task Manager API is running!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Project routes
app.use('/api/projects', projectRoutes);

// Task routes
app.use('/api/tasks', taskRoutes);

// Socket.IO for real-time updates
io.on('connection', (socket) => {
    console.log('👤 User connected:', socket.id);

    socket.on('join-project', (projectId) => {
        socket.join(projectId);
        console.log(`👤 User ${socket.id} joined project ${projectId}`);
    });

    socket.on('disconnect', () => {
        console.log('👤 User disconnected:', socket.id);
    });
});

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`🚀 Task Manager API running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});

export { io };
