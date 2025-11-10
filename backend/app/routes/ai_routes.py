from flask import Blueprint, request, jsonify
from app.services.openai_service import OpenAIService
from app.services.accuweather_service import AccuWeatherService

ai_bp = Blueprint('ai', __name__, url_prefix='/api/ai')

# Initialize services
try:
    openai_service = OpenAIService()
    weather_service = AccuWeatherService()
except ValueError as e:
    print(f"Warning: {e}")
    openai_service = None
    weather_service = None


@ai_bp.route('/chat', methods=['POST'])
def chat():
    """Handle chat messages with AI assistant"""
    if not openai_service or not weather_service:
        return jsonify({
            'success': False,
            'error': 'AI service not configured. Please set API keys.'
        }), 500

    try:
        data = request.get_json()
        user_message = data.get('message', '')
        city = data.get('city', 'Hanoi')

        if not user_message:
            return jsonify({
                'success': False,
                'error': 'Message is required'
            }), 400

        # Get current weather for context
        location_key = weather_service.get_location_key(city)
        weather_context = {}

        if location_key:
            weather_data = weather_service.get_current_conditions(location_key)
            if weather_data:
                weather_context = weather_data

        # Generate AI response
        ai_response = openai_service.generate_chat_response(user_message, weather_context)

        if not ai_response:
            return jsonify({
                'success': False,
                'error': 'Failed to generate response'
            }), 500

        return jsonify({
            'success': True,
            'message': ai_response
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'An error occurred: {str(e)}'
        }), 500


@ai_bp.route('/alert', methods=['GET'])
def get_weather_alert():
    """Generate AI weather alert"""
    if not openai_service or not weather_service:
        return jsonify({
            'success': False,
            'error': 'AI service not configured. Please set API keys.'
        }), 500

    city = request.args.get('city', 'Hanoi')

    try:
        # Get location key
        location_key = weather_service.get_location_key(city)
        if not location_key:
            return jsonify({
                'success': False,
                'error': f'City "{city}" not found'
            }), 404

        # Get current conditions and hourly forecast
        weather_data = weather_service.get_current_conditions(location_key)
        hourly_forecast = weather_service.get_hourly_forecast(location_key, 12)

        if not weather_data:
            return jsonify({
                'success': False,
                'error': 'Failed to fetch weather data'
            }), 500

        # Generate alert
        alert = openai_service.generate_weather_alert(weather_data, hourly_forecast or [])

        if not alert:
            return jsonify({
                'success': False,
                'error': 'Failed to generate alert'
            }), 500

        return jsonify({
            'success': True,
            'alert': alert,
            'city': city
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'An error occurred: {str(e)}'
        }), 500
