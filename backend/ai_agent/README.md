# AI Agent System

This AI agent system enhances your chatbot with advanced capabilities including memory, reasoning, tools, and context awareness.

## Features

### 🧠 Memory System
- **Conversation Memory**: Remembers previous interactions
- **Fact Memory**: Stores important information about users
- **Preference Memory**: Learns user preferences over time
- **Action Memory**: Remembers actions taken

### 🔧 Tool System
- **Weather API**: Get weather information for any city
- **News API**: Fetch latest news on topics
- **Calculator**: Evaluate mathematical expressions
- **Time/Date**: Get current time and date information
- **URL Shortener**: Shorten long URLs

### 🎯 Context Awareness
- **Sentiment Analysis**: Understands user emotions
- **Topic Tracking**: Follows conversation themes
- **User Preferences**: Adapts responses based on user behavior
- **Technical Level**: Adjusts complexity based on user expertise

### 🤖 Reasoning Chain
- **Multi-step Analysis**: Breaks down complex requests
- **Confidence Scoring**: Provides confidence levels for responses
- **Context Integration**: Uses previous context for better responses

## API Endpoints

### Chat
- `POST /api/chatbot/chat` - Main chat endpoint with AI agent
- `GET /api/chatbot/suggestions` - Get chat suggestions

### Agent Management
- `GET /api/chatbot/agent/status/{session_id}` - Get agent status
- `GET /api/chatbot/agent/status` - Get all agents status
- `POST /api/chatbot/agent/memory/{session_id}` - Add memory
- `GET /api/chatbot/agent/memory/{session_id}` - Get memories

### Tools
- `GET /api/chatbot/tools` - List available tools
- `POST /api/chatbot/tools/execute` - Execute a tool

### Session Management
- `GET /api/chatbot/session/{session_id}` - Get session history
- `DELETE /api/chatbot/session/{session_id}` - Clear session

## Usage Examples

### Basic Chat
```python
response = await agent.process_message("Tell me about your projects", "user-session-123")
```

### Using Tools
```python
# Get weather
weather = execute_tool("get_weather", city="New York")

# Calculate
result = execute_tool("calculate", expression="2 + 2 * 3")

# Get news
news = execute_tool("get_news", topic="technology", limit=3)
```

### Adding Memory
```python
agent.add_memory(
    content="User is interested in machine learning",
    importance=0.8,
    memory_type="preference",
    context={"topic": "machine_learning"}
)
```

## Configuration

### Environment Variables
```bash
# Add to your .env file
WEATHER_API_KEY=your_openweathermap_api_key
NEWS_API_KEY=your_news_api_key
```

### Custom Tools
You can add custom tools by registering them in the `ToolRegistry`:

```python
from ai_agent.tools import tool_registry

def my_custom_tool(param1: str, param2: int) -> Dict[str, Any]:
    # Your tool logic here
    return {"result": "success"}

tool_registry.register_tool(
    "my_tool",
    my_custom_tool,
    "Description of my tool",
    {"param1": "string", "param2": "integer"}
)
```

## Architecture

```
AI Agent System
├── Agent Manager (manages multiple agents)
├── AI Agent (core intelligence)
│   ├── Memory System
│   ├── Tool System
│   ├── Reasoning Chain
│   └── Context Management
└── Tool Registry (external integrations)
```

## Benefits

1. **Persistent Memory**: Remembers conversations across sessions
2. **Intelligent Responses**: Uses context and reasoning for better answers
3. **External Integration**: Can fetch real-time data from APIs
4. **Personalization**: Adapts to individual user preferences
5. **Scalability**: Supports multiple concurrent users
6. **Extensibility**: Easy to add new tools and capabilities

## Future Enhancements

- **Natural Language Processing**: Advanced NLP for better understanding
- **Machine Learning**: Learn from user interactions
- **Voice Integration**: Speech-to-text and text-to-speech
- **Multi-modal**: Support for images, documents, and other media
- **Advanced Reasoning**: Chain-of-thought reasoning for complex tasks
- **API Integrations**: More external service integrations 