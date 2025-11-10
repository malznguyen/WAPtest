from flask import Blueprint, request, jsonify
from openai import OpenAI
import os
from app.services.accuweather_service import AccuWeatherService

ai_bp = Blueprint('ai', __name__, url_prefix='/api/ai')
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
weather_service = AccuWeatherService()

@ai_bp.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message')
    city = data.get('city', 'Hanoi')

    try:
        key = weather_service.get_location_key(city)
        weather = weather_service.get_current(key)

        context = f"Current weather in {city}: {weather['temperature']}°C, {weather['weather_text']}, wind {weather['wind_speed']} km/h"

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"You are a helpful weather assistant. {context}. Give brief, friendly responses."},
                {"role": "user", "content": message}
            ],
            max_tokens=150
        )

        return jsonify({'success': True, 'message': response.choices[0].message.content})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@ai_bp.route('/alert')
def alert():
    city = request.args.get('city', 'Hanoi')

    try:
        key = weather_service.get_location_key(city)
        weather = weather_service.get_current(key)
        hourly = weather_service.get_hourly(key, 4)

        context = f"Current: {weather['temperature']}°C, {weather['weather_text']}. Next hours: {', '.join([str(h['temperature']) + '°C' for h in hourly])}"

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Generate ONE brief weather alert or tip (max 25 words) based on this data."},
                {"role": "user", "content": context}
            ],
            max_tokens=50
        )

        return jsonify({'success': True, 'alert': response.choices[0].message.content})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
