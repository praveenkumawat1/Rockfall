import React from 'react';
import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Wind, Droplets, Eye, BarChart3 } from 'lucide-react';

const WeatherForecast: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 22 + Math.sin(Date.now() / 100000) * 3, // Simulate temperature changes
    condition: 'Cloudy, Rain Expected',
    windSpeed: 15 + Math.random() * 5,
    humidity: 75 + Math.random() * 10,
    visibility: '8km',
    pressure: '1013 hPa'
  });

  const [weatherAlerts, setWeatherAlerts] = useState([
    { type: 'warning', message: 'Heavy rainfall expected in 2 hours', active: true },
    { type: 'info', message: 'Wind speed increasing to 25 km/h', active: false }
  ]);

  // Real-time weather updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWeather(prev => ({
        ...prev,
        temperature: 22 + Math.sin(Date.now() / 100000) * 3 + (Math.random() - 0.5) * 2,
        windSpeed: 15 + Math.random() * 10,
        humidity: 75 + Math.random() * 15,
        pressure: (1013 + Math.random() * 20 - 10).toFixed(0) + ' hPa'
      }));

      // Update weather alerts
      setWeatherAlerts(prev => prev.map(alert => ({
        ...alert,
        active: Math.random() > 0.7
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const hourlyForecast = [
    { time: 'Now', temp: 22, rain: '50-60%', icon: CloudRain },
    { time: '2h', temp: 20, rain: '60-70%', icon: CloudRain },
    { time: '4h', temp: 18, rain: '75-85%', icon: CloudRain },
    { time: '6h', temp: 17, rain: '30-45%', icon: Cloud },
    { time: '8h', temp: 16, rain: '30-37%', icon: Cloud }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Weather Forecast</h3>
      
      {/* Current Weather */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <CloudRain className="w-12 h-12 text-blue-400" />
            <div>
              <div className="text-3xl font-bold">{currentWeather.temperature.toFixed(1)}°C</div>
              <div className="text-sm text-gray-400">{currentWeather.condition}</div>
            </div>
          </div>
          
          <div className="text-right space-y-1">
            <div className="flex items-center space-x-2 text-sm">
              <Wind className="w-4 h-4" />
              <span>{currentWeather.windSpeed.toFixed(1)} km/h</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Droplets className="w-4 h-4" />
              <span>{currentWeather.humidity.toFixed(1)}% Humidity</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Eye className="w-4 h-4" />
              <span>{currentWeather.visibility} Visibility</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <BarChart3 className="w-4 h-4" />
              <span>{currentWeather.pressure}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6-Hour Forecast */}
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">6-Hour Forecast</h4>
        <div className="space-y-2">
          {hourlyForecast.map((forecast, index) => {
            const Icon = forecast.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium w-8">{forecast.time}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="font-medium w-8 text-right">{forecast.temp}°C</span>
                  <span className="text-blue-400 w-16 text-right">{forecast.rain} rain</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weather Impact Warning */}
      <div className="mt-4 space-y-2">
        {weatherAlerts.filter(alert => alert.active).map((alert, index) => (
          <div key={index} className={`p-3 rounded-lg ${
            alert.type === 'warning' ? 'bg-yellow-500 bg-opacity-20 border border-yellow-500' :
            'bg-blue-500 bg-opacity-20 border border-blue-500'
          }`}>
            <div className={`flex items-center space-x-2 text-sm ${
              alert.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'
            }`}>
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">
                {alert.type === 'warning' ? 'Weather Impact Alert' : 'Weather Update'}
              </span>
            </div>
            <p className={`text-xs mt-1 ${
              alert.type === 'warning' ? 'text-yellow-300' : 'text-blue-300'
            }`}>
              {alert.message}
            </p>
          </div>
        ))}
        
        {/* Live Weather Station Data */}
        <div className="p-3 bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-2 text-green-400 text-sm mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Live Weather Station</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">UV Index:</span>
              <span className="text-white">{(Math.random() * 8 + 2).toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Air Quality:</span>
              <span className="text-green-400">Good</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Dew Point:</span>
              <span className="text-white">{(currentWeather.temperature - 5).toFixed(1)}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Cloud Cover:</span>
              <span className="text-white">{Math.floor(Math.random() * 40 + 60)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AlertTriangle = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

export default WeatherForecast;