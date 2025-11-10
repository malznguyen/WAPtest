# 🌤️ Weather AI Forecast

AI-powered weather forecast application with intelligent suggestions.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.x
- Python >= 3.10
- Redis (optional, for caching)

### Frontend Setup (PowerShell)
```powershell
cd frontend
npm install
npm run dev
```
Access at: http://localhost:3000

### Backend Setup (PowerShell)
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python run.py
```
Access at: http://localhost:5000

## 🔑 Environment Variables

Create `.env.local` in frontend and `.env` in backend with:
- `ACCUWEATHER_API_KEY`: Get from AccuWeather
- `OPENAI_API_KEY`: Get from OpenAI

## 📚 Tech Stack
- Frontend: Next.js 14, TypeScript, Tailwind CSS
- Backend: Flask, Python
- AI: OpenAI API
- Weather Data: AccuWeather API

## 🪟 Windows Setup Notes
- Use PowerShell (not CMD)
- If virtual environment activation fails, run: 
  `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
