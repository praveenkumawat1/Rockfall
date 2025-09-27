import React from 'react';
import { Bone as Drone, Wifi, Radar, Battery, Signal } from 'lucide-react';

const MonitoringTiers: React.FC = () => {
  const tiers = [
    {
      id: 1,
      name: 'Tier 1 - Drone Coverage',
      status: 'healthy',
      health: 95,
      active: 418,
      battery: 78,
      uptime: '99.2%',
      icon: Drone
    },
    {
      id: 2,
      name: 'Tier 2 - Sensor Network',
      status: 'warning',
      health: 78,
      active: 47,
      battery: 82,
      uptime: '97.8%',
      icon: Wifi
    },
    {
      id: 3,
      name: 'Tier 3 - LiDAR/GB-SAR',
      status: 'healthy',
      health: 88,
      active: 213,
      battery: 95,
      uptime: '98.9%',
      icon: Radar
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getHealthBarColor = (health: number) => {
    if (health >= 90) return 'bg-green-500';
    if (health >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Monitoring Tier Status</h3>
        <div className="text-sm text-gray-400">Overall Health: 87%</div>
      </div>
      
      <div className="space-y-3">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          return (
            <div key={tier.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-700`}>
                    <Icon className={`w-5 h-5 ${getStatusColor(tier.status)}`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{tier.name}</h4>
                    <div className="flex items-center space-x-4 text-xs text-gray-400 mt-1">
                      <span>Active: {tier.active}</span>
                      <span>Avg Battery: {tier.battery}%</span>
                      <span>Uptime: {tier.uptime}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Health</div>
                  <div className={`text-lg font-bold ${getStatusColor(tier.status)}`}>
                    {tier.health}%
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getHealthBarColor(tier.health)} transition-all duration-500`}
                  style={{ width: `${tier.health}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonitoringTiers;