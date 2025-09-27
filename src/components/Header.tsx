import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, User, Mountain } from 'lucide-react';

interface HeaderProps {
  onNotificationClick: () => void;
  notificationCount: number;
}

const Header: React.FC<HeaderProps> = ({ onNotificationClick, notificationCount }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2 text-orange-500 hover:text-orange-400">
            <Mountain className="w-8 h-8" />
            <span className="text-xl font-bold">Drishti</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6 ml-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-orange-500' : 'text-gray-300 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/alerts" 
              className={`font-medium transition-colors ${
                isActive('/alerts') ? 'text-orange-500' : 'text-gray-300 hover:text-white'
              }`}
            >
              Alerts
            </Link>
            <Link 
              to="/analytics" 
              className={`font-medium transition-colors ${
                isActive('/analytics') ? 'text-orange-500' : 'text-gray-300 hover:text-white'
              }`}
            >
              Analytics
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right text-sm hidden md:block">
            <div className="text-gray-400">
              Last Update: {new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </div>
            <div className="text-gray-500">Mine Site: Jharia Coal Mine</div>
          </div>
          
          <button 
            onClick={onNotificationClick}
            className="p-2 text-gray-400 hover:text-white relative transition-colors"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>
          
          <Link 
            to="/profile" 
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="hidden md:inline">User</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;