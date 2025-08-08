# Chat & Learn (CNL) - AI Chatbot

An AI-powered chatbot designed for personalized learning. This web application allows users to log in via Google authentication and engage in meaningful conversations powered by the OpenAI API. Built with a scalable architecture, leveraging AWS services for deployment and database management.

## 🚀 Features

- **🔐 Secure Authentication**: Google OAuth 2.0 integration for secure user login
- **🤖 AI-Powered Conversations**: Intelligent responses using OpenAI API for personalized learning
- **☁️ Cloud-Native Architecture**: Deployed on AWS AppRunner for efficient cloud hosting
- **📊 Scalable Database**: AWS DynamoDB for reliable data storage and retrieval
- **🐳 Containerized Deployment**: Docker containers for consistent deployment across environments
- **📱 Responsive Design**: Modern React interface that works seamlessly across devices
- **🔄 Real-time Chat**: Interactive chat interface with message persistence

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Recoil
- **Backend**: NestJS, TypeScript
- **Database**: AWS DynamoDB
- **Authentication**: Google OAuth 2.0, JWT
- **AI Integration**: OpenAI API
- **Containerization**: Docker
- **Deployment**: AWS AppRunner
- **Development Tools**: Vite, PNPM, ESLint, Prettier

## 📦 Project Structure

```
├── apps/
│   ├── frontend/          # React chat interface
│   ├── backend/           # NestJS API server
│   └── storybook-react-ui # UI component documentation
└── pnpm-workspace.yaml    # PNPM workspace configuration
```

<!-- ## 🌐 Live Application

**Chat & Learn is deployed and ready to use!**

Visit the live application to start chatting and learning with AI assistance. -->

## 🛠️ Local Development

For contributors and developers who want to run the application locally:

### Prerequisites

- Node.js (>= 20.11.1)
- PNPM (>= 9.11.0)
- AWS account with DynamoDB access (for backend)
- Google OAuth credentials
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd cnl

# Install dependencies
pnpm install
```

### Environment Setup

1. **Backend Configuration**: Set up your `.env` file in `apps/backend/` (see [Backend README](./apps/backend/README.md))
2. **Google OAuth**: Configure Google OAuth credentials
3. **OpenAI API**: Add your OpenAI API key
4. **AWS**: Configure AWS DynamoDB access

### Development

```bash
# Start both frontend and backend
pnpm start

# Or start individually:
# Frontend (React app)
pnpm --filter frontend start

# Backend (NestJS API)
pnpm --filter backend start:dev

# UI Components (Storybook)
pnpm --filter storybook-react-ui dev
```

## 🔧 Backend Setup

The backend service requires some configuration before it can be used. Please refer to the [Backend README](./apps/backend/README.md) for detailed setup instructions, including:

- Required environment variables
- Google OAuth setup
- JWT configuration
- Optional feature setup (OpenAI, AWS)

## 🔧 Configuration

### Frontend Configuration

- **Vite**: Fast development server and optimized builds
- **Tailwind CSS**: Utility-first styling with custom design system
- **TypeScript**: Strict type checking for robust development
- **Recoil**: State management for chat messages and user data

### Backend Configuration

- **NestJS**: Modular API architecture with dependency injection
- **Authentication**: Google OAuth 2.0 with JWT tokens
- **Database**: AWS DynamoDB for scalable message and user storage
- **AI Integration**: OpenAI API for intelligent chat responses

## 🧪 Testing

```bash
# Run frontend tests
pnpm --filter frontend test

# Run backend tests
pnpm --filter backend test
```

## 🐳 Docker Support

Both frontend and backend include Docker configurations for containerized deployment;
See Dockerfile in each folder for details.

## 📝 License

MIT

## 🚀 Future Enhancements

- **CI/CD Pipeline**: GitHub Actions integration for automated testing and deployment
- **Performance Optimizations**: Caching strategies and response time improvements
- **Enhanced AI Features**: More sophisticated learning algorithms and personalized responses
- **Mobile App**: Native mobile application for iOS and Android
- **Advanced Analytics**: User engagement tracking and learning progress insights
- **Multi-language Support**: Internationalization for global accessibility
