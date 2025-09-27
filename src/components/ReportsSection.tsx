import React from 'react';
import { FileText, Download, Calendar, Users, BarChart, CloudRain, FileSpreadsheet } from 'lucide-react';

const ReportsSection: React.FC = () => {
  const reports = [
    {
      title: 'Risk Assessment Report',
      description: 'Comprehensive geological risk analysis with sensor locations',
      lastUpdated: '3 min ago',
      type: 'high',
      icon: BarChart
    },
    {
      title: 'Asset Tracking Report',
      description: 'Detailed measurements from all active monitoring sensors',
      lastUpdated: 'Real-time',
      type: 'normal',
      icon: Users
    },
    {
      title: 'Weather & Environmental Report',
      description: 'Local weather conditions and environmental impact analysis',
      lastUpdated: '2 min ago',
      type: 'normal',
      icon: CloudRain
    }
  ];

  const metrics = [
    { label: 'Active Sensors', value: '24/24', status: 'Active' },
    { label: 'Critical Alerts', value: '2', status: 'Active' },
    { label: 'Environmental Factors', value: 'Normal', status: 'Normal' },
    { label: 'Risk Level', value: 'High', status: 'Alert' }
  ];

  const recentActivity = [
    { action: 'Last Report Generated:', time: '2 hours ago' },
    { action: 'Data Export Completed:', time: '18:21' },
    { action: 'Report Size (Ongoing):', time: '2.4 MB' }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Report Preview</h3>
        <div className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">
          HIGH RISK
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-gray-700 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-sm mb-2">Executive Summary</h4>
        <p className="text-xs text-gray-300 leading-relaxed">
          Current geological conditions show high-risk levels across multiple monitoring zones.
          Comprehensive analysis of sensor data and environmental factors included.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="mb-6">
        <h4 className="font-medium text-sm text-gray-300 mb-3">Key Metrics</h4>
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, index) => (
            <div key={index} className="flex justify-between text-xs">
              <span className="text-gray-400">{metric.label}</span>
              <span className={
                metric.status === 'Alert' ? 'text-red-400 font-medium' :
                metric.status === 'Active' ? 'text-green-400' : 'text-white'
              }>
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-6">
        <h4 className="font-medium text-sm text-gray-300 mb-3">Recent Activity</h4>
        <div className="space-y-2">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex justify-between text-xs">
              <span className="text-gray-400">{activity.action}</span>
              <span className="text-white">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Export Section */}
      <div className="border-t border-gray-600 pt-4">
        <h4 className="font-medium text-sm text-gray-300 mb-3">Export</h4>
        
        <div className="space-y-3">
          {reports.map((report, index) => {
            const Icon = report.icon;
            return (
              <div key={index} className="bg-gray-700 rounded-lg p-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Icon className="w-4 h-4 text-blue-400 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-medium">{report.title}</h5>
                      <p className="text-xs text-gray-400 mt-1">{report.description}</p>
                      <div className="text-xs text-gray-500 mt-1">Updated {report.lastUpdated}</div>
                    </div>
                  </div>
                  <button className="p-1 text-gray-400 hover:text-white">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 space-y-2">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
            Generate PDF Report
          </button>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 transition-colors">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Excel Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;