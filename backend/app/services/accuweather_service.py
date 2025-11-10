import requests
import os

class AccuWeatherService:
    def __init__(self):
        self.api_key = os.getenv('ACCUWEATHER_API_KEY')
        self.base_url = 'http://dataservice.accuweather.com'

    def get_location_key(self, city='Hanoi'):
        url = f"{self.base_url}/locations/v1/cities/search"
        params = {'apikey': self.api_key, 'q': city}
        response = requests.get(url, params=params, timeout=10)
        data = response.json()
        return data[0]['Key'] if data else None

    def get_current(self, location_key):
        url = f"{self.base_url}/currentconditions/v1/{location_key}"
        params = {'apikey': self.api_key, 'details': 'true'}
        response = requests.get(url, params=params, timeout=10)
        data = response.json()[0]

        return {
            'temperature': data['Temperature']['Metric']['Value'],
            'feels_like': data['RealFeelTemperature']['Metric']['Value'],
            'weather_text': data['WeatherText'],
            'wind_speed': data['Wind']['Speed']['Metric']['Value'],
            'wind_direction': data['Wind']['Direction']['English'],
            'humidity': data['RelativeHumidity'],
            'uv_index': data.get('UVIndex', 0)
        }

    def get_hourly(self, location_key, hours=12):
        url = f"{self.base_url}/forecasts/v1/hourly/12hour/{location_key}"
        params = {'apikey': self.api_key, 'metric': 'true'}
        response = requests.get(url, params=params, timeout=10)
        data = response.json()

        return [{
            'time': h['DateTime'],
            'temperature': h['Temperature']['Value'],
            'icon': h['IconPhrase'],
            'precipitation': h.get('PrecipitationProbability', 0)
        } for h in data[:hours]]

    def get_daily(self, location_key):
        url = f"{self.base_url}/forecasts/v1/daily/5day/{location_key}"
        params = {'apikey': self.api_key, 'metric': 'true'}
        response = requests.get(url, params=params, timeout=10)
        data = response.json()

        return [{
            'date': d['Date'],
            'temp_max': d['Temperature']['Maximum']['Value'],
            'temp_min': d['Temperature']['Minimum']['Value'],
            'icon': d['Day']['IconPhrase'],
            'precipitation': d['Day'].get('PrecipitationProbability', 0)
        } for d in data['DailyForecasts']]
