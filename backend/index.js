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
        origin: [
            "https://task-management-livid-three.vercel.app",
            "http://localhost:5173",
            "http://localhost:3000"
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});

// Temporary wildcard CORS for debugging
app.use(cors({
    origin: true, // Allow all origins temporarily
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    preflightContinue: false,
    optionsSuccessStatus: 200
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

// Test endpoint to check CORS
app.get('/api/test', (req, res) => {
    res.json({
        message: 'CORS test successful!',
        timestamp: new Date().toISOString(),
        origin: req.headers.origin,
        cors: 'wildcard enabled'
    });
});

// Clean database endpoint (for development only)
app.post('/api/admin/clean-database', async (req, res) => {
    try {
        // Import models
        const User = (await import('./models/User.js')).default;
        const Project = (await import('./models/Project.js')).default;
        const Task = (await import('./models/Task.js')).default;

        // Clear all collections
        await User.deleteMany({});
        await Project.deleteMany({});
        await Task.deleteMany({});

        res.json({
            success: true,
            message: 'Database cleaned successfully!',
            timestamp: new Date().toISOString(),
            cleared: ['users', 'projects', 'tasks']
        });
    } catch (error) {
        console.error('Error cleaning database:', error);
        res.status(500).json({
            success: false,
            message: 'Error cleaning database',
            error: error.message
        });
    }
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
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Task Manager API running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});

export { io };
