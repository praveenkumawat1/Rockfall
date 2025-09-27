import React, { useState } from 'react';
import { User, Settings, Bell, Shield, Download, Edit, Save, X } from 'lucide-react';

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@drishti.ai',
    role: 'Senior Geologist',
    department: 'Mining Safety Division',
    phone: '+91 98765 43210',
    location: 'Jharia Coal Mine, Jharkhand',
    joinDate: '2020-03-15',
    lastLogin: new Date().toISOString()
  });

  const [notifications, setNotifications] = useState({
    criticalAlerts: true,
    weatherUpdates: true,
    systemMaintenance: false,
    weeklyReports: true,
    emailNotifications: true,
    smsAlerts: true
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset any changes
  };

  const activityLog = [
    { action: 'Viewed Critical Alert', time: '2 minutes ago', type: 'alert' },
    { action: 'Generated Risk Report', time: '1 hour ago', type: 'report' },
    { action: 'Updated Sensor Configuration', time: '3 hours ago', type: 'config' },
    { action: 'Reviewed Analytics Dashboard', time: '5 hours ago', type: 'view' },
    { action: 'Exported Data to Excel', time: '1 day ago', type: 'export' }
  ];

  const systemStats = {
    alertsHandled: 247,
    reportsGenerated: 89,
    systemUptime: '99.2%',
    dataProcessed: '2.4 TB'
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">User Profile</h1>
          <p className="text-gray-400 mt-1">Manage your account settings and preferences</p>
        </div>
        <div className="flex space-x-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{userInfo.name}</h2>
                <p className="text-gray-400">{userInfo.role}</p>
                <p className="text-sm text-gray-500">{userInfo.department}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                ) : (
                  <p className="text-white">{userInfo.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                ) : (
                  <p className="text-white">{userInfo.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                ) : (
                  <p className="text-white">{userInfo.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userInfo.location}
                    onChange={(e) => setUserInfo({...userInfo, location: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                ) : (
                  <p className="text-white">{userInfo.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Join Date</label>
                <p className="text-white">{new Date(userInfo.joinDate).toLocaleDateString()}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Last Login</label>
                <p className="text-white">{new Date(userInfo.lastLogin).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Bell className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold">Notification Preferences</h3>
            </div>

            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-300 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {activityLog.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'alert' ? 'bg-red-500' :
                      activity.type === 'report' ? 'bg-blue-500' :
                      activity.type === 'config' ? 'bg-yellow-500' :
                      activity.type === 'export' ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                    <span className="text-white">{activity.action}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* System Stats */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Settings className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold">System Stats</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Alerts Handled</span>
                <span className="text-white font-medium">{systemStats.alertsHandled}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Reports Generated</span>
                <span className="text-white font-medium">{systemStats.reportsGenerated}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">System Uptime</span>
                <span className="text-green-500 font-medium">{systemStats.systemUptime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Data Processed</span>
                <span className="text-blue-500 font-medium">{systemStats.dataProcessed}</span>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold">Security</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                Change Password
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                Enable 2FA
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                View Login History
              </button>
            </div>
          </div>

          {/* Data Export */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Download className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-semibold">Data Export</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                Export Profile Data
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                Download Activity Log
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;