import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Zap, 
  Radio, 
  Satellite, 
  Camera, 
  Mic, 
  Volume2, 
  Power, 
  Settings, 
  Monitor,
  Wifi,
  Battery,
  Signal,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Truck,
  Wrench
} from 'lucide-react';

interface AdvancedControlCenterProps {
  riskLevel: number;
}

const AdvancedControlCenter: React.FC<AdvancedControlCenterProps> = ({ riskLevel }) => {
  const [systemStatus, setSystemStatus] = useState({
    mainPower: true,
    backupPower: 95,
    networkStatus: 'online',
    satelliteLink: true,
    emergencyComms: true,
    aiProcessing: true,
    dataStorage: 78,
    securitySystem: true
  });

  const [controlSystems, setControlSystems] = useState({
    blastingSystem: { status: 'armed', lastCheck: '14:30', authorized: true },
    ventilationSystem: { status: 'active', airflow: 85, temperature: 22 },
    drainageSystem: { status: 'active', waterLevel: 45, pumpStatus: 'running' },
    lightingSystem: { status: 'active', brightness: 90, zones: 12 },
    accessControl: { status: 'secure', activeCards: 47, breaches: 0 }
  });

  const [communicationChannels, setCommunicationChannels] = useState([
    { id: 1, name: 'Control Room', frequency: '462.725 MHz', status: 'active', users: 8 },
    { id: 2, name: 'Emergency Channel', frequency: '467.875 MHz', status: 'standby', users: 0 },
    { id: 3, name: 'Equipment Ops', frequency: '462.550 MHz', status: 'active', users: 15 },
    { id: 4, name: 'Safety Team', frequency: '467.700 MHz', status: 'active', users: 6 }
  ]);

  const [droneSystems, setDroneSystems] = useState([
    { id: 'D001', name: 'Survey Drone Alpha', battery: 78, altitude: 150, status: 'patrolling', mission: 'Perimeter Survey' },
    { id: 'D002', name: 'Inspection Drone Beta', battery: 92, altitude: 85, status: 'inspecting', mission: 'Equipment Check' },
    { id: 'D003', name: 'Emergency Drone Gamma', battery: 100, altitude: 0, status: 'standby', mission: 'Ready for Deployment' }
  ]);

  const [automationSystems, setAutomationSystems] = useState({
    autoEvacuation: { enabled: true, zones: 4, triggerLevel: 75 },
    smartAlerts: { enabled: true, aiFiltering: true, falsePositiveRate: 2.1 },
    predictiveMaintenance: { enabled: true, scheduledTasks: 23, overdueTasks: 2 },
    energyOptimization: { enabled: true, savings: 18.5, carbonReduction: 12.3 }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Update system status
      setSystemStatus(prev => ({
        ...prev,
        backupPower: Math.max(85, Math.min(100, prev.backupPower + (Math.random() - 0.5) * 2)),
        dataStorage: Math.max(70, Math.min(90, prev.dataStorage + (Math.random() - 0.5) * 3)),
        networkStatus: Math.random() > 0.95 ? 'degraded' : 'online'
      }));

      // Update drone positions
      setDroneSystems(prev => prev.map(drone => ({
        ...drone,
        battery: Math.max(20, Math.min(100, drone.battery + (Math.random() - 0.6) * 2)),
        altitude: drone.status === 'patrolling' ? 
          Math.max(50, Math.min(200, drone.altitude + (Math.random() - 0.5) * 20)) : 
          drone.altitude
      })));

      // Update communication channels
      setCommunicationChannels(prev => prev.map(channel => ({
        ...channel,
        users: Math.max(0, channel.users + Math.floor((Math.random() - 0.5) * 4))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string | boolean) => {
    if (typeof status === 'boolean') {
      return status ? 'text-green-400' : 'text-red-400';
    }
    switch (status) {
      case 'online':
      case 'active':
      case 'secure':
      case 'running':
      case 'patrolling':
      case 'inspecting':
        return 'text-green-400';
      case 'standby':
      case 'armed':
        return 'text-yellow-400';
      case 'degraded':
      case 'warning':
        return 'text-orange-400';
      case 'offline':
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string | boolean) => {
    if (typeof status === 'boolean') {
      return status ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />;
    }
    switch (status) {
      case 'online':
      case 'active':
      case 'secure':
      case 'running':
        return <CheckCircle className="w-4 h-4" />;
      case 'standby':
      case 'armed':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-semibold">Advanced Control Center</h3>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400">All Systems Operational</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
            Master Control
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* System Status */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-semibold mb-4 flex items-center space-x-2">
            <Monitor className="w-5 h-5 text-green-500" />
            <span>System Status</span>
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Power className="w-4 h-4" />
                <span className="text-sm">Main Power</span>
              </div>
              <div className={`flex items-center space-x-1 ${getStatusColor(systemStatus.mainPower)}`}>
                {getStatusIcon(systemStatus.mainPower)}
                <span className="text-xs">Online</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Battery className="w-4 h-4" />
                <span className="text-sm">Backup Power</span>
              </div>
              <span className="text-green-400 text-xs">{systemStatus.backupPower.toFixed(1)}%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wifi className="w-4 h-4" />
                <span className="text-sm">Network</span>
              </div>
              <div className={`flex items-center space-x-1 ${getStatusColor(systemStatus.networkStatus)}`}>
                {getStatusIcon(systemStatus.networkStatus)}
                <span className="text-xs capitalize">{systemStatus.networkStatus}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Satellite className="w-4 h-4" />
                <span className="text-sm">Satellite Link</span>
              </div>
              <div className={`flex items-center space-x-1 ${getStatusColor(systemStatus.satelliteLink)}`}>
                {getStatusIcon(systemStatus.satelliteLink)}
                <span className="text-xs">Active</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Security</span>
              </div>
              <div className={`flex items-center space-x-1 ${getStatusColor(systemStatus.securitySystem)}`}>
                {getStatusIcon(systemStatus.securitySystem)}
                <span className="text-xs">Secure</span>
              </div>
            </div>
          </div>
        </div>

        {/* Control Systems */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-semibold mb-4 flex items-center space-x-2">
            <Settings className="w-5 h-5 text-orange-500" />
            <span>Control Systems</span>
          </h4>
          <div className="space-y-3">
            <div className="bg-gray-600 rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Blasting System</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  controlSystems.blastingSystem.status === 'armed' ? 'bg-yellow-600' : 'bg-gray-600'
                }`}>
                  {controlSystems.blastingSystem.status.toUpperCase()}
                </span>
              </div>
              <div className="text-xs text-gray-400">
                Last Check: {controlSystems.blastingSystem.lastCheck}
              </div>
            </div>
            
            <div className="bg-gray-600 rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Ventilation</span>
                <span className="text-green-400 text-xs">{controlSystems.ventilationSystem.airflow}%</span>
              </div>
              <div className="text-xs text-gray-400">
                Temp: {controlSystems.ventilationSystem.temperature}°C
              </div>
            </div>
            
            <div className="bg-gray-600 rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Drainage</span>
                <span className="text-blue-400 text-xs">{controlSystems.drainageSystem.waterLevel}%</span>
              </div>
              <div className="text-xs text-gray-400">
                Pumps: {controlSystems.drainageSystem.pumpStatus}
              </div>
            </div>
            
            <div className="bg-gray-600 rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Access Control</span>
                <span className="text-green-400 text-xs">{controlSystems.accessControl.activeCards} Active</span>
              </div>
              <div className="text-xs text-gray-400">
                Breaches: {controlSystems.accessControl.breaches}
              </div>
            </div>
          </div>
        </div>

        {/* Communication Systems */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-semibold mb-4 flex items-center space-x-2">
            <Radio className="w-5 h-5 text-purple-500" />
            <span>Communications</span>
          </h4>
          <div className="space-y-2">
            {communicationChannels.map((channel) => (
              <div key={channel.id} className="bg-gray-600 rounded p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{channel.name}</span>
                  <div className={`flex items-center space-x-1 ${getStatusColor(channel.status)}`}>
                    {getStatusIcon(channel.status)}
                    <span className="text-xs">{channel.users}</span>
                    <Users className="w-3 h-3" />
                  </div>
                </div>
                <div className="text-xs text-gray-400">{channel.frequency}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex space-x-2">
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded text-xs">
              <Mic className="w-3 h-3 inline mr-1" />
              Broadcast
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs">
              <Volume2 className="w-3 h-3 inline mr-1" />
              Listen
            </button>
          </div>
        </div>

        {/* Drone Systems */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-semibold mb-4 flex items-center space-x-2">
            <Camera className="w-5 h-5 text-cyan-500" />
            <span>Drone Fleet</span>
          </h4>
          <div className="space-y-3">
            {droneSystems.map((drone) => (
              <div key={drone.id} className="bg-gray-600 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{drone.name}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    drone.status === 'patrolling' ? 'bg-green-600' :
                    drone.status === 'inspecting' ? 'bg-blue-600' : 'bg-gray-600'
                  }`}>
                    {drone.status.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                  <div>Battery: <span className="text-green-400">{drone.battery}%</span></div>
                  <div>Alt: <span className="text-blue-400">{drone.altitude}m</span></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">{drone.mission}</div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded text-sm">
            Deploy Emergency Drone
          </button>
        </div>
      </div>

      {/* Automation Systems */}
      <div className="mt-6 bg-gray-700 rounded-lg p-4">
        <h4 className="font-semibold mb-4 flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          <span>Automation & AI Systems</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-600 rounded p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Auto Evacuation</span>
              <div className={`w-3 h-3 rounded-full ${automationSystems.autoEvacuation.enabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            <div className="text-xs text-gray-400">
              Zones: {automationSystems.autoEvacuation.zones} | Trigger: {automationSystems.autoEvacuation.triggerLevel}%
            </div>
          </div>
          
          <div className="bg-gray-600 rounded p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Smart Alerts</span>
              <div className={`w-3 h-3 rounded-full ${automationSystems.smartAlerts.enabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            <div className="text-xs text-gray-400">
              False Positive Rate: {automationSystems.smartAlerts.falsePositiveRate}%
            </div>
          </div>
          
          <div className="bg-gray-600 rounded p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Predictive Maintenance</span>
              <div className={`w-3 h-3 rounded-full ${automationSystems.predictiveMaintenance.enabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            <div className="text-xs text-gray-400">
              Tasks: {automationSystems.predictiveMaintenance.scheduledTasks} | Overdue: {automationSystems.predictiveMaintenance.overdueTasks}
            </div>
          </div>
          
          <div className="bg-gray-600 rounded p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Energy Optimization</span>
              <div className={`w-3 h-3 rounded-full ${automationSystems.energyOptimization.enabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            <div className="text-xs text-gray-400">
              Savings: {automationSystems.energyOptimization.savings}% | CO₂: -{automationSystems.energyOptimization.carbonReduction}%
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Override */}
      {riskLevel > 70 && (
        <div className="mt-4 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="font-medium text-red-400">Emergency Override Available</span>
            </div>
            <div className="flex space-x-2">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm">
                EMERGENCY STOP
              </button>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm">
                EVACUATE ALL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedControlCenter;