import os
from openai import OpenAI
from typing import Optional, Dict, Any

class OpenAIService:
    """Service for interacting with OpenAI API"""

    def __init__(self):
        api_key = os.getenv('OPENAI_API_KEY')
        if not api_key:
            raise ValueError("OPENAI_API_KEY not found in environment variables")

        self.client = OpenAI(api_key=api_key)
        self.model = "gpt-3.5-turbo"

    def generate_chat_response(self, user_message: str, weather_context: Dict[str, Any]) -> Optional[str]:
        """
        Generate a chat response with weather context

        Args:
            user_message: The user's message
            weather_context: Current weather data for context

        Returns:
            AI response string or None if error
        """
        try:
            # Create system message with weather context
            system_message = f"""You are a helpful weather assistant. You provide friendly, conversational responses about weather.

Current weather context:
- Temperature: {weather_context.get('temperature', 'N/A')}°C (feels like {weather_context.get('feelsLike', 'N/A')}°C)
- Conditions: {weather_context.get('weatherText', 'N/A')}
- Humidity: {weather_context.get('humidity', 'N/A')}%
- Wind: {weather_context.get('wind', {}).get('speed', 'N/A')} km/h {weather_context.get('wind', {}).get('directionText', '')}

Guidelines:
- Be conversational and friendly
- Reference the actual weather data when relevant
- Keep responses concise (2-4 sentences)
- Provide helpful weather-related advice
- If asked about weather, use the context provided above
"""

            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": user_message}
                ],
                max_tokens=150,
                temperature=0.7
            )

            return response.choices[0].message.content

        except Exception as e:
            print(f"Error generating chat response: {e}")
            return None

    def generate_weather_alert(self, weather_data: Dict[str, Any], hourly_forecast: list) -> Optional[str]:
        """
        Generate a weather alert/tip based on current and forecast data

        Args:
            weather_data: Current weather conditions
            hourly_forecast: List of hourly forecast data

        Returns:
            Alert text string or None if error
        """
        try:
            # Prepare weather summary
            temp = weather_data.get('temperature', 'N/A')
            feels_like = weather_data.get('feelsLike', 'N/A')
            conditions = weather_data.get('weatherText', 'N/A')
            humidity = weather_data.get('humidity', 'N/A')
            wind_speed = weather_data.get('wind', {}).get('speed', 'N/A')

            # Get precipitation probabilities from forecast
            precip_probs = [h.get('precipitationProbability', 0) for h in hourly_forecast[:6]] if hourly_forecast else []
            max_precip = max(precip_probs) if precip_probs else 0

            system_message = f"""You are a weather alert system. Generate ONE brief, actionable weather tip.

Current conditions:
- Temperature: {temp}°C (feels like {feels_like}°C)
- Conditions: {conditions}
- Humidity: {humidity}%
- Wind: {wind_speed} km/h
- Max precipitation chance in next 6 hours: {max_precip}%

Generate a single, practical tip or alert about the weather. Focus on:
- What to wear or bring
- Activities to do or avoid
- Safety concerns if any
- Comfort tips

Keep it under 25 words. Be specific and actionable.
Example: "Bring an umbrella! Rain likely in the next few hours."
Example: "Perfect weather for outdoor activities. Don't forget sunscreen!"
"""

            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": "Generate a weather alert for today."}
                ],
                max_tokens=50,
                temperature=0.8
            )

            return response.choices[0].message.content

        except Exception as e:
            print(f"Error generating weather alert: {e}")
            return None
