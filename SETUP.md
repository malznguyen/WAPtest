# Weather AI Forecast - Setup Guide

Complete setup instructions for running the Weather AI Forecast application.

## Prerequisites

- **Node.js** (v18 or later)
- **Python** (v3.8 or later)
- **AccuWeather API Key** - Get it from [AccuWeather Developer Portal](https://developer.accuweather.com/)
- **OpenAI API Key** - Get it from [OpenAI Platform](https://platform.openai.com/)

---

## 🔧 Backend Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Create and activate virtual environment

**Linux/Mac:**
```bash
python -m venv venv
source venv/bin/activate
```

**Windows (PowerShell):**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```cmd
python -m venv venv
.\venv\Scripts\activate.bat
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Edit the `.env` file in the backend directory and add your API keys:

```env
ACCUWEATHER_API_KEY=your_accuweather_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
FLASK_ENV=development
```

### 5. Run the Flask server
```bash
python run.py
```

The backend should now be running on `http://localhost:5000`

**Test the backend:**
```bash
curl http://localhost:5000/health
```

You should see: `{"status": "ok"}`

---

## 💻 Frontend Setup

### 1. Open a new terminal and navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

The `.env.local` file already exists with the default backend URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

If your backend is running on a different port, update this file.

### 4. Run the Next.js development server
```bash
npm run dev
```

The frontend should now be running on `http://localhost:3000`

---

## 🚀 Accessing the Application

1. **Backend**: http://localhost:5000
2. **Frontend**: http://localhost:3000

Open your browser and visit `http://localhost:3000` to see the Weather AI Forecast application!

---

## ✅ Verification Checklist

After starting both servers, verify:

- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:3000`
- [ ] Weather data loads (Feels Like, Wind cards)
- [ ] Hourly forecast displays with times and temperatures
- [ ] 7-day forecast shows future weather
- [ ] AI Alert card displays generated weather tips
- [ ] Chat panel responds to messages
- [ ] No CORS errors in browser console
- [ ] 70/30 layout is properly displayed
- [ ] Glassmorphism styling visible on cards

---

## 🧪 Testing Endpoints

### Weather Endpoints:

**Current Weather:**
```bash
curl "http://localhost:5000/api/weather/current?city=Hanoi"
```

**Hourly Forecast:**
```bash
curl "http://localhost:5000/api/weather/hourly?city=Hanoi"
```

**Daily Forecast:**
```bash
curl "http://localhost:5000/api/weather/daily?city=Hanoi"
```

### AI Endpoints:

**Chat:**
```bash
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the weather like?", "city": "Hanoi"}'
```

**Alert:**
```bash
curl "http://localhost:5000/api/ai/alert?city=Hanoi"
```

---

## 🐛 Troubleshooting

### Backend Issues

**Problem: "ModuleNotFoundError: No module named 'flask'"**
- Solution: Make sure you activated the virtual environment and ran `pip install -r requirements.txt`

**Problem: Weather data not loading**
- Check your AccuWeather API key in `.env`
- Verify API key is valid and has available requests
- Check Flask console for error messages

**Problem: AI chat not working**
- Check your OpenAI API key in `.env`
- Verify you have API credits available
- Check Flask console for error messages

**Problem: CORS errors**
- Ensure `flask-cors` is installed: `pip install flask-cors`
- Verify `CORS(app)` is in `app/__init__.py`

### Frontend Issues

**Problem: "Module not found" errors**
- Run `npm install` in the frontend directory
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

**Problem: API calls failing**
- Check that backend is running on `http://localhost:5000`
- Verify `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Check browser console for detailed error messages

**Problem: Components not rendering**
- Check browser console for errors
- Verify all component files are in `app/components/` directory
- Make sure imports in `page.tsx` are correct

**Problem: Styling issues**
- Run `npm install tailwindcss postcss autoprefixer`
- Check that `tailwind.config.ts` exists
- Verify `globals.css` has Tailwind directives

---

## 📁 Project Structure

```
weather-ai-forecast/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── routes/
│   │   │   ├── weather_routes.py
│   │   │   └── ai_routes.py
│   │   └── services/
│   │       ├── accuweather_service.py
│   │       └── openai_service.py
│   ├── run.py
│   ├── requirements.txt
│   └── .env
│
└── frontend/
    ├── app/
    │   ├── components/
    │   │   ├── Header.tsx
    │   │   ├── BentoGrid.tsx
    │   │   ├── ChatPanel.tsx
    │   │   ├── FeelsLikeCard.tsx
    │   │   ├── WindCard.tsx
    │   │   ├── HourlyCard.tsx
    │   │   ├── DailyCard.tsx
    │   │   └── AIAlertCard.tsx
    │   ├── services/
    │   │   ├── weatherApi.ts
    │   │   └── chatApi.ts
    │   ├── types/
    │   │   └── weather.ts
    │   ├── page.tsx
    │   ├── layout.tsx
    │   └── globals.css
    ├── package.json
    ├── tailwind.config.ts
    └── .env.local
```

---

## 🎯 Features

✅ **Real-time Weather Data** from AccuWeather API
✅ **AI-Powered Chat** using OpenAI GPT-3.5
✅ **Smart Weather Alerts** generated by AI
✅ **Beautiful UI** with glassmorphism effects
✅ **Responsive Layout** with 70/30 split
✅ **Hourly & Daily Forecasts** with weather icons
✅ **Wind Direction Compass**
✅ **Feels Like Temperature**

---

## 📝 API Keys Setup

### AccuWeather API:
1. Visit https://developer.accuweather.com/
2. Sign up for a free account
3. Create a new app
4. Copy the API key
5. Paste it in `backend/.env` as `ACCUWEATHER_API_KEY`

**Note:** Free tier allows 50 API calls per day.

### OpenAI API:
1. Visit https://platform.openai.com/
2. Sign up or log in
3. Go to API Keys section
4. Create a new secret key
5. Copy the key
6. Paste it in `backend/.env` as `OPENAI_API_KEY`

**Note:** You need to add credits to your OpenAI account to use the API.

---

## 🎨 Customization

### Change Default City
Edit the city parameter in API calls:
- `frontend/app/services/weatherApi.ts`
- `frontend/app/services/chatApi.ts`

### Modify Colors
Edit Tailwind classes in component files or update `tailwind.config.ts`

### Add More Weather Metrics
1. Update `AccuWeatherService` in backend
2. Add new component in frontend
3. Add to `BentoGrid.tsx`

---

## 🚢 Production Deployment

### Backend (Flask):
- Use a WSGI server like Gunicorn
- Set `FLASK_ENV=production` in `.env`
- Configure proper CORS origins
- Use environment variables for API keys

### Frontend (Next.js):
- Run `npm run build`
- Deploy to Vercel, Netlify, or any Node.js hosting
- Set `NEXT_PUBLIC_API_URL` to your production backend URL

---

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all dependencies are installed
3. Check that API keys are valid
4. Review console logs for error messages
5. Ensure both servers are running

---

**Enjoy your Weather AI Forecast application!** 🌤️
