import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import models
import User from '../models/User.js';
import Project from '../models/Project.js';
import Task from '../models/Task.js';

const cleanDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('📦 Connected to MongoDB');

        // Clear all collections
        console.log('🧹 Cleaning database...');

        await User.deleteMany({});
        console.log('✅ Users collection cleared');

        await Project.deleteMany({});
        console.log('✅ Projects collection cleared');

        await Task.deleteMany({});
        console.log('✅ Tasks collection cleared');

        console.log('🎉 Database cleaned successfully!');
        console.log('📊 All collections are now empty and ready for fresh data');

    } catch (error) {
        console.error('❌ Error cleaning database:', error);
    } finally {
        // Close connection
        await mongoose.connection.close();
        console.log('🔌 Database connection closed');
        process.exit(0);
    }
};

// Run the cleanup
cleanDatabase();