export interface WeatherTheme {
  gradient: string;
  cardBg: string;
  accentColor: string;
  textColor: string;
}

export const getWeatherTheme = (weatherIcon: number, isDayTime: boolean): WeatherTheme => {
  // Night time themes (icons 33-44)
  if (!isDayTime || [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44].includes(weatherIcon)) {
    return {
      gradient: 'from-indigo-900 via-blue-900 to-slate-800',
      cardBg: 'bg-white/10 backdrop-blur-xl border-white/20',
      accentColor: 'text-indigo-300',
      textColor: 'text-white'
    };
  }

  // Sunny day (1-2)
  if ([1, 2].includes(weatherIcon)) {
    return {
      gradient: 'from-amber-100 via-orange-50 to-yellow-100',
      cardBg: 'bg-white/70 backdrop-blur-xl border-white/20',
      accentColor: 'text-amber-600',
      textColor: 'text-gray-800'
    };
  }

  // Partly sunny/cloudy (3-6)
  if ([3, 4, 5, 6].includes(weatherIcon)) {
    return {
      gradient: 'from-sky-100 via-blue-50 to-slate-100',
      cardBg: 'bg-white/70 backdrop-blur-xl border-white/20',
      accentColor: 'text-sky-600',
      textColor: 'text-gray-800'
    };
  }

  // Rainy (12-14, 18, 26, 27, 39, 40)
  if ([12, 13, 14, 18, 26, 27, 39, 40].includes(weatherIcon)) {
    return {
      gradient: 'from-slate-300 via-slate-200 to-blue-200',
      cardBg: 'bg-white/60 backdrop-blur-xl border-white/10',
      accentColor: 'text-slate-600',
      textColor: 'text-gray-800'
    };
  }

  // Thunderstorms (15-17, 41, 42)
  if ([15, 16, 17, 41, 42].includes(weatherIcon)) {
    return {
      gradient: 'from-slate-400 via-gray-300 to-slate-300',
      cardBg: 'bg-white/50 backdrop-blur-xl border-white/10',
      accentColor: 'text-purple-600',
      textColor: 'text-gray-800'
    };
  }

  // Snow (19-25, 29, 43, 44)
  if ([19, 20, 21, 22, 23, 24, 25, 29, 43, 44].includes(weatherIcon)) {
    return {
      gradient: 'from-cyan-100 via-blue-50 to-slate-100',
      cardBg: 'bg-white/80 backdrop-blur-xl border-white/30',
      accentColor: 'text-cyan-600',
      textColor: 'text-gray-800'
    };
  }

  // Hot (30)
  if (weatherIcon === 30) {
    return {
      gradient: 'from-orange-200 via-red-100 to-yellow-100',
      cardBg: 'bg-white/60 backdrop-blur-xl border-white/20',
      accentColor: 'text-orange-600',
      textColor: 'text-gray-800'
    };
  }

  // Cold (31)
  if (weatherIcon === 31) {
    return {
      gradient: 'from-blue-200 via-cyan-100 to-slate-200',
      cardBg: 'bg-white/70 backdrop-blur-xl border-white/20',
      accentColor: 'text-blue-600',
      textColor: 'text-gray-800'
    };
  }

  // Cloudy/Foggy (7, 8, 11)
  if ([7, 8, 11].includes(weatherIcon)) {
    return {
      gradient: 'from-gray-200 via-slate-100 to-gray-200',
      cardBg: 'bg-white/70 backdrop-blur-xl border-white/20',
      accentColor: 'text-gray-600',
      textColor: 'text-gray-800'
    };
  }

  // Windy (32)
  if (weatherIcon === 32) {
    return {
      gradient: 'from-teal-100 via-cyan-50 to-sky-100',
      cardBg: 'bg-white/70 backdrop-blur-xl border-white/20',
      accentColor: 'text-teal-600',
      textColor: 'text-gray-800'
    };
  }

  // Default - Blue theme
  return {
    gradient: 'from-blue-100 via-blue-50 to-blue-100',
    cardBg: 'bg-white/70 backdrop-blur-xl border-white/20',
    accentColor: 'text-blue-600',
    textColor: 'text-gray-800'
  };
};

// Utility to determine if it's day time based on weather icon
export const isDayTimeFromIcon = (iconCode: number): boolean => {
  // Night icons are 33-44
  return iconCode < 33;
};
