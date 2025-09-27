import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, MapPin, Zap } from 'lucide-react';

interface ActiveAlertsProps {
  riskLevel: number;
}

const ActiveAlerts: React.FC<ActiveAlertsProps> = ({ riskLevel }) => {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const generateAlert = () => {
      const alertTypes = [
        {
          type: 'critical',
          title: 'Critical Slope Movement',
          description: 'Immediate evacuation required',
          location: 'Zone D-4, Sector 7',
          probability: 85 + Math.random() * 15
        },
        {
          type: 'high',
          title: 'High Seismic Activity',
          description: 'Elevated readings detected',
          location: 'Zone C-3, Sector 5',
          probability: 70 + Math.random() * 15
        },
        {
          type: 'medium',
          title: 'Weather Impact Warning',
          description: 'Heavy rainfall increasing risk',
          location: 'Zone B-2, Sector 3',
          probability: 50 + Math.random() * 20
        }
      ];

      const alert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      return {
        id: Date.now().toString(),
        ...alert,
        timestamp: new Date(),
        eta: '2-4 hours'
      };
    };

    // Initialize with some alerts
    const initialAlerts = Array.from({ length: 3 }, generateAlert);
    setAlerts(initialAlerts);

    // Real-time alert updates
    const interval = setInterval(() => {
      if (riskLevel > 60 && Math.random() < 0.4) {
        const newAlert = generateAlert();
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [riskLevel]);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-500 bg-opacity-10';
      case 'high': return 'border-orange-500 bg-orange-500 bg-opacity-10';
      case 'medium': return 'border-yellow-500 bg-yellow-500 bg-opacity-10';
      default: return 'border-gray-500 bg-gray-500 bg-opacity-10';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Active Alerts</h3>
        <div className="flex space-x-2">
          <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            High ({alerts.filter(a => a.type === 'critical' || a.type === 'high').length})
          </span>
          <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium">
            Medium ({alerts.filter(a => a.type === 'medium').length})
          </span>
          <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
            Info ({alerts.filter(a => a.type === 'info').length})
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <AlertTriangle className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No active alerts</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className={`border-l-4 rounded-lg p-4 ${getAlertColor(alert.type)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className={`w-4 h-4 ${getAlertIcon(alert.type)}`} />
                    <h4 className="font-medium text-sm">{alert.title}</h4>
                  </div>
                  <p className="text-xs text-gray-300 mb-2">{alert.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>ETA: {alert.eta}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${getAlertIcon(alert.type)}`}>
                    {Math.round(alert.probability)}%
                  </div>
                  <div className="text-xs text-gray-400">Risk</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {riskLevel > 70 && (
        <div className="mt-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
          <div className="flex items-center space-x-2 text-red-400 text-sm">
            <Zap className="w-4 h-4" />
            <span className="font-medium">Emergency Protocol Active</span>
          </div>
          <p className="text-xs text-red-300 mt-1">
            Critical risk level detected. Immediate action required.
          </p>
        </div>
      )}
    </div>
  );
};

export default ActiveAlerts;