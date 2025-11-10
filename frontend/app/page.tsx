'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import CurrentWeatherCard from '@/components/CurrentWeatherCard';
import FeelsLikeCard from '@/components/FeelsLikeCard';
import WindCard from '@/components/WindCard';
import HourlyForecastCard from '@/components/HourlyForecastCard';
import DailyForecastCard from '@/components/DailyForecastCard';
import AIAlertCard from '@/components/AIAlertCard';
import ChatPanel from '@/components/ChatPanel';

export default function Home() {
  const [city, setCity] = useState('Hanoi');

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-blue-100">
      {/* Header */}
      <Header onCityChange={handleCityChange} />

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Left Column - Weather Cards (70%) */}
          <div className="flex-[7] space-y-6">
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-12 gap-6">
              {/* Row 1 - Current Weather and Small Cards */}
              <div className="col-span-8">
                <CurrentWeatherCard city={city} />
              </div>
              <div className="col-span-4 space-y-6">
                <FeelsLikeCard city={city} />
                <div className="aspect-[4/3]">
                  <WindCard city={city} />
                </div>
              </div>

              {/* Row 2 - AI Alert */}
              <div className="col-span-12">
                <AIAlertCard city={city} />
              </div>

              {/* Row 3 - Hourly Forecast */}
              <div className="col-span-12">
                <HourlyForecastCard city={city} />
              </div>

              {/* Row 4 - Daily Forecast */}
              <div className="col-span-12">
                <DailyForecastCard city={city} />
              </div>
            </div>
          </div>

          {/* Right Column - Chat Panel (30%) */}
          <div className="flex-[3] sticky top-24 h-[calc(100vh-120px)]">
            <ChatPanel city={city} />
          </div>
        </div>
      </main>
    </div>
  );
}
