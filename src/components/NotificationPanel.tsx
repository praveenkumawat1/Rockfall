import React from 'react';
import { X, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';

interface Notification {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
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

  return (
    <div className="fixed top-16 right-6 w-96 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl z-50 max-h-96 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <div className="flex items-center space-x-2">
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
                onClick={() => onMarkAsRead(notification.id)}
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
  );
};

const Bell = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
  </svg>
);

export default NotificationPanel;