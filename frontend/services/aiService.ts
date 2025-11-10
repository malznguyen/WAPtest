const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const aiService = {
  async sendChatMessage(message: string, city: string = 'Hanoi'): Promise<string | null> {
    try {
      const response = await fetch(`${API_URL}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, city }),
      });

      const result = await response.json();

      if (result.success && result.message) {
        return result.message;
      }

      console.error('Failed to get chat response:', result.error);
      return null;
    } catch (error) {
      console.error('Error sending chat message:', error);
      return null;
    }
  },

  async getWeatherAlert(city: string = 'Hanoi'): Promise<string | null> {
    try {
      const response = await fetch(`${API_URL}/api/ai/alert?city=${encodeURIComponent(city)}`);
      const result = await response.json();

      if (result.success && result.alert) {
        return result.alert;
      }

      console.error('Failed to get weather alert:', result.error);
      return null;
    } catch (error) {
      console.error('Error fetching weather alert:', error);
      return null;
    }
  }
};
