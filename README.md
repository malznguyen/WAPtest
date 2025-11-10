# 🌤️ Weather AI Forecast

A modern, production-ready weather application that combines real-time weather data from AccuWeather with AI-powered insights from OpenAI. Features a beautiful glassmorphism design with an intelligent chat assistant for weather-related queries.

![Weather AI Forecast](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **Real-Time Weather Data**: Current conditions, hourly forecasts (12 hours), and 5-day forecasts powered by AccuWeather
- **AI Weather Assistant**: Interactive chat panel with OpenAI integration for intelligent weather insights
- **Smart Weather Alerts**: AI-generated contextual weather tips and recommendations
- **Beautiful UI**: Modern glassmorphism design with smooth animations
- **Bento Grid Layout**: Professional 70/30 split layout optimized for weather data display
- **Interactive Charts**: Visual temperature trends with line charts
- **City Search**: Search and view weather for any city worldwide
- **Responsive Design**: Optimized for all screen sizes

## 🎨 Design Highlights

- **Light Theme**: Clean, professional appearance inspired by Apple Weather
- **Glassmorphism Cards**: Frosted glass effect with backdrop blur
- **Sky-Blue Gradient**: Calming color palette transitioning from light to deep blue
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Modern Typography**: Clean, readable fonts with proper hierarchy

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **Python** >= 3.10 ([Download](https://www.python.org/))
- **AccuWeather API Key** ([Get Free Key](https://developer.accuweather.com/))
- **OpenAI API Key** ([Get Key](https://platform.openai.com/api-keys))

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd WAPtest
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env
# Edit .env and add your API keys
```

**Backend `.env` file:**
```env
ACCUWEATHER_API_KEY=your_accuweather_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
FLASK_ENV=development
```

**Start the backend server:**
```bash
python run.py
```
Backend will run on: `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Edit .env.local if needed (default uses localhost:5000)
```

**Frontend `.env.local` file:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Start the frontend server:**
```bash
npm run dev
```
Frontend will run on: `http://localhost:3000`

### 4. Open the Application

Navigate to `http://localhost:3000` in your web browser. The app should load with default weather data for Hanoi. Use the search bar to check weather for any city!

## 🔑 API Keys Setup

### AccuWeather API

1. Go to [AccuWeather Developer Portal](https://developer.accuweather.com/)
2. Create a free account
3. Create a new app to get your API key
4. **Note**: Free tier has 50 calls/day limit

### OpenAI API

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. **Note**: API usage is charged based on tokens used (GPT-3.5-turbo is cost-effective)

## 📚 Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first styling
- **React Hooks**: Modern state management

### Backend
- **Flask**: Python web framework
- **Flask-CORS**: Cross-origin resource sharing
- **Flask-Limiter**: Rate limiting protection
- **OpenAI Python SDK**: AI integration
- **Requests**: HTTP client for API calls

### APIs
- **AccuWeather API**: Weather data provider
- **OpenAI GPT-3.5-turbo**: AI chat and alerts

## 📁 Project Structure

```
WAPtest/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # Flask app factory
│   │   ├── routes/              # API routes
│   │   │   ├── weather_routes.py
│   │   │   └── ai_routes.py
│   │   └── services/            # Business logic
│   │       ├── accuweather_service.py
│   │       └── openai_service.py
│   ├── requirements.txt
│   ├── run.py                   # App entry point
│   └── .env.example
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx             # Main page
│   │   ├── layout.tsx           # Root layout
│   │   └── globals.css          # Global styles
│   ├── components/              # React components
│   │   ├── Header.tsx
│   │   ├── CurrentWeatherCard.tsx
│   │   ├── FeelsLikeCard.tsx
│   │   ├── WindCard.tsx
│   │   ├── HourlyForecastCard.tsx
│   │   ├── DailyForecastCard.tsx
│   │   ├── AIAlertCard.tsx
│   │   └── ChatPanel.tsx
│   ├── services/                # API services
│   │   ├── weatherService.ts
│   │   └── aiService.ts
│   ├── types/                   # TypeScript types
│   │   └── weather.ts
│   ├── utils/                   # Utility functions
│   │   └── weatherIcons.ts
│   ├── package.json
│   └── .env.local.example
│
└── README.md
```

## 🔌 API Endpoints

### Weather Endpoints

- `GET /api/weather/current?city=CityName` - Get current weather conditions
- `GET /api/weather/hourly?city=CityName&hours=12` - Get hourly forecast
- `GET /api/weather/daily?city=CityName&days=5` - Get daily forecast

### AI Endpoints

- `POST /api/ai/chat` - Send message to AI assistant
  ```json
  {
    "message": "What should I wear today?",
    "city": "London"
  }
  ```
- `GET /api/ai/alert?city=CityName` - Get AI-generated weather alert

### Health Check

- `GET /api/health` - Check if API is running

## 🎯 Usage Guide

### Searching for Cities

1. Use the search bar at the top of the page
2. Type any city name (e.g., "New York", "Tokyo", "Paris")
3. Click "Search" or press Enter
4. All weather cards will update with data for the new city

### Using the AI Chat

1. The chat panel is on the right side
2. Type your weather-related question
3. Press Enter or click "Send"
4. The AI will respond with contextual information based on current weather

**Example Questions:**
- "What's the weather like today?"
- "Should I bring an umbrella?"
- "What should I wear?"
- "Is it good weather for outdoor activities?"

### Understanding Weather Cards

- **Current Weather**: Shows temperature, conditions, and key metrics
- **Feels Like**: Real feel temperature
- **Wind**: Wind speed, gusts, and direction with compass
- **AI Weather Insight**: Smart contextual tips (auto-refreshes every 30 min)
- **Hourly Forecast**: Next 12 hours with temperature chart
- **7-Day Forecast**: 5-day forecast with high/low temperatures

## 🛠️ Development

### Running in Development Mode

Both frontend and backend support hot-reloading:

```bash
# Backend (in backend directory)
python run.py  # Flask debug mode enabled

# Frontend (in frontend directory)
npm run dev    # Next.js hot-reload enabled
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

**Backend:**
Update `FLASK_ENV=production` in `.env` and use a production WSGI server like Gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 "app:create_app()"
```

## 🐛 Troubleshooting

### Backend Issues

**"ACCUWEATHER_API_KEY not found"**
- Ensure `.env` file exists in backend directory
- Check that API keys are properly set
- Don't use quotes around values in `.env`

**"Failed to fetch weather data"**
- Check AccuWeather API key is valid
- Verify you haven't exceeded rate limits (50 calls/day on free tier)
- Check internet connection

### Frontend Issues

**"Failed to load weather data"**
- Ensure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for CORS errors

**Components not displaying**
- Ensure all npm packages are installed (`npm install`)
- Clear Next.js cache: `rm -rf .next` and restart

### Windows-Specific Issues

**PowerShell Execution Policy Error**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Virtual environment activation fails**
- Use PowerShell (not CMD)
- Try: `.\venv\Scripts\Activate.ps1`

## 🚀 Deployment

### Frontend (Vercel Recommended)

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy!

### Backend (Render/Railway Recommended)

1. Use a platform that supports Python apps
2. Set environment variables for API keys
3. Use production WSGI server (Gunicorn)
4. Update frontend `NEXT_PUBLIC_API_URL` to point to deployed backend

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

Built with ☀️ by the Weather AI Forecast team
