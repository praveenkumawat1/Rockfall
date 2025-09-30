import React, { useState, useEffect } from 'react';
import { Users, Truck, Wrench, AlertTriangle, Filter, Search, Volume2, Eye, MapPin, Clock } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  type: 'worker' | 'equipment' | 'vehicle' | 'drone';
  location: string;
  status: 'high' | 'medium' | 'warning' | 'safe';
  time: string;
  icon: any;
  coordinates: { x: number; y: number };
  details: {
    heartRate?: number;
    batteryLevel?: number;
    speed?: number;
    temperature?: number;
  };
}

const LiveAssetTracking: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: '1',
      name: 'John Smith',
      type: 'worker',
      location: 'Zone D-4, Sector 7',
      status: 'high',
      time: '14:33:32',
      icon: Users,
      coordinates: { x: 25, y: 30 },
      details: { heartRate: 95, temperature: 37.2 }
    },
    {
      id: '2', 
      name: 'Sarah Johnson',
      type: 'worker',
      location: 'Zone C-3, Sector 6',
      status: 'safe',
      time: '14:33:32',
      icon: Users,
      coordinates: { x: 60, y: 45 },
      details: { heartRate: 72, temperature: 36.8 }
    },
    {
      id: '3',
      name: 'Drill Rig DR-203',
      type: 'equipment',
      location: 'Zone D-4, Sector 7',
      status: 'medium',
      time: '14:33:32',
      icon: Wrench,
      coordinates: { x: 40, y: 60 },
      details: { batteryLevel: 78, temperature: 45.3 }
    },
    {
      id: '4',
      name: 'Excavator EX-105',
      type: 'equipment',
      location: 'Zone B-2, Sector 3',
      status: 'safe',
      time: '14:33:32',
      icon: Wrench,
      coordinates: { x: 75, y: 25 },
      details: { batteryLevel: 92, temperature: 42.1 }
    },
    {
      id: '5',
      name: 'Transport Truck T-45',
      type: 'vehicle',
      location: 'Zone A-1, Sector 2',
      status: 'warning',
      time: '14:33:32',
      icon: Truck,
      coordinates: { x: 15, y: 70 },
      details: { speed: 25, batteryLevel: 65 }
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [slopeData, setSlopeData] = useState({
    angle: 0,
    stability: 85,
    movement: 2.3,
    riskLevel: 'medium'
  });

  const [realTimeUpdates, setRealTimeUpdates] = useState({
    totalPersonnel: 47,
    activeEquipment: 23,
    emergencyVehicles: 8,
    dronesDeployed: 12
  });

  // High-risk sound alert
  const playHighRiskAlert = () => {
    if (soundEnabled) {
      // Create audio context for sound generation
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime + 0.5);
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 1);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1.5);
    }
  };

  // Real-time asset updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prev => prev.map(asset => {
        const newStatus = Math.random() > 0.85 ? 
          (Math.random() > 0.5 ? 'high' : 'medium') : 
          asset.status;
        
        // Play sound for high-risk status change
        if (newStatus === 'high' && asset.status !== 'high') {
          playHighRiskAlert();
        }
        
        return {
          ...asset,
          time: new Date().toLocaleTimeString(),
          status: newStatus,
          coordinates: {
            x: Math.max(5, Math.min(95, asset.coordinates.x + (Math.random() - 0.5) * 5)),
            y: Math.max(5, Math.min(95, asset.coordinates.y + (Math.random() - 0.5) * 5))
          },
          details: {
            ...asset.details,
            heartRate: asset.details.heartRate ? Math.floor(asset.details.heartRate + (Math.random() - 0.5) * 10) : undefined,
            batteryLevel: asset.details.batteryLevel ? Math.max(0, Math.min(100, asset.details.batteryLevel + (Math.random() - 0.5) * 5)) : undefined,
            temperature: asset.details.temperature ? asset.details.temperature + (Math.random() - 0.5) * 2 : undefined,
            speed: asset.details.speed ? Math.max(0, asset.details.speed + (Math.random() - 0.5) * 10) : undefined
          }
        };
      }));

      // Update slope monitoring data
      setSlopeData(prev => ({
        angle: Math.max(0, prev.angle + (Math.random() - 0.5) * 0.5),
        stability: Math.max(0, Math.min(100, prev.stability + (Math.random() - 0.5) * 5)),
        movement: Math.max(0, prev.movement + (Math.random() - 0.5) * 0.3),
        riskLevel: prev.stability < 60 ? 'high' : prev.stability < 80 ? 'medium' : 'low'
      }));

      // Update real-time counts
      setRealTimeUpdates({
        totalPersonnel: 47 + Math.floor(Math.random() * 10 - 5),
        activeEquipment: 23 + Math.floor(Math.random() * 6 - 3),
        emergencyVehicles: 8 + Math.floor(Math.random() * 4 - 2),
        dronesDeployed: 12 + Math.floor(Math.random() * 8 - 4)
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  const filteredAssets = assets.filter(asset => {
    const matchesFilter = activeFilter === 'all' || asset.type === activeFilter;
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'worker': return Users;
      case 'equipment': return Wrench;
      case 'vehicle': return Truck;
      default: return Users;
    }
  };

  const categories = [
    { name: 'all', label: 'All Assets', count: assets.length },
    { name: 'worker', label: 'Workers', count: assets.filter(a => a.type === 'worker').length },
    { name: 'equipment', label: 'Equipment', count: assets.filter(a => a.type === 'equipment').length },
    { name: 'vehicle', label: 'Vehicles', count: assets.filter(a => a.type === 'vehicle').length }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Advanced Live Asset Tracking</h3>
          <div className="flex items-center space-x-4 text-xs text-gray-400 mt-1">
            <span>Personnel: {realTimeUpdates.totalPersonnel}</span>
            <span>Equipment: {realTimeUpdates.activeEquipment}</span>
            <span>Emergency: {realTimeUpdates.emergencyVehicles}</span>
            <span>Drones: {realTimeUpdates.dronesDeployed}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded ${soundEnabled ? 'bg-green-600' : 'bg-gray-600'} text-white`}
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <div className="flex space-x-2">
            {Object.entries(statusCounts).map(([status, count]) => (
              <span key={status} className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(status)}`}>
                {status === 'high' ? 'High' : status === 'medium' ? 'Medium' : status === 'warning' ? 'Warning' : 'Safe'}({count})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-gray-700 rounded-lg p-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveFilter(category.name)}
                  className={`px-3 py-1 rounded text-sm ${
                    activeFilter === category.name 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-600 border border-gray-500 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Mining Site with 3D Visualization */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Live Mining Site - 3D View</h4>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400">LIVE 3D TRACKING</span>
            </div>
          </div>
          
          <div className="relative bg-gray-700 rounded-lg overflow-hidden aspect-video">
            <img 
              src="https://img.freepik.com/premium-photo/open-pit-open-pit-mining-open-pit-mine-aerial-view_438099-29919.jpg?w=2000"
              alt="Mining Site 3D View"
              className="w-full h-full object-cover brightness-75"
            />
            
            {/* 3D Asset markers */}
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className={`absolute w-4 h-4 rounded-full border-2 border-white cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                  asset.status === 'high' ? 'bg-red-500 animate-pulse' :
                  asset.status === 'medium' ? 'bg-orange-500' :
                  asset.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{
                  left: `${asset.coordinates.x}%`,
                  top: `${asset.coordinates.y}%`
                }}
                onClick={() => setSelectedAsset(asset)}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 rounded px-2 py-1 text-xs whitespace-nowrap">
                  {asset.name}
                </div>
              </div>
            ))}
            
            {/* 3D Slope visualization overlay */}
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 rounded-lg p-3">
              <div className="text-xs text-gray-300 mb-2">3D Slope Analysis</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Angle:</span>
                  <span className="text-white">{slopeData.angle.toFixed(1)}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Stability:</span>
                  <span className={slopeData.stability > 80 ? 'text-green-400' : slopeData.stability > 60 ? 'text-yellow-400' : 'text-red-400'}>
                    {slopeData.stability.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Movement:</span>
                  <span className="text-orange-400">{slopeData.movement.toFixed(1)}mm</span>
                </div>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 bg-black bg-opacity-75 rounded-lg p-2">
              <div className="text-xs text-gray-300">3D Rendering: Active</div>
              <div className="text-xs text-green-400">LiDAR: Online</div>
              <div className="text-xs text-blue-400">Photogrammetry: Active</div>
            </div>
          </div>

          {/* Slope Monitoring 3D Model */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h5 className="text-sm font-medium mb-3">3D Slope Model</h5>
            <div className="relative bg-gray-600 rounded aspect-video">
              <img 
                src="https://img.freepik.com/premium-photo/open-pit-open-pit-mining-open-pit-mine-aerial-view_438099-29919.jpg?w=2000"
                alt="3D Slope Model"
                className="w-full h-full object-cover rounded brightness-50"
              />
              
              {/* 3D wireframe overlay */}
              <div className="absolute inset-0 opacity-30">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#00ff00" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                  <path d="M 20 80 Q 50 60 80 70" fill="none" stroke="#ff6b6b" strokeWidth="2"/>
                  <path d="M 15 85 Q 50 65 85 75" fill="none" stroke="#ffd93d" strokeWidth="1"/>
                </svg>
              </div>
              
              <div className="absolute bottom-2 left-2 text-xs">
                <div className="bg-black bg-opacity-75 rounded px-2 py-1">
                  <span className={`font-medium ${
                    slopeData.riskLevel === 'high' ? 'text-red-400' :
                    slopeData.riskLevel === 'medium' ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    Risk: {slopeData.riskLevel.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Asset List with Enhanced Details */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Tracked Assets ({filteredAssets.length})</h4>
          
          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredAssets.map((asset) => {
              const Icon = getAssetIcon(asset.type);
              return (
                <div key={asset.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-600 rounded-lg">
                        <Icon className="w-5 h-5 text-gray-300" />
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">{asset.name}</h5>
                        <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{asset.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{asset.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="text-right text-xs">
                        {asset.details.heartRate && (
                          <div className="text-red-400">♥ {asset.details.heartRate} BPM</div>
                        )}
                        {asset.details.batteryLevel && (
                          <div className="text-green-400">🔋 {asset.details.batteryLevel}%</div>
                        )}
                        {asset.details.speed && (
                          <div className="text-blue-400">⚡ {asset.details.speed} km/h</div>
                        )}
                        {asset.details.temperature && (
                          <div className="text-yellow-400">🌡️ {asset.details.temperature.toFixed(1)}°C</div>
                        )}
                      </div>
                      <button
                        onClick={() => setSelectedAsset(asset)}
                        className="p-1 text-gray-400 hover:text-white"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(asset.status)}`}>
                        {asset.status === 'high' ? 'High' : asset.status === 'medium' ? 'Medium' : asset.status === 'warning' ? 'Warning' : 'Safe'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Asset Information Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Asset Details</h3>
              <button
                onClick={() => setSelectedAsset(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gray-700 rounded-lg">
                  {React.createElement(getAssetIcon(selectedAsset.type), { className: "w-6 h-6 text-gray-300" })}
                </div>
                <div>
                  <h4 className="font-medium">{selectedAsset.name}</h4>
                  <p className="text-sm text-gray-400 capitalize">{selectedAsset.type}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Location:</span>
                  <p className="text-white">{selectedAsset.location}</p>
                </div>
                <div>
                  <span className="text-gray-400">Status:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ml-2 ${getStatusColor(selectedAsset.status)}`}>
                    {selectedAsset.status.toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Last Update:</span>
                  <p className="text-white">{selectedAsset.time}</p>
                </div>
                <div>
                  <span className="text-gray-400">Coordinates:</span>
                  <p className="text-white">{selectedAsset.coordinates.x.toFixed(1)}, {selectedAsset.coordinates.y.toFixed(1)}</p>
                </div>
              </div>
              
              {/* Detailed metrics */}
              <div className="bg-gray-700 rounded-lg p-3">
                <h5 className="text-sm font-medium mb-2">Live Metrics</h5>
                <div className="space-y-2 text-xs">
                  {selectedAsset.details.heartRate && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Heart Rate:</span>
                      <span className="text-red-400">{selectedAsset.details.heartRate} BPM</span>
                    </div>
                  )}
                  {selectedAsset.details.batteryLevel && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Battery:</span>
                      <span className="text-green-400">{selectedAsset.details.batteryLevel}%</span>
                    </div>
                  )}
                  {selectedAsset.details.speed && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Speed:</span>
                      <span className="text-blue-400">{selectedAsset.details.speed} km/h</span>
                    </div>
                  )}
                  {selectedAsset.details.temperature && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Temperature:</span>
                      <span className="text-yellow-400">{selectedAsset.details.temperature.toFixed(1)}°C</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm">
                  Track Asset
                </button>
                <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm">
                  Send Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Protocol */}
      {statusCounts.high > 0 && (
        <div className="mt-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
          <div className="flex items-center space-x-2 text-red-400 text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-medium">High-Risk Assets Detected</span>
          </div>
          <p className="text-xs text-red-300 mt-1">
            {statusCounts.high} asset(s) in high-risk status. Emergency protocols may be required.
          </p>
        </div>
      )}
    </div>
  );
};

export default LiveAssetTracking;