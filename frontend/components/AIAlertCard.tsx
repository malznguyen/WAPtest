'use client';

import { useEffect, useState } from 'react';
import { aiService } from '@/services/aiService';
import { AIAlertSkeleton } from './LoadingSkeleton';
import { Sparkles } from 'lucide-react';

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
    <>
      {loading ? (
        <AIAlertSkeleton />
      ) : error ? (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-6 shadow-xl border border-blue-400/30">
          <div className="text-white/80 text-sm">{error}</div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-3xl p-6 shadow-xl border border-blue-400/30 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 card-hover fade-in animate-pulse-subtle">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex-shrink-0 p-3 bg-white/20 backdrop-blur-sm rounded-xl float-slow">
              <Sparkles className="w-8 h-8 text-white" strokeWidth={2} />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-sm text-blue-100 font-bold tracking-wider">AI WEATHER INSIGHT</div>
                <div className="px-2 py-0.5 bg-white/20 rounded-full text-xs text-white font-semibold">
                  Powered by AI
                </div>
              </div>

              <p className="text-white text-base leading-relaxed font-medium">{alert}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
