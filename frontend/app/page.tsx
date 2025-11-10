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
import WeatherAlertsCard from '@/components/WeatherAlertsCard';
import WeatherIndicesCard from '@/components/WeatherIndicesCard';
import ExtendedForecastCard from '@/components/ExtendedForecastCard';
import HistoricalWeatherCard from '@/components/HistoricalWeatherCard';

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
      <main className="max-w-[1800px] mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Weather Cards (70%) */}
          <div className="w-full lg:w-[70%] space-y-6">
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
              {/* Row 1 - Current Weather and Small Cards */}
              <div className="md:col-span-12 lg:col-span-8">
                <CurrentWeatherCard city={city} />
              </div>
              <div className="md:col-span-12 lg:col-span-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
                <FeelsLikeCard city={city} />
                <WindCard city={city} />
              </div>

              {/* Row 2 - AI Alert */}
              <div className="md:col-span-12">
                <AIAlertCard city={city} />
              </div>

              {/* Row 3 - Hourly Forecast */}
              <div className="md:col-span-12">
                <HourlyForecastCard city={city} />
              </div>

              {/* Row 4 - Daily Forecast */}
              <div className="md:col-span-12">
                <DailyForecastCard city={city} />
              </div>

              {/* Row 5 - Weather Alerts */}
              <div className="md:col-span-12">
                <WeatherAlertsCard city={city} />
              </div>

              {/* Row 6 - Weather Indices & Historical */}
              <div className="md:col-span-12 lg:col-span-6">
                <WeatherIndicesCard city={city} />
              </div>
              <div className="md:col-span-12 lg:col-span-6">
                <HistoricalWeatherCard city={city} />
              </div>

              {/* Row 7 - Extended Forecast */}
              <div className="md:col-span-12">
                <ExtendedForecastCard city={city} />
              </div>
            </div>
          </div>

          {/* Right Column - Chat Panel (30%) */}
          <div className="w-full lg:w-[30%] lg:sticky lg:top-24 min-h-[600px] max-h-[800px] lg:h-[calc(100vh-120px)]">
            <ChatPanel city={city} />
          </div>
        </div>
      </main>
    </div>
  );
}
