import os
import requests
from typing import Optional, Dict, Any

class AccuWeatherService:
    """Service for interacting with AccuWeather API"""

    BASE_URL = "http://dataservice.accuweather.com"

    def __init__(self):
        self.api_key = os.getenv('ACCUWEATHER_API_KEY')
        if not self.api_key:
            raise ValueError("ACCUWEATHER_API_KEY not found in environment variables")

    def get_location_key(self, city_name: str) -> Optional[str]:
        """
        Get location key for a city name

        Args:
            city_name: Name of the city

        Returns:
            Location key string or None if not found
        """
        try:
            url = f"{self.BASE_URL}/locations/v1/cities/search"
            params = {
                'apikey': self.api_key,
                'q': city_name
            }

            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()

            data = response.json()
            if data and len(data) > 0:
                return data[0]['Key']

            return None

        except requests.RequestException as e:
            print(f"Error fetching location key: {e}")
            return None

    def get_current_conditions(self, location_key: str) -> Optional[Dict[str, Any]]:
        """
        Get current weather conditions for a location

        Args:
            location_key: AccuWeather location key

        Returns:
            Dictionary with current conditions or None if error
        """
        try:
            url = f"{self.BASE_URL}/currentconditions/v1/{location_key}"
            params = {
                'apikey': self.api_key,
                'details': 'true'
            }

            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()

            data = response.json()
            if data and len(data) > 0:
                conditions = data[0]

                # Transform to simplified format
                return {
                    'temperature': conditions['Temperature']['Metric']['Value'],
                    'temperatureF': conditions['Temperature']['Imperial']['Value'],
                    'feelsLike': conditions['RealFeelTemperature']['Metric']['Value'],
                    'feelsLikeF': conditions['RealFeelTemperature']['Imperial']['Value'],
                    'weatherText': conditions['WeatherText'],
                    'weatherIcon': conditions['WeatherIcon'],
                    'humidity': conditions.get('RelativeHumidity', 0),
                    'wind': {
                        'speed': conditions['Wind']['Speed']['Metric']['Value'],
                        'direction': conditions['Wind']['Direction']['Degrees'],
                        'directionText': conditions['Wind']['Direction']['English']
                    },
                    'windGust': {
                        'speed': conditions.get('WindGust', {}).get('Speed', {}).get('Metric', {}).get('Value', 0)
                    },
                    'uvIndex': conditions.get('UVIndex', 0),
                    'uvIndexText': conditions.get('UVIndexText', 'Low'),
                    'visibility': conditions.get('Visibility', {}).get('Metric', {}).get('Value', 0),
                    'cloudCover': conditions.get('CloudCover', 0),
                    'pressure': conditions.get('Pressure', {}).get('Metric', {}).get('Value', 0),
                    'isDayTime': conditions.get('IsDayTime', True)
                }

            return None

        except requests.RequestException as e:
            print(f"Error fetching current conditions: {e}")
            return None

    def get_hourly_forecast(self, location_key: str, hours: int = 12) -> Optional[list]:
        """
        Get hourly forecast for a location

        Args:
            location_key: AccuWeather location key
            hours: Number of hours to fetch (12 or 24)

        Returns:
            List of hourly forecast data or None if error
        """
        try:
            endpoint = "12hour" if hours == 12 else "24hour"
            url = f"{self.BASE_URL}/forecasts/v1/hourly/{endpoint}/{location_key}"
            params = {
                'apikey': self.api_key,
                'details': 'true',
                'metric': 'true'
            }

            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()

            data = response.json()

            # Transform to simplified format
            hourly_data = []
            for hour in data:
                hourly_data.append({
                    'dateTime': hour['DateTime'],
                    'temperature': hour['Temperature']['Value'],
                    'temperatureF': hour['Temperature']['Value'] * 9/5 + 32,
                    'weatherIcon': hour['WeatherIcon'],
                    'iconPhrase': hour['IconPhrase'],
                    'precipitationProbability': hour.get('PrecipitationProbability', 0),
                    'rainProbability': hour.get('RainProbability', 0),
                    'snowProbability': hour.get('SnowProbability', 0),
                    'wind': {
                        'speed': hour['Wind']['Speed']['Value'],
                        'direction': hour['Wind']['Direction']['Degrees']
                    }
                })

            return hourly_data

        except requests.RequestException as e:
            print(f"Error fetching hourly forecast: {e}")
            return None

    def get_daily_forecast(self, location_key: str, days: int = 5) -> Optional[list]:
        """
        Get daily forecast for a location

        Args:
            location_key: AccuWeather location key
            days: Number of days to fetch (1 or 5)

        Returns:
            List of daily forecast data or None if error
        """
        try:
            endpoint = "5day" if days == 5 else "1day"
            url = f"{self.BASE_URL}/forecasts/v1/daily/{endpoint}/{location_key}"
            params = {
                'apikey': self.api_key,
                'details': 'true',
                'metric': 'true'
            }

            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()

            data = response.json()

            # Transform to simplified format
            daily_data = []
            for day in data.get('DailyForecasts', []):
                daily_data.append({
                    'date': day['Date'],
                    'temperatureMin': day['Temperature']['Minimum']['Value'],
                    'temperatureMax': day['Temperature']['Maximum']['Value'],
                    'temperatureMinF': day['Temperature']['Minimum']['Value'] * 9/5 + 32,
                    'temperatureMaxF': day['Temperature']['Maximum']['Value'] * 9/5 + 32,
                    'day': {
                        'icon': day['Day']['Icon'],
                        'iconPhrase': day['Day']['IconPhrase'],
                        'precipitationProbability': day['Day'].get('PrecipitationProbability', 0),
                        'rainProbability': day['Day'].get('RainProbability', 0),
                        'snowProbability': day['Day'].get('SnowProbability', 0)
                    },
                    'night': {
                        'icon': day['Night']['Icon'],
                        'iconPhrase': day['Night']['IconPhrase'],
                        'precipitationProbability': day['Night'].get('PrecipitationProbability', 0)
                    }
                })

            return daily_data

        except requests.RequestException as e:
            print(f"Error fetching daily forecast: {e}")
            return None

    def get_weather_alerts(self, location_key: str) -> Optional[list]:
        """
        Get active weather alerts for a location

        Args:
            location_key: AccuWeather location key

        Returns:
            List of weather alerts or None if error
        """
        try:
            url = f"{self.BASE_URL}/alerts/v1/{location_key}"
            params = {
                'apikey': self.api_key,
                'details': 'true'
            }

            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()

            data = response.json()

            # Transform to simplified format
            alerts = []
            for alert in data:
                alerts.append({
                    'alertId': alert.get('AlertID', ''),
                    'type': alert.get('Type', 'Unknown'),
                    'severity': alert.get('Severity', 0),
                    'headline': alert.get('Description', {}).get('Localized', 'Weather Alert'),
                    'category': alert.get('Category', 'General'),
                    'priority': alert.get('Priority', 0),
                    'source': alert.get('Source', 'AccuWeather'),
                    'startTime': alert.get('Area', [{}])[0].get('StartTime', '') if alert.get('Area') else '',
                    'endTime': alert.get('Area', [{}])[0].get('EndTime', '') if alert.get('Area') else ''
                })

            return alerts

        except requests.RequestException as e:
            print(f"Error fetching weather alerts: {e}")
            return None

    def get_weather_indices(self, location_key: str, days: int = 1) -> Optional[list]:
        """
        Get weather indices (air quality, pollen, outdoor activity, etc.) for a location

        Args:
            location_key: AccuWeather location key
            days: Number of days (1 or 5)

        Returns:
            List of weather indices or None if error
        """
        try:
            endpoint = "1day" if days == 1 else "5day"
            url = f"{self.BASE_URL}/indices/v1/daily/{endpoint}/{location_key}"
            params = {
                'apikey': self.api_key,
                'details': 'true'
            }

            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()

            data = response.json()

            # Transform to simplified format
            indices = []
            for index in data:
                indices.append({
                    'id': index.get('ID', 0),
                    'name': index.get('Name', ''),
                    'category': index.get('Category', ''),
                    'categoryValue': index.get('CategoryValue', 0),
                    'value': index.get('Value', 0),
                    'text': index.get('Text', ''),
                    'ascending': index.get('Ascending', False)
                })

            return indices

        except requests.RequestException as e:
            print(f"Error fetching weather indices: {e}")
            return None

    def get_extended_forecast(self, location_key: str, days: int = 15) -> Optional[list]:
        """
        Get extended daily forecast for a location (up to 15 days)

        Args:
            location_key: AccuWeather location key
            days: Number of days (10 or 15)

        Returns:
            List of daily forecast data or None if error
        """
        try:
            endpoint = "15day" if days == 15 else "10day"
            url = f"{self.BASE_URL}/forecasts/v1/daily/{endpoint}/{location_key}"
            params = {
                'apikey': self.api_key,
                'details': 'true',
                'metric': 'true'
            }

            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()

            data = response.json()

            # Transform to simplified format
            daily_data = []
            for day in data.get('DailyForecasts', []):
                daily_data.append({
                    'date': day['Date'],
                    'temperatureMin': day['Temperature']['Minimum']['Value'],
                    'temperatureMax': day['Temperature']['Maximum']['Value'],
                    'temperatureMinF': day['Temperature']['Minimum']['Value'] * 9/5 + 32,
                    'temperatureMaxF': day['Temperature']['Maximum']['Value'] * 9/5 + 32,
                    'day': {
                        'icon': day['Day']['Icon'],
                        'iconPhrase': day['Day']['IconPhrase'],
                        'precipitationProbability': day['Day'].get('PrecipitationProbability', 0),
                        'rainProbability': day['Day'].get('RainProbability', 0),
                        'snowProbability': day['Day'].get('SnowProbability', 0)
                    },
                    'night': {
                        'icon': day['Night']['Icon'],
                        'iconPhrase': day['Night']['IconPhrase'],
                        'precipitationProbability': day['Night'].get('PrecipitationProbability', 0)
                    }
                })

            return daily_data

        except requests.RequestException as e:
            print(f"Error fetching extended forecast: {e}")
            return None

    def get_historical_weather(self, location_key: str, hours: int = 24) -> Optional[list]:
        """
        Get historical weather conditions for a location (past 6 or 24 hours)

        Args:
            location_key: AccuWeather location key
            hours: Number of hours (6 or 24)

        Returns:
            List of historical weather data or None if error
        """
        try:
            endpoint = "24" if hours == 24 else "6"
            url = f"{self.BASE_URL}/currentconditions/v1/{location_key}/historical/{endpoint}"
            params = {
                'apikey': self.api_key,
                'details': 'true'
            }

            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()

            data = response.json()

            # Transform to simplified format
            historical_data = []
            for condition in data:
                historical_data.append({
                    'dateTime': condition.get('LocalObservationDateTime', ''),
                    'epochTime': condition.get('EpochTime', 0),
                    'temperature': condition['Temperature']['Metric']['Value'],
                    'temperatureF': condition['Temperature']['Imperial']['Value'],
                    'weatherText': condition['WeatherText'],
                    'weatherIcon': condition['WeatherIcon'],
                    'humidity': condition.get('RelativeHumidity', 0),
                    'wind': {
                        'speed': condition['Wind']['Speed']['Metric']['Value'],
                        'direction': condition['Wind']['Direction']['Degrees']
                    },
                    'pressure': condition.get('Pressure', {}).get('Metric', {}).get('Value', 0),
                    'isDayTime': condition.get('IsDayTime', True)
                })

            return historical_data

        except requests.RequestException as e:
            print(f"Error fetching historical weather: {e}")
            return None
