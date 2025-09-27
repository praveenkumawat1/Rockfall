import React, { useState, useEffect } from 'react';
import Header from './Header';
import NotificationPanel from './NotificationPanel';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Real-time notification generation
  useEffect(() => {
    const interval = setInterval(() => {
      const notificationTypes = [
        { type: 'critical', title: 'Critical Slope Movement', message: 'Immediate evacuation required in Zone D-4' },
        { type: 'warning', title: 'Weather Alert', message: 'Heavy rainfall expected in next 2 hours' },
        { type: 'info', title: 'Sensor Update', message: 'New sensor data received from Tier 2 network' },
        { type: 'success', title: 'System Status', message: 'All monitoring systems operational' }
      ];

      if (Math.random() < 0.3) { // 30% chance of new notification
        const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        const newNotification = {
          id: Date.now().toString(),
          ...randomNotification,
          timestamp: new Date(),
          read: false
        };

        setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Keep last 10
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <Header 
        onNotificationClick={toggleNotifications}
        notificationCount={notifications.filter(n => !n.read).length}
      />
      
      {showNotifications && (
        <NotificationPanel
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          onMarkAsRead={markAsRead}
          onClearAll={clearAll}
        />
      )}
      
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;