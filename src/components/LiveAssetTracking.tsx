import React, { useState, useEffect } from 'react';
import { Users, Truck, Wrench, AlertTriangle } from 'lucide-react';

const LiveAssetTracking: React.FC = () => {
  const [assets, setAssets] = useState([
    {
      id: '1',
      name: 'John Smith',
      type: 'worker',
      location: 'Zone D-4, Sector 7',
      status: 'high',
      time: '14:33:32',
      icon: Users
    },
    {
      id: '2', 
      name: 'Sarah Johnson',
      type: 'worker',
      location: 'Zone C-3, Sector 6',
      status: 'safe',
      time: '14:33:32',
      icon: Users
    },
    {
      id: '3',
      name: 'Drill Rig DR - 203',
      type: 'equipment',
      location: 'Zone D-4, Sector 7',
      status: 'medium',
      time: '14:33:32',
      icon: Wrench
    }
  ]);

  const [realTimeUpdates, setRealTimeUpdates] = useState({
    totalPersonnel: 47,
    activeEquipment: 23,
    emergencyVehicles: 8,
    dronesDeployed: 12
  });

  // Real-time asset updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update asset positions and status
      setAssets(prev => prev.map(asset => ({
        ...asset,
        time: new Date().toLocaleTimeString(),
        status: Math.random() > 0.8 ? 
          (Math.random() > 0.5 ? 'high' : 'medium') : 
          asset.status
      })));

      // Update real-time counts
      setRealTimeUpdates({
        totalPersonnel: 47 + Math.floor(Math.random() * 10 - 5),
        activeEquipment: 23 + Math.floor(Math.random() * 6 - 3),
        emergencyVehicles: 8 + Math.floor(Math.random() * 4 - 2),
        dronesDeployed: 12 + Math.floor(Math.random() * 8 - 4)
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const statusCounts = {
    high: assets.filter(a => a.status === 'high').length,
    medium: assets.filter(a => a.status === 'medium').length,
    warning: assets.filter(a => a.status === 'warning').length,
    safe: assets.filter(a => a.status === 'safe').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-orange-500 text-white';
      case 'warning': return 'bg-yellow-500 text-black';
      case 'safe': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const categories = [
    { name: 'All', active: true },
    { name: 'Workers', active: false },
    { name: 'Machines', active: false },
    { name: 'Vehicles', active: false }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Live Asset Tracking</h3>
          <div className="flex items-center space-x-4 text-xs text-gray-400 mt-1">
            <span>Personnel: {realTimeUpdates.totalPersonnel}</span>
            <span>Equipment: {realTimeUpdates.activeEquipment}</span>
            <span>Emergency: {realTimeUpdates.emergencyVehicles}</span>
            <span>Drones: {realTimeUpdates.dronesDeployed}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          {Object.entries(statusCounts).map(([status, count]) => (
            <span key={status} className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(status)}`}>
              {status === 'high' ? 'High' : status === 'medium' ? 'Medium' : status === 'warning' ? 'Warning' : 'Safe'}({count})
            </span>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 mb-4">
        {categories.map((category) => (
          <button
            key={category.name}
            className={`px-3 py-1 rounded text-sm ${
              category.active 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Asset List */}
      <div className="space-y-3">
        {/* Live Mining Site Feed */}
        <div className="bg-gray-700 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-sm">Live Site Overview</h4>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400">LIVE FEED</span>
            </div>
          </div>
          <div className="relative bg-gray-600 rounded-lg overflow-hidden aspect-video">
            <img 
              src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Mining Site Overview"
              className="w-full h-full object-cover brightness-75"
            />
            
            {/* Asset markers on the image */}
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
            <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-yellow-500 rounded-full animate-pulse border-2 border-white"></div>
            <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white"></div>
            
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 rounded px-2 py-1 text-xs">
              <span className="text-green-400">● </span>
              Real-time Asset Positions
            </div>
          </div>
        </div>

        {assets.map((asset) => {
          const Icon = asset.icon;
          return (
            <div key={asset.id} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-600 rounded-lg">
                    <Icon className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{asset.name}</h4>
                    <div className="text-xs text-gray-400 mt-1">
                      {asset.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-xs text-gray-400">{asset.time}</div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(asset.status)}`}>
                    {asset.status === 'high' ? 'High' : asset.status === 'medium' ? 'Medium' : asset.status === 'warning' ? 'Warning' : 'Safe'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Emergency Protocol */}
      <div className="mt-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
        <div className="flex items-center space-x-2 text-red-400 text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span className="font-medium">Emergency Protocol Active</span>
        </div>
        <p className="text-xs text-red-300 mt-1">
          High-risk personnel detected in danger zone. Evacuation protocols initiated.
        </p>
      </div>
    </div>
  );
};

export default LiveAssetTracking;