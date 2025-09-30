import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Users, 
  FileText, 
  Award,
  Clipboard,
  HardHat,
  Eye,
  Heart,
  Zap
} from 'lucide-react';

const SafetyCompliance: React.FC = () => {
  const [complianceMetrics, setComplianceMetrics] = useState({
    overallScore: 92.5,
    lastAudit: '2024-01-15',
    nextAudit: '2024-04-15',
    certificationsValid: 18,
    certificationsExpiring: 3,
    incidentFreedays: 127,
    safetyTrainingCompletion: 94.2
  });

  const [safetyProtocols, setSafetyProtocols] = useState([
    { 
      id: 1, 
      name: 'Personal Protective Equipment', 
      status: 'compliant', 
      lastCheck: '2024-01-20',
      compliance: 98,
      issues: 0
    },
    { 
      id: 2, 
      name: 'Emergency Evacuation Procedures', 
      status: 'compliant', 
      lastCheck: '2024-01-18',
      compliance: 95,
      issues: 1
    },
    { 
      id: 3, 
      name: 'Equipment Safety Checks', 
      status: 'warning', 
      lastCheck: '2024-01-22',
      compliance: 87,
      issues: 3
    },
    { 
      id: 4, 
      name: 'Hazardous Material Handling', 
      status: 'compliant', 
      lastCheck: '2024-01-19',
      compliance: 96,
      issues: 0
    },
    { 
      id: 5, 
      name: 'Environmental Protection', 
      status: 'review', 
      lastCheck: '2024-01-16',
      compliance: 89,
      issues: 2
    }
  ]);

  const [safetyIncidents, setSafetyIncidents] = useState([
    {
      id: 1,
      type: 'Near Miss',
      severity: 'low',
      date: '2024-01-20',
      description: 'Equipment malfunction detected before operation',
      status: 'resolved',
      actionsTaken: 'Equipment serviced and tested'
    },
    {
      id: 2,
      type: 'Safety Violation',
      severity: 'medium',
      date: '2024-01-18',
      description: 'Worker found without proper PPE in restricted area',
      status: 'investigating',
      actionsTaken: 'Retraining scheduled'
    }
  ]);

  const [trainingPrograms, setTrainingPrograms] = useState([
    { name: 'Basic Safety Orientation', completion: 100, enrolled: 47, certified: 47 },
    { name: 'Emergency Response', completion: 96, enrolled: 47, certified: 45 },
    { name: 'Equipment Operation', completion: 89, enrolled: 35, certified: 31 },
    { name: 'Hazmat Handling', completion: 92, enrolled: 25, certified: 23 },
    { name: 'First Aid/CPR', completion: 87, enrolled: 47, certified: 41 }
  ]);

  const [realTimeMonitoring, setRealTimeMonitoring] = useState({
    activeWorkers: 47,
    ppeCompliance: 94,
    airQuality: 'Good',
    noiseLevel: 78,
    temperatureAlerts: 0,
    gasDetection: 'Normal',
    radiationLevel: 'Safe'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Update real-time monitoring data
      setRealTimeMonitoring(prev => ({
        ...prev,
        activeWorkers: 47 + Math.floor(Math.random() * 10 - 5),
        ppeCompliance: Math.max(85, Math.min(100, prev.ppeCompliance + (Math.random() - 0.5) * 5)),
        noiseLevel: Math.max(65, Math.min(85, prev.noiseLevel + (Math.random() - 0.5) * 5)),
        temperatureAlerts: Math.random() > 0.9 ? Math.floor(Math.random() * 3) : 0,
        airQuality: Math.random() > 0.95 ? 'Moderate' : 'Good'
      }));

      // Update compliance metrics
      setComplianceMetrics(prev => ({
        ...prev,
        overallScore: Math.max(85, Math.min(100, prev.overallScore + (Math.random() - 0.5) * 2)),
        safetyTrainingCompletion: Math.max(85, Math.min(100, prev.safetyTrainingCompletion + (Math.random() - 0.5) * 1))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'review': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'review': return <Clock className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      case 'high': return 'bg-orange-600';
      case 'critical': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 95) return 'text-green-400';
    if (score >= 85) return 'text-yellow-400';
    if (score >= 75) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-semibold">Safety & Compliance Management</h3>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-400">
            Last Audit: {complianceMetrics.lastAudit}
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
            Generate Report
          </button>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Award className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium">Overall Score</span>
          </div>
          <div className={`text-2xl font-bold ${getComplianceColor(complianceMetrics.overallScore)}`}>
            {complianceMetrics.overallScore.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400">Compliance Rating</div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium">Incident Free</span>
          </div>
          <div className="text-2xl font-bold text-green-400">
            {complianceMetrics.incidentFreedays}
          </div>
          <div className="text-xs text-gray-400">Days</div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <FileText className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium">Certifications</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {complianceMetrics.certificationsValid}
          </div>
          <div className="text-xs text-yellow-400">
            {complianceMetrics.certificationsExpiring} expiring soon
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-5 h-5 text-cyan-500" />
            <span className="text-sm font-medium">Training</span>
          </div>
          <div className="text-2xl font-bold text-cyan-400">
            {complianceMetrics.safetyTrainingCompletion.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400">Completion Rate</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Safety Protocols */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-semibold mb-4 flex items-center space-x-2">
            <Clipboard className="w-5 h-5 text-blue-500" />
            <span>Safety Protocols Status</span>
          </h4>
          <div className="space-y-3">
            {safetyProtocols.map((protocol) => (
              <div key={protocol.id} className="bg-gray-600 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{protocol.name}</span>
                  <div className={`flex items-center space-x-1 ${getStatusColor(protocol.status)}`}>
                    {getStatusIcon(protocol.status)}
                    <span className="text-xs capitalize">{protocol.status}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Last Check: {protocol.lastCheck}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${getComplianceColor(protocol.compliance)}`}>
                      {protocol.compliance}%
                    </span>
                    {protocol.issues > 0 && (
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                        {protocol.issues} issues
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full bg-gray-500 rounded-full h-1 mt-2">
                  <div 
                    className={`h-1 rounded-full ${
                      protocol.compliance >= 95 ? 'bg-green-500' :
                      protocol.compliance >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${protocol.compliance}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Safety Monitoring */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-semibold mb-4 flex items-center space-x-2">
            <Eye className="w-5 h-5 text-green-500" />
            <span>Real-time Safety Monitoring</span>
          </h4>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-600 rounded p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <HardHat className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">PPE Compliance</span>
                </div>
                <div className="text-lg font-bold text-green-400">
                  {realTimeMonitoring.ppeCompliance.toFixed(1)}%
                </div>
              </div>
              
              <div className="bg-gray-600 rounded p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Active Workers</span>
                </div>
                <div className="text-lg font-bold text-white">
                  {realTimeMonitoring.activeWorkers}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-600 rounded p-3">
              <div className="text-sm font-medium mb-2">Environmental Monitoring</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Air Quality:</span>
                  <span className={realTimeMonitoring.airQuality === 'Good' ? 'text-green-400' : 'text-yellow-400'}>
                    {realTimeMonitoring.airQuality}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Noise Level:</span>
                  <span className="text-orange-400">{realTimeMonitoring.noiseLevel} dB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Gas Detection:</span>
                  <span className="text-green-400">{realTimeMonitoring.gasDetection}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Radiation:</span>
                  <span className="text-green-400">{realTimeMonitoring.radiationLevel}</span>
                </div>
              </div>
            </div>
            
            {realTimeMonitoring.temperatureAlerts > 0 && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded p-3">
                <div className="flex items-center space-x-2 text-red-400 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-medium">Temperature Alerts</span>
                </div>
                <p className="text-red-300 text-xs mt-1">
                  {realTimeMonitoring.temperatureAlerts} high temperature alert(s) detected
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Training Programs */}
      <div className="mt-6 bg-gray-700 rounded-lg p-4">
        <h4 className="font-semibold mb-4 flex items-center space-x-2">
          <Users className="w-5 h-5 text-purple-500" />
          <span>Safety Training Programs</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {trainingPrograms.map((program, index) => (
            <div key={index} className="bg-gray-600 rounded p-3">
              <div className="text-sm font-medium mb-2">{program.name}</div>
              <div className="text-xs text-gray-400 mb-2">
                {program.certified}/{program.enrolled} certified
              </div>
              <div className="w-full bg-gray-500 rounded-full h-2 mb-1">
                <div 
                  className={`h-2 rounded-full ${
                    program.completion >= 95 ? 'bg-green-500' :
                    program.completion >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${program.completion}%` }}
                />
              </div>
              <div className={`text-xs font-medium ${getComplianceColor(program.completion)}`}>
                {program.completion}% Complete
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Safety Incidents */}
      <div className="mt-6 bg-gray-700 rounded-lg p-4">
        <h4 className="font-semibold mb-4 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          <span>Recent Safety Incidents</span>
        </h4>
        <div className="space-y-3">
          {safetyIncidents.map((incident) => (
            <div key={incident.id} className="bg-gray-600 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                    {incident.type}
                  </span>
                  <span className="text-sm font-medium">{incident.date}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  incident.status === 'resolved' ? 'bg-green-600' : 
                  incident.status === 'investigating' ? 'bg-yellow-600' : 'bg-red-600'
                }`}>
                  {incident.status.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-gray-300 mb-2">{incident.description}</p>
              <p className="text-xs text-gray-400">Actions: {incident.actionsTaken}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Alerts */}
      {complianceMetrics.certificationsExpiring > 0 && (
        <div className="mt-4 p-4 bg-yellow-500 bg-opacity-20 border border-yellow-500 rounded-lg">
          <div className="flex items-center space-x-2 text-yellow-400 mb-2">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Compliance Alert</span>
          </div>
          <p className="text-yellow-300 text-sm">
            {complianceMetrics.certificationsExpiring} certification(s) expiring soon. 
            Next audit scheduled for {complianceMetrics.nextAudit}.
          </p>
        </div>
      )}
    </div>
  );
};

export default SafetyCompliance;