from flask import Blueprint, request, jsonify
from app.services.accuweather_service import AccuWeatherService

weather_bp = Blueprint('weather', __name__, url_prefix='/api/weather')
service = AccuWeatherService()

@weather_bp.route('/current')
def current():
    city = request.args.get('city', 'Hanoi')
    try:
        key = service.get_location_key(city)
        data = service.get_current(key)
        return jsonify({'success': True, 'data': data})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@weather_bp.route('/hourly')
def hourly():
    city = request.args.get('city', 'Hanoi')
    try:
        key = service.get_location_key(city)
        data = service.get_hourly(key)
        return jsonify({'success': True, 'data': data})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@weather_bp.route('/daily')
def daily():
    city = request.args.get('city', 'Hanoi')
    try:
        key = service.get_location_key(city)
        data = service.get_daily(key)
        return jsonify({'success': True, 'data': data})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
