import React from 'react';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
  Wind,
  Snowflake,
  Droplets,
  Moon,
  CloudMoon,
  Thermometer,
  ThermometerSnowflake
} from 'lucide-react';

// Map AccuWeather icon codes to Lucide React components
export const getWeatherIcon = (iconCode: number, size: number = 64): React.ReactElement => {
  const iconMap: { [key: number]: React.ReactElement } = {
    1: <Sun className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Sunny
    2: <Sun className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Mostly Sunny
    3: <Cloud className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Partly Sunny
    4: <Cloud className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Intermittent Clouds
    5: <Cloud className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Hazy Sunshine
    6: <Cloud className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Mostly Cloudy
    7: <Cloud className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Cloudy
    8: <Cloud className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Dreary (Overcast)
    11: <CloudFog className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Fog
    12: <CloudRain className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Showers
    13: <CloudDrizzle className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Mostly Cloudy w/ Showers
    14: <CloudDrizzle className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Partly Sunny w/ Showers
    15: <CloudLightning className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // T-Storms
    16: <CloudLightning className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Mostly Cloudy w/ T-Storms
    17: <CloudLightning className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Partly Sunny w/ T-Storms
    18: <CloudRain className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Rain
    19: <CloudSnow className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Flurries
    20: <CloudSnow className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Mostly Cloudy w/ Flurries
    21: <CloudSnow className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Partly Sunny w/ Flurries
    22: <Snowflake className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Snow
    23: <CloudSnow className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Mostly Cloudy w/ Snow
    24: <Snowflake className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Ice
    25: <CloudSnow className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Sleet
    26: <Droplets className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Freezing Rain
    29: <CloudSnow className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Rain and Snow
    30: <Thermometer className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Hot
    31: <ThermometerSnowflake className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Cold
    32: <Wind className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Windy
    33: <Moon className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Clear (Night)
    34: <Moon className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Mostly Clear (Night)
    35: <CloudMoon className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Partly Cloudy (Night)
    36: <CloudMoon className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Intermittent Clouds (Night)
    37: <CloudMoon className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Hazy Moonlight
    38: <Cloud className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Mostly Cloudy (Night)
    39: <CloudRain className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Partly Cloudy w/ Showers (Night)
    40: <CloudRain className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Mostly Cloudy w/ Showers (Night)
    41: <CloudLightning className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Partly Cloudy w/ T-Storms (Night)
    42: <CloudLightning className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Mostly Cloudy w/ T-Storms (Night)
    43: <CloudSnow className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Mostly Cloudy w/ Flurries (Night)
    44: <CloudSnow className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />, // Mostly Cloudy w/ Snow (Night)
  };

  return iconMap[iconCode] || <Sun className={`w-${size} h-${size}`} style={{ width: size, height: size }} strokeWidth={1.5} />;
};

// Keep emoji version for backward compatibility
export const getWeatherEmoji = (iconCode: number): string => {
  const iconMap: { [key: number]: string } = {
    1: '☀️',   // Sunny
    2: '🌤️',  // Mostly Sunny
    3: '⛅',   // Partly Sunny
    4: '🌥️',  // Intermittent Clouds
    5: '🌥️',  // Hazy Sunshine
    6: '🌤️',  // Mostly Cloudy
    7: '☁️',   // Cloudy
    8: '☁️',   // Dreary (Overcast)
    11: '🌫️', // Fog
    12: '🌧️', // Showers
    13: '🌦️', // Mostly Cloudy w/ Showers
    14: '🌦️', // Partly Sunny w/ Showers
    15: '⛈️',  // T-Storms
    16: '🌩️', // Mostly Cloudy w/ T-Storms
    17: '⛈️',  // Partly Sunny w/ T-Storms
    18: '🌧️', // Rain
    19: '🌨️', // Flurries
    20: '🌨️', // Mostly Cloudy w/ Flurries
    21: '🌨️', // Partly Sunny w/ Flurries
    22: '❄️',  // Snow
    23: '🌨️', // Mostly Cloudy w/ Snow
    24: '🌨️', // Ice
    25: '🌨️', // Sleet
    26: '🌧️', // Freezing Rain
    29: '🌧️', // Rain and Snow
    30: '🔥',  // Hot
    31: '🥶',  // Cold
    32: '💨',  // Windy
    33: '🌙',  // Clear (Night)
    34: '🌙',  // Mostly Clear (Night)
    35: '☁️',  // Partly Cloudy (Night)
    36: '☁️',  // Intermittent Clouds (Night)
    37: '🌥️',  // Hazy Moonlight
    38: '☁️',  // Mostly Cloudy (Night)
    39: '🌧️', // Partly Cloudy w/ Showers (Night)
    40: '🌧️', // Mostly Cloudy w/ Showers (Night)
    41: '⛈️',  // Partly Cloudy w/ T-Storms (Night)
    42: '⛈️',  // Mostly Cloudy w/ T-Storms (Night)
    43: '🌨️', // Mostly Cloudy w/ Flurries (Night)
    44: '🌨️', // Mostly Cloudy w/ Snow (Night)
  };

  return iconMap[iconCode] || '🌤️';
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};
