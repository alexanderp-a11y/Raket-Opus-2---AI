import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { ChatbotService } from './services/chatbotService.js';
import { router } from './routes/chatRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api', router);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Raket Opus 2 AI is running! 🚀',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Raket Opus 2 - Developer AI Chatbot',
    version: '1.0.0',
    endpoints: {
      chat: 'POST /api/chat',
      conversation: 'GET /api/chat/conversation/:id',
      clearConversation: 'POST /api/chat/clear/:id',
      listConversations: 'GET /api/chat/conversations',
      health: 'GET /health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'An error occurred',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Raket Opus 2 AI Chatbot running on http://localhost:${PORT}`);
  console.log(`🌐 Open http://localhost:${PORT} in your browser`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});
