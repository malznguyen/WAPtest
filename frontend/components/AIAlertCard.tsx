'use client';

import { useEffect, useState } from 'react';
import { aiService } from '@/services/aiService';

interface AIAlertCardProps {
  city: string;
}

export default function AIAlertCard({ city }: AIAlertCardProps) {
  const [alert, setAlert] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlert = async () => {
      setLoading(true);
      setError(null);

      const alertText = await aiService.getWeatherAlert(city);

      if (alertText) {
        setAlert(alertText);
      } else {
        setError('Failed to load alert');
      }

      setLoading(false);
    };

    fetchAlert();

    // Refresh alert every 30 minutes
    const interval = setInterval(fetchAlert, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [city]);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="text-4xl flex-shrink-0">🤖</div>

        {/* Content */}
        <div className="flex-1">
          <div className="text-sm text-blue-100 font-medium mb-2">AI WEATHER INSIGHT</div>

          {loading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span className="text-white/80 text-sm">Analyzing weather...</span>
            </div>
          ) : error ? (
            <div className="text-white/80 text-sm">{error}</div>
          ) : (
            <p className="text-white text-base leading-relaxed">{alert}</p>
          )}
        </div>
      </div>
    </div>
  );
}
