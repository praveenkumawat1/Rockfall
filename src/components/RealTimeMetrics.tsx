import React, { useState, useEffect } from 'react';
import { Activity, Zap, Thermometer, Droplets, Wind, Eye } from 'lucide-react';
import type { SensorData } from '../types';

interface RealTimeMetricsProps {
  sensorData: SensorData[];
}

const RealTimeMetrics: React.FC<RealTimeMetricsProps> = ({ sensorData }) => {
  const [networkLatency, setNetworkLatency] = useState(0);
  const [dataProcessingRate, setDataProcessingRate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkLatency(Math.random() * 50 + 10); // 10-60ms
      setDataProcessingRate(Math.random() * 1000 + 2000); // 2000-3000 records/sec
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getLatestValue = (field: keyof SensorData) => {
    if (sensorData.length === 0) return 0;
    return sensorData[sensorData.length - 1][field];
  };

  const metrics = [
    {
      label: 'Temperature',
      value: getLatestValue('temperature'),
      unit: '°C',
      icon: Thermometer,
      color: 'text-red-400',
      trend: Math.random() > 0.5 ? 'up' : 'down'
    },
    {
      label: 'Vibration',
      value: getLatestValue('vibrationLevel'),
      unit: 'Hz',
      icon: Activity,
      color: 'text-blue-400',
      trend: Math.random() > 0.5 ? 'up' : 'down'
    },
    {
      label: 'Moisture',
      value: getLatestValue('moistureLevel'),
      unit: '%',
      icon: Droplets,
      color: 'text-cyan-400',
      trend: Math.random() > 0.5 ? 'up' : 'down'
    },
    {
      label: 'Seismic',
      value: getLatestValue('seismicActivity'),
      unit: 'mag',
      icon: Zap,
      color: 'text-yellow-400',
      trend: Math.random() > 0.5 ? 'up' : 'down'
    },
    {
      label: 'Network',
      value: networkLatency,
      unit: 'ms',
      icon: Wind,
      color: 'text-green-400',
      trend: 'stable'
    },
    {
      label: 'Processing',
      value: dataProcessingRate,
      unit: '/sec',
      icon: Eye,
      color: 'text-purple-400',
      trend: 'up'
    }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Real-Time System Metrics</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-400">Live Data Stream</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-gray-700 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${metric.color}`} />
                <div className={`text-xs ${
                  metric.trend === 'up' ? 'text-green-400' : 
                  metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
                </div>
              </div>
              <div className={`text-lg font-bold ${metric.color}`}>
                {typeof metric.value === 'number' ? metric.value.toFixed(1) : metric.value}
                <span className="text-xs text-gray-400 ml-1">{metric.unit}</span>
              </div>
              <div className="text-xs text-gray-400">{metric.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RealTimeMetrics;