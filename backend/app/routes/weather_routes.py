from flask import Blueprint, request, jsonify
from app.services.accuweather_service import AccuWeatherService

weather_bp = Blueprint('weather', __name__, url_prefix='/api/weather')

# Initialize service
try:
    weather_service = AccuWeatherService()
except ValueError as e:
    print(f"Warning: {e}")
    weather_service = None


@weather_bp.route('/current', methods=['GET'])
def get_current_weather():
    """Get current weather conditions for a city"""
    if not weather_service:
        return jsonify({
            'success': False,
            'error': 'Weather service not configured. Please set ACCUWEATHER_API_KEY.'
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

        # Get current conditions
        conditions = weather_service.get_current_conditions(location_key)
        if not conditions:
            return jsonify({
                'success': False,
                'error': 'Failed to fetch weather data'
            }), 500

        return jsonify({
            'success': True,
            'data': conditions,
            'city': city
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'An error occurred: {str(e)}'
        }), 500


@weather_bp.route('/hourly', methods=['GET'])
def get_hourly_forecast():
    """Get hourly forecast for a city"""
    if not weather_service:
        return jsonify({
            'success': False,
            'error': 'Weather service not configured. Please set ACCUWEATHER_API_KEY.'
        }), 500

    city = request.args.get('city', 'Hanoi')
    hours = int(request.args.get('hours', 12))

    try:
        # Get location key
        location_key = weather_service.get_location_key(city)
        if not location_key:
            return jsonify({
                'success': False,
                'error': f'City "{city}" not found'
            }), 404

        # Get hourly forecast
        forecast = weather_service.get_hourly_forecast(location_key, hours)
        if not forecast:
            return jsonify({
                'success': False,
                'error': 'Failed to fetch forecast data'
            }), 500

        return jsonify({
            'success': True,
            'data': forecast,
            'city': city
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'An error occurred: {str(e)}'
        }), 500


@weather_bp.route('/daily', methods=['GET'])
def get_daily_forecast():
    """Get daily forecast for a city"""
    if not weather_service:
        return jsonify({
            'success': False,
            'error': 'Weather service not configured. Please set ACCUWEATHER_API_KEY.'
        }), 500

    city = request.args.get('city', 'Hanoi')
    days = int(request.args.get('days', 5))

    try:
        # Get location key
        location_key = weather_service.get_location_key(city)
        if not location_key:
            return jsonify({
                'success': False,
                'error': f'City "{city}" not found'
            }), 404

        # Get daily forecast
        forecast = weather_service.get_daily_forecast(location_key, days)
        if not forecast:
            return jsonify({
                'success': False,
                'error': 'Failed to fetch forecast data'
            }), 500

        return jsonify({
            'success': True,
            'data': forecast,
            'city': city
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'An error occurred: {str(e)}'
        }), 500
