import React, { useState, useEffect } from 'react';
import { AlertTriangle, Users, Phone, MapPin, Clock, Siren } from 'lucide-react';

interface EmergencyProtocolProps {
  riskLevel: number;
}

const EmergencyProtocol: React.FC<EmergencyProtocolProps> = ({ riskLevel }) => {
  const [evacuationStatus, setEvacuationStatus] = useState({
    zone1: 'evacuating',
    zone2: 'alert',
    zone3: 'monitoring',
    zone4: 'evacuating'
  });

  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'Emergency Control Room', number: '+91-1800-EMERGENCY', status: 'contacted' },
    { name: 'Site Manager', number: '+91-98765-43210', status: 'contacted' },
    { name: 'Local Authorities', number: '+91-100', status: 'pending' },
    { name: 'Medical Team', number: '+91-108', status: 'standby' }
  ]);

  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'evacuating': return 'bg-red-600 text-white';
      case 'alert': return 'bg-yellow-600 text-white';
      case 'monitoring': return 'bg-blue-600 text-white';
      case 'contacted': return 'bg-green-600 text-white';
      case 'pending': return 'bg-red-600 text-white';
      case 'standby': return 'bg-yellow-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="bg-red-900 bg-opacity-30 border-2 border-red-500 rounded-lg p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Siren className="w-8 h-8 text-red-500 animate-spin" />
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-red-400">EMERGENCY PROTOCOL ACTIVATED</h2>
            <p className="text-red-300 text-sm">Critical risk level detected - Immediate action required</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-red-400">{riskLevel.toFixed(1)}%</div>
          <div className="text-xs text-red-300">Risk Level</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evacuation Status */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Users className="w-5 h-5 text-red-400" />
            <h3 className="font-semibold text-red-400">Evacuation Status</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(evacuationStatus).map(([zone, status]) => (
              <div key={zone} className="flex items-center justify-between">
                <span className="text-sm text-gray-300 capitalize">{zone.replace(/(\d+)/, ' $1')}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(status)}`}>
                  {status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-red-500 bg-opacity-20 rounded">
            <div className="flex items-center space-x-2 text-red-400 text-xs">
              <Clock className="w-3 h-3" />
              <span>Time Elapsed: {formatTime(timeElapsed)}</span>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Phone className="w-5 h-5 text-yellow-400" />
            <h3 className="font-semibold text-yellow-400">Emergency Contacts</h3>
          </div>
          <div className="space-y-2">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-300">{contact.name}</div>
                  <div className="text-xs text-gray-500">{contact.number}</div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(contact.status)}`}>
                  {contact.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Actions */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <MapPin className="w-5 h-5 text-orange-400" />
            <h3 className="font-semibold text-orange-400">Critical Actions</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-300">Alert systems activated</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-300">Personnel evacuation initiated</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Equipment shutdown in progress</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Emergency services notified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Perimeter secured</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          MANUAL OVERRIDE
        </button>
        <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          UPDATE STATUS
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          CONTACT CONTROL
        </button>
      </div>
    </div>
  );
};

export default EmergencyProtocol;