'use client';

import { useEffect, useState } from 'react';
import { weatherService } from '@/services/weatherService';
import { WeatherIndex } from '@/types/weather';
import { WeatherCardSkeleton } from './LoadingSkeleton';
import { Activity, Wind, Droplets, Sun, Flower2, TreePine, Heart, PersonStanding } from 'lucide-react';

interface WeatherIndicesCardProps {
  city: string;
}

export default function WeatherIndicesCard({ city }: WeatherIndicesCardProps) {
  const [indices, setIndices] = useState<WeatherIndex[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const data = await weatherService.getWeatherIndices(city);

      if (data) {
        // Filter to show most relevant indices
        const relevantIndices = data.filter(index =>
          ['Air Quality', 'Pollen', 'UV Index', 'Outdoor Activity', 'Running', 'Hiking', 'Breathing', 'Comfort']
            .some(keyword => index.name.includes(keyword))
        ).slice(0, 8);
        setIndices(relevantIndices);
      } else {
        setError('Failed to load indices');
      }

      setLoading(false);
    };

    fetchData();
  }, [city]);

  const getIndexIcon = (name: string) => {
    if (name.includes('Air Quality') || name.includes('Breathing')) return <Wind className="w-5 h-5" strokeWidth={2} />;
    if (name.includes('Pollen')) return <Flower2 className="w-5 h-5" strokeWidth={2} />;
    if (name.includes('UV')) return <Sun className="w-5 h-5" strokeWidth={2} />;
    if (name.includes('Running')) return <PersonStanding className="w-5 h-5" strokeWidth={2} />;
    if (name.includes('Hiking')) return <TreePine className="w-5 h-5" strokeWidth={2} />;
    if (name.includes('Comfort')) return <Heart className="w-5 h-5" strokeWidth={2} />;
    return <Activity className="w-5 h-5" strokeWidth={2} />;
  };

  const getCategoryColor = (value: number) => {
    if (value >= 7) return 'from-green-500 to-green-600';
    if (value >= 5) return 'from-yellow-500 to-yellow-600';
    if (value >= 3) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const getCategoryTextColor = (value: number) => {
    if (value >= 7) return 'text-green-600';
    if (value >= 5) return 'text-yellow-600';
    if (value >= 3) return 'text-orange-600';
    return 'text-red-600';
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
            <Activity className="w-5 h-5 text-blue-500" strokeWidth={2} />
            <h3 className="text-xl font-bold text-gray-800">Weather Indices</h3>
            <span className="text-xs text-gray-500 ml-auto">Today</span>
          </div>

          {indices.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">No indices data available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {indices.map((index, idx) => (
                <div
                  key={index.id || idx}
                  className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:scale-[1.03] transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${getCategoryColor(index.categoryValue)} flex items-center justify-center text-white`}>
                      {getIndexIcon(index.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-800 mb-1 leading-tight">
                        {index.name}
                      </h4>
                      <div className={`text-xs font-semibold ${getCategoryTextColor(index.categoryValue)} mb-1`}>
                        {index.category}
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {index.text}
                      </p>
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
