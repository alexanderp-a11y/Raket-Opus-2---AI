# 🚀 Raket Opus 2 - Developer AI Chatbot

A powerful, intelligent chatbot designed to answer any question developers might have. Get instant help with coding, debugging, architecture, and best practices.

## ✨ Features

- 🤖 **AI-Powered**: Built on GPT-4 for accurate, helpful responses
- 💬 **Conversation Memory**: Maintains context across multiple questions
- 🎯 **Developer-Focused**: Expertise in all major programming languages and frameworks
- ⚡ **Fast & Reliable**: Instant responses with high accuracy
- 📚 **Comprehensive**: Covers programming, DevOps, databases, security, and more
- 🔄 **Stateful**: Keeps track of conversation history for better context

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **OpenAI API** - AI engine (GPT-4)
- **Axios** - HTTP client

## 📋 Prerequisites

- Node.js 16+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## 🚀 Quick Start

### 1. Clone and Setup

```bash
git clone https://github.com/alexanderp-a11y/Raket-Opus-2---AI.git
cd Raket-Opus-2---AI
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-api-key-here
PORT=3000
NODE_ENV=development
MODEL=gpt-4
MAX_TOKENS=2000
TEMPERATURE=0.7
```

### 3. Start the Server

```bash
npm start
```

You should see:
```
🚀 Developer Chatbot running on http://localhost:3000
📝 Send questions to POST /api/chat
```

## 📡 API Endpoints

### Ask a Question

**POST** `/api/chat`

Request:
```json
{
  "question": "How do I create a REST API in Node.js?",
  "conversationId": "optional-conversation-123"
}
```

Response:
```json
{
  "success": true,
  "question": "How do I create a REST API in Node.js?",
  "answer": "To create a REST API in Node.js, you can use Express.js...",
  "conversationId": "optional-conversation-123"
}
```

### Get Conversation History

**GET** `/api/chat/conversation/:id`

Response:
```json
{
  "conversationId": "conversation-123",
  "messages": [
    {"role": "user", "content": "How do I..."},
    {"role": "assistant", "content": "To..."}
  ]
}
```

### Clear Conversation

**POST** `/api/chat/clear/:id`

Response:
```json
{
  "success": true,
  "message": "Conversation cleared"
}
```

## 💡 Example Usage

### Using cURL

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What are the best practices for error handling in JavaScript?"
  }'
```

### Using JavaScript/Fetch

```javascript
const response = await fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    question: 'Explain async/await in JavaScript',
    conversationId: 'my-chat-1'
  })
});

const data = await response.json();
console.log(data.answer);
```

### Using Python/Requests

```python
import requests

response = requests.post('http://localhost:3000/api/chat', json={
    'question': 'How do I optimize database queries?',
    'conversationId': 'my-chat-1'
})

print(response.json()['answer'])
```

## 📚 Ask About

- **Programming Languages**: JavaScript, Python, Java, C++, Go, Rust, etc.
- **Web Development**: React, Vue, Angular, Node.js, Django, etc.
- **Mobile Development**: React Native, Flutter, Swift, Kotlin
- **DevOps & Cloud**: Docker, Kubernetes, AWS, Azure, GCP
- **Databases**: SQL, NoSQL, MongoDB, PostgreSQL, Redis
- **Architecture**: Design patterns, microservices, scalability
- **Security**: Authentication, encryption, best practices
- **Debugging & Testing**: Unit tests, integration tests, debugging
- **Git & Version Control**: Workflows, branching strategies
- **And much more!**

## 🔧 Development

### Run in Watch Mode

```bash
npm run dev
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_API_KEY` | Required | Your OpenAI API key |
| `PORT` | 3000 | Server port |
| `NODE_ENV` | development | Environment |
| `MODEL` | gpt-4 | AI model to use |
| `MAX_TOKENS` | 2000 | Max response tokens |
| `TEMPERATURE` | 0.7 | Response creativity (0-1) |

## 📝 Notes

- Conversation history is stored in memory (use a database for production)
- Each API call uses tokens from your OpenAI account
- Keep your API key secure - never commit `.env` to version control
- For production, implement proper authentication and rate limiting

## 🐛 Troubleshooting

### "OPENAI_API_KEY is not set"
- Make sure you've created a `.env` file
- Add your valid OpenAI API key to it

### "401 Unauthorized"
- Check that your API key is correct
- Verify your OpenAI account has credits

### Slow responses
- This is normal for complex questions
- Consider adjusting `TEMPERATURE` or `MAX_TOKENS`

## 📄 License

MIT License - feel free to use this project however you'd like!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 🎉 Get Started Now!

1. Get your OpenAI API key
2. Clone this repo
3. Run `npm install`
4. Add your API key to `.env`
5. Run `npm start`
6. Start asking questions!

---

**Made with ❤️ for developers everywhere**
