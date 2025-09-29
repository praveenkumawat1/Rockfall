import React from 'react';
import { X, AlertTriangle, Info, CheckCircle, Clock, MapPin, Users, Zap, Volume2 } from 'lucide-react';

interface Notification {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  details?: {
    location?: string;
    affectedPersonnel?: number;
    riskLevel?: number;
    eta?: string;
    actions?: string[];
  };
}

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications,
  onClose,
  onMarkAsRead,
  onClearAll
}) => {
  const [selectedNotification, setSelectedNotification] = React.useState<Notification | null>(null);
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  // Play high-risk sound alert
  const playHighRiskAlert = () => {
    if (soundEnabled) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(500, audioContext.currentTime + 0.3);
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.6);
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-500 bg-opacity-10 border-red-500';
      case 'warning': return 'bg-yellow-500 bg-opacity-10 border-yellow-500';
      case 'success': return 'bg-green-500 bg-opacity-10 border-green-500';
      default: return 'bg-blue-500 bg-opacity-10 border-blue-500';
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.type === 'critical') {
      playHighRiskAlert();
    }
    setSelectedNotification(notification);
    onMarkAsRead(notification.id);
  };

  return (
    <>
      <div className="fixed top-16 right-6 w-96 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl z-50 max-h-96 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-1 rounded ${soundEnabled ? 'text-green-400' : 'text-gray-400'}`}
            >
              <Volume2 className="w-4 h-4" />
            </button>
            {notifications.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No notifications</p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 cursor-pointer hover:bg-gray-700 transition-colors ${
                    getBgColor(notification.type)
                  } ${notification.read ? 'opacity-60' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start space-x-3">
                    {getIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white">
                        {notification.title}
                      </h4>
                      <p className="text-xs text-gray-300 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-1 mt-2 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>
                          {notification.timestamp.toLocaleTimeString()}
                        </span>
                        {notification.details?.location && (
                          <>
                            <span className="mx-1">•</span>
                            <MapPin className="w-3 h-3" />
                            <span>{notification.details.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detailed Notification Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getIcon(selectedNotification.type)}
                <h3 className="text-lg font-semibold">Notification Details</h3>
              </div>
              <button
                onClick={() => setSelectedNotification(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-white mb-2">{selectedNotification.title}</h4>
                <p className="text-gray-300 text-sm">{selectedNotification.message}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Type:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                    selectedNotification.type === 'critical' ? 'bg-red-600 text-white' :
                    selectedNotification.type === 'warning' ? 'bg-yellow-600 text-white' :
                    selectedNotification.type === 'success' ? 'bg-green-600 text-white' :
                    'bg-blue-600 text-white'
                  }`}>
                    {selectedNotification.type.toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Time:</span>
                  <p className="text-white">{selectedNotification.timestamp.toLocaleString()}</p>
                </div>
              </div>
              
              {selectedNotification.details && (
                <div className="bg-gray-700 rounded-lg p-4">
                  <h5 className="text-sm font-medium mb-3">Additional Information</h5>
                  <div className="space-y-2 text-sm">
                    {selectedNotification.details.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400">Location:</span>
                        <span className="text-white">{selectedNotification.details.location}</span>
                      </div>
                    )}
                    {selectedNotification.details.affectedPersonnel && (
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400">Affected Personnel:</span>
                        <span className="text-white">{selectedNotification.details.affectedPersonnel}</span>
                      </div>
                    )}
                    {selectedNotification.details.riskLevel && (
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400">Risk Level:</span>
                        <span className={`font-medium ${
                          selectedNotification.details.riskLevel > 70 ? 'text-red-400' :
                          selectedNotification.details.riskLevel > 40 ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          {selectedNotification.details.riskLevel}%
                        </span>
                      </div>
                    )}
                    {selectedNotification.details.eta && (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400">ETA:</span>
                        <span className="text-white">{selectedNotification.details.eta}</span>
                      </div>
                    )}
                  </div>
                  
                  {selectedNotification.details.actions && (
                    <div className="mt-4">
                      <h6 className="text-sm font-medium mb-2">Recommended Actions:</h6>
                      <ul className="space-y-1 text-xs">
                        {selectedNotification.details.actions.map((action, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span className="text-gray-300">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm">
                  Take Action
                </button>
                <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm">
                  Acknowledge
                </button>
                <button 
                  onClick={() => setSelectedNotification(null)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Bell = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
  </svg>
);

export default NotificationPanel;