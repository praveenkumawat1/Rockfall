import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Clock, Filter, Search, Download, Eye } from 'lucide-react';

interface Alert {
  id: string;
  type: 'critical' | 'high' | 'medium' | 'warning';
  title: string;
  description: string;
  location: string;
  timestamp: Date;
  status: 'active' | 'resolved' | 'investigating';
  riskProbability: number;
  eta?: string;
  assignedTo?: string;
}

const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Real-time alert generation
  useEffect(() => {
    const generateAlert = (): Alert => {
      const alertTypes = [
        {
          type: 'critical' as const,
          title: 'Critical Slope Instability',
          description: 'Severe slope movement detected with immediate collapse risk',
          riskProbability: 85 + Math.random() * 15,
          eta: '1-2 hours'
        },
        {
          type: 'high' as const,
          title: 'High Seismic Activity',
          description: 'Elevated seismic readings indicating potential rockfall',
          riskProbability: 70 + Math.random() * 15,
          eta: '2-4 hours'
        },
        {
          type: 'medium' as const,
          title: 'Weather Impact Warning',
          description: 'Heavy rainfall increasing slope instability risk',
          riskProbability: 50 + Math.random() * 20,
          eta: '6-12 hours'
        },
        {
          type: 'warning' as const,
          title: 'Sensor Anomaly Detected',
          description: 'Unusual readings from monitoring equipment',
          riskProbability: 30 + Math.random() * 20
        }
      ];

      const locations = [
        'Zone A-1, Sector 3', 'Zone B-2, Sector 5', 'Zone C-3, Sector 7',
        'Zone D-4, Sector 2', 'Zone E-5, Sector 6', 'Zone F-6, Sector 4'
      ];

      const statuses = ['active', 'investigating', 'resolved'] as const;
      const assignees = ['John Smith', 'Sarah Johnson', 'Mike Wilson', 'Lisa Chen'];

      const alertTemplate = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      
      return {
        id: Date.now().toString() + Math.random(),
        ...alertTemplate,
        location: locations[Math.floor(Math.random() * locations.length)],
        timestamp: new Date(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        assignedTo: assignees[Math.floor(Math.random() * assignees.length)]
      };
    };

    // Initialize with some alerts
    const initialAlerts = Array.from({ length: 8 }, generateAlert);
    setAlerts(initialAlerts);

    // Real-time alert updates
    const interval = setInterval(() => {
      if (Math.random() < 0.4) { // 40% chance of new alert
        const newAlert = generateAlert();
        setAlerts(prev => [newAlert, ...prev.slice(0, 19)]); // Keep last 20
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-500 bg-opacity-10';
      case 'high': return 'border-orange-500 bg-orange-500 bg-opacity-10';
      case 'medium': return 'border-yellow-500 bg-yellow-500 bg-opacity-10';
      case 'warning': return 'border-blue-500 bg-blue-500 bg-opacity-10';
      default: return 'border-gray-500 bg-gray-500 bg-opacity-10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-500 text-white';
      case 'investigating': return 'bg-yellow-500 text-black';
      case 'resolved': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === 'all' || alert.type === filter || alert.status === filter;
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const alertCounts = {
    critical: alerts.filter(a => a.type === 'critical').length,
    high: alerts.filter(a => a.type === 'high').length,
    medium: alerts.filter(a => a.type === 'medium').length,
    warning: alerts.filter(a => a.type === 'warning').length,
    active: alerts.filter(a => a.status === 'active').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Alert Management</h1>
          <p className="text-gray-400 mt-1">Real-time monitoring and alert management system</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-500">{alertCounts.critical}</div>
          <div className="text-sm text-gray-400">Critical</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-500">{alertCounts.high}</div>
          <div className="text-sm text-gray-400">High</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-500">{alertCounts.medium}</div>
          <div className="text-sm text-gray-400">Medium</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-500">{alertCounts.warning}</div>
          <div className="text-sm text-gray-400">Warning</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-500">{alertCounts.active}</div>
          <div className="text-sm text-gray-400">Active</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="all">All Alerts</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="warning">Warning</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 w-64"
            />
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className={`border-l-4 rounded-lg p-6 ${getAlertColor(alert.type)}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-semibold">{alert.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(alert.status)}`}>
                    {alert.status.toUpperCase()}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-3">{alert.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{alert.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{alert.timestamp.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Risk:</span>
                    <span className="text-red-400 font-medium">{Math.round(alert.riskProbability)}%</span>
                  </div>
                </div>
                
                {alert.eta && (
                  <div className="mt-2 text-sm">
                    <span className="text-gray-400">ETA: </span>
                    <span className="text-yellow-400">{alert.eta}</span>
                  </div>
                )}
                
                {alert.assignedTo && (
                  <div className="mt-2 text-sm">
                    <span className="text-gray-400">Assigned to: </span>
                    <span className="text-blue-400">{alert.assignedTo}</span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <AlertTriangle className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No alerts found</p>
          <p className="text-sm">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};

export default AlertsPage;