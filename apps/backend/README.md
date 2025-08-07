# Backend Service

This is the NestJS backend service for the React Nest Template. It provides RESTful APIs, authentication, and optional integrations.

## 🚀 Features

- NestJS with TypeScript
- RESTful API architecture
- Google OAuth authentication
- JWT authentication
- Optional integrations (OpenAI, AWS)

## 🔧 Required Setup

### 1. Environment Variables

Create a `.env` file in the `apps/backend` directory with the following required variables, refer to [.env.example] for details.

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable Google+ API:
   - Navigate to APIs & Services → Library
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 Credentials:
   - Go to APIs & Services → Credentials
   - Click Create Credentials → OAuth 2.0 Client ID
   - Choose Web Application
5. Configure Authorized Redirect URIs:
   - Development: `http://localhost:4000/api/auth/google/callback`
   - Production: `https://yourdomain.com/api/auth/google/callback`
6. Copy the credentials to your `.env` file

### 3. JWT Secret Setup

Generate a secure JWT secret using:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add the generated secret to your `.env` file as `JWT_SECRET`.

## 🎯 Optional Features

### OpenAI Integration

To enable OpenAI features:

1. Add to `.env`:

```env
ENABLE_OPENAI=true
OPENAI_API_KEY=your_openai_api_key
```

2. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

Note: This is an experimental feature and can be safely removed if not needed.

### AWS Integration

To enable AWS features:

1. Add to `.env`:

```env
ENABLE_AWS=true
AWS__ACCESS_KEY_ID=your_aws_access_key
AWS__SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
```

Note: This is an optional feature and can be safely removed if not needed.

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start:dev

# Build for production
pnpm build

# Run tests
pnpm test
```

## 🔐 Security Notes

- Never commit `.env` files to version control
- Regularly rotate your JWT secret in production
- Keep your Google OAuth credentials secure
- Use environment-specific configuration for production
