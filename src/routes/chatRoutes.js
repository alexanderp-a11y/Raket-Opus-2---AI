import express from 'express';
import { ChatbotService } from '../services/chatbotService.js';

export const router = express.Router();

// Initialize chatbot service
let chatbot;
try {
  chatbot = new ChatbotService();
} catch (error) {
  console.error('Failed to initialize chatbot:', error.message);
}

// Store conversation history (in production, use a database like MongoDB or PostgreSQL)
const conversations = new Map();

/**
 * POST /api/chat
 * Send a question to the chatbot and get a response
 * 
 * Request body:
 * {
 *   "question": "How do I create a REST API?",
 *   "conversationId": "optional-id-for-maintaining-context"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "question": "How do I create a REST API?",
 *   "answer": "To create a REST API...",
 *   "conversationId": "optional-id"
 * }
 */
router.post('/chat', async (req, res) => {
  try {
    if (!chatbot) {
      return res.status(500).json({
        error: 'Chatbot service not initialized. Please check your OPENAI_API_KEY in the .env file.'
      });
    }

    const { question, conversationId } = req.body;

    // Validate input
    if (!question || question.trim() === '') {
      return res.status(400).json({
        error: 'Question cannot be empty'
      });
    }

    if (question.length > 5000) {
      return res.status(400).json({
        error: 'Question is too long (max 5000 characters)'
      });
    }

    // Get conversation history if conversationId is provided
    let history = [];
    if (conversationId && conversations.has(conversationId)) {
      history = conversations.get(conversationId);
    }

    // Get response from chatbot
    const response = await chatbot.askQuestion(question, history);

    // Update conversation history
    if (conversationId) {
      history.push(
        { role: 'user', content: question },
        { role: 'assistant', content: response }
      );
      // Keep only the last 20 messages to avoid token bloat
      if (history.length > 40) {
        history = history.slice(-40);
      }
      conversations.set(conversationId, history);
    }

    res.json({
      success: true,
      question,
      answer: response,
      conversationId: conversationId || null
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'An error occurred while processing your question'
    });
  }
});

/**
 * GET /api/chat/conversation/:id
 * Retrieve the conversation history for a specific conversation ID
 * 
 * Response:
 * {
 *   "conversationId": "conversation-123",
 *   "messages": [
 *     {"role": "user", "content": "How do I..."},
 *     {"role": "assistant", "content": "To..."}
 *   ]
 * }
 */
router.get('/chat/conversation/:id', (req, res) => {
  const { id } = req.params;
  const conversation = conversations.get(id);

  if (!conversation) {
    return res.status(404).json({
      error: 'Conversation not found'
    });
  }

  res.json({
    conversationId: id,
    messageCount: conversation.length,
    messages: conversation
  });
});

/**
 * POST /api/chat/clear/:id
 * Clear a specific conversation
 * 
 * Response:
 * {
 *   "success": true,
 *   "message": "Conversation cleared"
 * }
 */
router.post('/chat/clear/:id', (req, res) => {
  const { id } = req.params;
  const deleted = conversations.delete(id);

  res.json({
    success: deleted,
    message: deleted ? 'Conversation cleared' : 'Conversation not found'
  });
});

/**
 * GET /api/chat/conversations
 * List all active conversation IDs
 * 
 * Response:
 * {
 *   "count": 3,
 *   "conversations": ["conv-1", "conv-2", "conv-3"]
 * }
 */
router.get('/chat/conversations', (req, res) => {
  const conversationIds = Array.from(conversations.keys());
  
  res.json({
    count: conversationIds.length,
    conversations: conversationIds
  });
});
