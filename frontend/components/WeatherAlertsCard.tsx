'use client';

import { useEffect, useState } from 'react';
import { weatherService } from '@/services/weatherService';
import { WeatherAlert } from '@/types/weather';
import { WeatherCardSkeleton } from './LoadingSkeleton';
import { AlertTriangle, ShieldAlert, Info } from 'lucide-react';

interface WeatherAlertsCardProps {
  city: string;
}

export default function WeatherAlertsCard({ city }: WeatherAlertsCardProps) {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const data = await weatherService.getWeatherAlerts(city);

      if (data) {
        setAlerts(data);
      } else {
        setError('Failed to load alerts');
      }

      setLoading(false);
    };

    fetchData();
  }, [city]);

  const getSeverityColor = (severity: number) => {
    if (severity >= 8) return 'from-red-500 to-red-600';
    if (severity >= 5) return 'from-orange-500 to-orange-600';
    return 'from-yellow-500 to-yellow-600';
  };

  const getSeverityIcon = (severity: number) => {
    if (severity >= 8) return <ShieldAlert className="w-5 h-5 text-red-500" strokeWidth={2} />;
    if (severity >= 5) return <AlertTriangle className="w-5 h-5 text-orange-500" strokeWidth={2} />;
    return <Info className="w-5 h-5 text-yellow-500" strokeWidth={2} />;
  };

  return (
    <>
      {loading ? (
        <WeatherCardSkeleton />
      ) : error ? (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="text-red-500 text-sm">{error}</div>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 card-hover fade-in h-full">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-red-500" strokeWidth={2} />
            <h3 className="text-xl font-bold text-gray-800">Weather Alerts</h3>
          </div>

          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <ShieldAlert className="w-8 h-8 text-green-500" strokeWidth={2} />
              </div>
              <p className="text-lg font-semibold text-gray-700 mb-1">All Clear!</p>
              <p className="text-sm text-gray-500">No active weather alerts for {city}</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-hide">
              {alerts.map((alert, index) => (
                <div
                  key={alert.alertId || index}
                  className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:scale-[1.02] transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getSeverityIcon(alert.severity)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getSeverityColor(alert.severity)}`}>
                          {alert.category}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          {alert.type}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-gray-800 mb-2 leading-tight">
                        {alert.headline}
                      </h4>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <span>Source: {alert.source}</span>
                        {alert.startTime && (
                          <span>• Priority: {alert.priority}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
