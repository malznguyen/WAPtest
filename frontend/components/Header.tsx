'use client';

import { useState } from 'react';

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
    <header className="w-full bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-[1800px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo/Title */}
        <div className="flex items-center gap-2 min-w-[200px]">
          <span className="text-2xl">☀️</span>
          <h1 className="text-xl font-bold text-gray-800">Weather AI Forecast</h1>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for a city..."
              className="w-full px-6 py-3 rounded-full bg-gray-100 border-2 border-transparent focus:border-blue-400 focus:outline-none transition-all text-gray-800 placeholder-gray-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              Search
            </button>
          </div>
        </form>

        {/* Action Icons */}
        <div className="flex items-center gap-3 min-w-[100px] justify-end">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Notifications">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Settings">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
