'use client';

import { useState } from 'react';
import { Search, Bell, Settings } from 'lucide-react';

interface HeaderProps {
  onCityChange: (city: string) => void;
}

export default function Header({ onCityChange }: HeaderProps) {
  const [searchValue, setSearchValue] = useState('Hanoi');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onCityChange(searchValue.trim());
    }
  };

  return (
    <header className="w-full bg-white/90 backdrop-blur-xl shadow-md sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-[1800px] mx-auto px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo/Title */}
        <div className="flex items-center gap-2 min-w-[180px] lg:min-w-[200px]">
          <div className="p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-md">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v6M12 17v6M23 12h-6M7 12H1M19.07 4.93l-4.24 4.24M9.17 14.83l-4.24 4.24M19.07 19.07l-4.24-4.24M9.17 9.17L4.93 4.93" />
            </svg>
          </div>
          <h1 className="text-lg lg:text-xl font-bold text-gray-800 hidden sm:block">Weather AI Forecast</h1>
          <h1 className="text-lg font-bold text-gray-800 sm:hidden">Weather AI</h1>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" strokeWidth={2} />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for a city..."
              aria-label="Search for a city"
              className="w-full pl-12 pr-24 py-3 rounded-full bg-gray-50 border-2 border-transparent focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-gray-800 placeholder-gray-400 shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all text-sm font-semibold shadow-md hover:shadow-lg active:scale-95"
            >
              Search
            </button>
          </div>
        </form>

        {/* Action Icons */}
        <div className="hidden md:flex items-center gap-2">
          <button
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            aria-label="View notifications"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600" strokeWidth={2} />
          </button>
          <button
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            aria-label="Open settings"
            title="Settings"
          >
            <Settings className="w-5 h-5 text-gray-600" strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}
