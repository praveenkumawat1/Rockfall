import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, AlertTriangle, Eye, Zap, Thermometer, Mountain } from 'lucide-react';

interface AnalyticsData {
  totalAlerts: number;
  criticalAlerts: number;
  avgRiskLevel: number;
  motionEvents: number;
  sensorHealth: number;
  predictionAccuracy: number;
}

interface ChartData {
  time: string;
  risk: number;
  motion: number;
  vibration: number;
  temperature: number;
}

export const AnalyticsPage: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalAlerts: 0,
    criticalAlerts: 0,
    avgRiskLevel: 0,
    motionEvents: 0,
    sensorHealth: 0,
    predictionAccuracy: 0
  });

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [timeRange, setTimeRange] = useState('24h');

  useEffect(() => {
    const updateAnalytics = () => {
      // Simulate real-time analytics data
      setAnalyticsData({
        totalAlerts: Math.floor(Math.random() * 50) + 120,
        criticalAlerts: Math.floor(Math.random() * 10) + 5,
        avgRiskLevel: Math.floor(Math.random() * 30) + 45,
        motionEvents: Math.floor(Math.random() * 100) + 200,
        sensorHealth: Math.floor(Math.random() * 15) + 85,
        predictionAccuracy: Math.floor(Math.random() * 10) + 88
      });

      // Generate chart data
      const newData: ChartData[] = [];
      for (let i = 23; i >= 0; i--) {
        const time = new Date(Date.now() - i * 60 * 60 * 1000);
        newData.push({
          time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          risk: Math.floor(Math.random() * 40) + 30,
          motion: Math.floor(Math.random() * 60) + 20,
          vibration: Math.floor(Math.random() * 50) + 25,
          temperature: Math.floor(Math.random() * 15) + 20
        });
      }
      setChartData(newData);
    };

    updateAnalytics();
    const interval = setInterval(updateAnalytics, 3000);
    return () => clearInterval(interval);
  }, []);

  const getChangeIndicator = (value: number, threshold: number) => {
    if (value > threshold) {
      return <TrendingUp className="w-4 h-4 text-red-400" />;
    }
    return <TrendingDown className="w-4 h-4 text-green-400" />;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-gray-400">Real-time system performance and insights</p>
        </div>
        <div className="flex gap-2">
          {['1h', '6h', '24h', '7d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded text-sm ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Alerts</p>
              <p className="text-2xl font-bold text-white">{analyticsData.totalAlerts}</p>
            </div>
            <div className="flex items-center gap-1">
              {getChangeIndicator(analyticsData.totalAlerts, 130)}
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Critical Alerts</p>
              <p className="text-2xl font-bold text-red-400">{analyticsData.criticalAlerts}</p>
            </div>
            <div className="flex items-center gap-1">
              {getChangeIndicator(analyticsData.criticalAlerts, 8)}
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg Risk Level</p>
              <p className="text-2xl font-bold text-orange-400">{analyticsData.avgRiskLevel}%</p>
            </div>
            <div className="flex items-center gap-1">
              {getChangeIndicator(analyticsData.avgRiskLevel, 50)}
              <Activity className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Motion Events</p>
              <p className="text-2xl font-bold text-blue-400">{analyticsData.motionEvents}</p>
            </div>
            <div className="flex items-center gap-1">
              {getChangeIndicator(analyticsData.motionEvents, 250)}
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Sensor Health</p>
              <p className="text-2xl font-bold text-green-400">{analyticsData.sensorHealth}%</p>
            </div>
            <div className="flex items-center gap-1">
              {getChangeIndicator(analyticsData.sensorHealth, 90)}
              <Zap className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Prediction Accuracy</p>
              <p className="text-2xl font-bold text-purple-400">{analyticsData.predictionAccuracy}%</p>
            </div>
            <div className="flex items-center gap-1">
              {getChangeIndicator(analyticsData.predictionAccuracy, 90)}
              <Mountain className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Trend Chart */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Risk Level Trend</h3>
          <div className="h-64 flex items-end justify-between gap-1">
            {chartData.slice(-12).map((data, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <div
                  className={`w-6 rounded-t ${
                    data.risk > 70 ? 'bg-red-500' : data.risk > 40 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ height: `${(data.risk / 100) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-400 transform -rotate-45 origin-center">
                  {data.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Motion Detection Chart */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Motion Detection Events</h3>
          <div className="h-64 flex items-end justify-between gap-1">
            {chartData.slice(-12).map((data, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <div
                  className="w-6 bg-blue-500 rounded-t"
                  style={{ height: `${(data.motion / 100) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-400 transform -rotate-45 origin-center">
                  {data.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sensor Performance */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Sensor Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Vibration Sensors</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
                <span className="text-green-400 text-sm">95%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Temperature Sensors</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
                <span className="text-yellow-400 text-sm">87%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Motion Cameras</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <span className="text-green-400 text-sm">92%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Distribution */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Alert Distribution</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">Critical</span>
              </div>
              <span className="text-white font-semibold">{analyticsData.criticalAlerts}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-300">Medium</span>
              </div>
              <span className="text-white font-semibold">{Math.floor(analyticsData.totalAlerts * 0.4)}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Low</span>
              </div>
              <span className="text-white font-semibold">{Math.floor(analyticsData.totalAlerts * 0.5)}</span>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Edge AI Processing</span>
              <span className="px-2 py-1 bg-green-600 text-green-100 rounded text-xs">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">ML Model Status</span>
              <span className="px-2 py-1 bg-green-600 text-green-100 rounded text-xs">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Data Pipeline</span>
              <span className="px-2 py-1 bg-green-600 text-green-100 rounded text-xs">Running</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Alert System</span>
              <span className="px-2 py-1 bg-green-600 text-green-100 rounded text-xs">Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};