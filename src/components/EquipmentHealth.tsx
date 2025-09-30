import React, { useState, useEffect } from 'react';
import { Wrench, Battery, Thermometer, Zap, AlertTriangle, CheckCircle, Clock, TrendingUp, Settings, Activity, Gauge, PenTool as Tool } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  type: string;
  status: 'operational' | 'maintenance' | 'warning' | 'critical';
  health: number;
  lastMaintenance: string;
  nextMaintenance: string;
  operatingHours: number;
  efficiency: number;
  metrics: {
    temperature: number;
    vibration: number;
    pressure: number;
    fuelLevel: number;
    oilPressure: number;
    engineRPM: number;
  };
}

const EquipmentHealth: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: 'EX001',
      name: 'Excavator CAT 390F',
      type: 'Heavy Machinery',
      status: 'operational',
      health: 92,
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-02-10',
      operatingHours: 2847,
      efficiency: 94,
      metrics: {
        temperature: 78,
        vibration: 2.3,
        pressure: 145,
        fuelLevel: 78,
        oilPressure: 45,
        engineRPM: 1850
      }
    },
    {
      id: 'DR001',
      name: 'Drill Rig Atlas Copco',
      type: 'Drilling Equipment',
      status: 'warning',
      health: 76,
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-01-25',
      operatingHours: 3421,
      efficiency: 87,
      metrics: {
        temperature: 95,
        vibration: 4.1,
        pressure: 180,
        fuelLevel: 45,
        oilPressure: 38,
        engineRPM: 2100
      }
    },
    {
      id: 'TR001',
      name: 'Haul Truck Caterpillar 797F',
      type: 'Transport Vehicle',
      status: 'operational',
      health: 88,
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-02-15',
      operatingHours: 1923,
      efficiency: 91,
      metrics: {
        temperature: 82,
        vibration: 1.8,
        pressure: 160,
        fuelLevel: 92,
        oilPressure: 52,
        engineRPM: 1650
      }
    },
    {
      id: 'CR001',
      name: 'Crusher Metso HP400',
      type: 'Processing Equipment',
      status: 'maintenance',
      health: 65,
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-01-22',
      operatingHours: 4156,
      efficiency: 78,
      metrics: {
        temperature: 105,
        vibration: 5.2,
        pressure: 200,
        fuelLevel: 0,
        oilPressure: 25,
        engineRPM: 0
      }
    }
  ]);

  const [maintenanceSchedule, setMaintenanceSchedule] = useState([
    { equipment: 'Drill Rig Atlas Copco', type: 'Preventive', date: '2024-01-25', priority: 'high' },
    { equipment: 'Crusher Metso HP400', type: 'Repair', date: '2024-01-22', priority: 'critical' },
    { equipment: 'Conveyor Belt System', type: 'Inspection', date: '2024-01-28', priority: 'medium' },
    { equipment: 'Generator Set 1', type: 'Service', date: '2024-02-01', priority: 'low' }
  ]);

  const [performanceMetrics, setPerformanceMetrics] = useState({
    overallEfficiency: 87.5,
    equipmentUptime: 94.2,
    maintenanceCosts: 125000,
    energyConsumption: 2847,
    productionOutput: 15420,
    fuelEfficiency: 8.7
  });

  const [predictiveAlerts, setPredictiveAlerts] = useState([
    {
      equipment: 'Drill Rig Atlas Copco',
      component: 'Hydraulic System',
      prediction: 'Potential failure in 72 hours',
      confidence: 87,
      recommendation: 'Schedule immediate inspection'
    },
    {
      equipment: 'Excavator CAT 390F',
      component: 'Track System',
      prediction: 'Wear threshold in 2 weeks',
      confidence: 92,
      recommendation: 'Order replacement parts'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEquipment(prev => prev.map(eq => ({
        ...eq,
        health: Math.max(60, Math.min(100, eq.health + (Math.random() - 0.5) * 3)),
        efficiency: Math.max(70, Math.min(100, eq.efficiency + (Math.random() - 0.5) * 2)),
        operatingHours: eq.status === 'operational' ? eq.operatingHours + 0.1 : eq.operatingHours,
        metrics: {
          ...eq.metrics,
          temperature: Math.max(60, Math.min(120, eq.metrics.temperature + (Math.random() - 0.5) * 5)),
          vibration: Math.max(1, Math.min(6, eq.metrics.vibration + (Math.random() - 0.5) * 0.5)),
          pressure: Math.max(100, Math.min(250, eq.metrics.pressure + (Math.random() - 0.5) * 10)),
          fuelLevel: eq.status === 'operational' ? Math.max(0, eq.metrics.fuelLevel - Math.random() * 0.5) : eq.metrics.fuelLevel,
          oilPressure: Math.max(20, Math.min(60, eq.metrics.oilPressure + (Math.random() - 0.5) * 3)),
          engineRPM: eq.status === 'operational' ? 
            Math.max(1500, Math.min(2500, eq.metrics.engineRPM + (Math.random() - 0.5) * 100)) : 0
        }
      })));

      // Update performance metrics
      setPerformanceMetrics(prev => ({
        ...prev,
        overallEfficiency: Math.max(80, Math.min(95, prev.overallEfficiency + (Math.random() - 0.5) * 2)),
        equipmentUptime: Math.max(85, Math.min(98, prev.equipmentUptime + (Math.random() - 0.5) * 1)),
        energyConsumption: prev.energyConsumption + Math.random() * 10,
        productionOutput: prev.productionOutput + Math.random() * 50
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'maintenance': return 'text-blue-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'maintenance': return <Tool className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-400';
    if (health >= 75) return 'text-yellow-400';
    if (health >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Wrench className="w-6 h-6 text-orange-500" />
          <h3 className="text-xl font-semibold">Equipment Health Monitoring</h3>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-400">
            {equipment.filter(eq => eq.status === 'operational').length}/{equipment.length} Operational
          </div>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm">
            Maintenance Report
          </button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-xs font-medium">Efficiency</span>
          </div>
          <div className="text-lg font-bold text-green-400">
            {performanceMetrics.overallEfficiency.toFixed(1)}%
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-medium">Uptime</span>
          </div>
          <div className="text-lg font-bold text-blue-400">
            {performanceMetrics.equipmentUptime.toFixed(1)}%
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-xs font-medium">Energy</span>
          </div>
          <div className="text-lg font-bold text-yellow-400">
            {(performanceMetrics.energyConsumption / 1000).toFixed(1)}k kWh
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Activity className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-medium">Output</span>
          </div>
          <div className="text-lg font-bold text-purple-400">
            {(performanceMetrics.productionOutput / 1000).toFixed(1)}k tons
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Gauge className="w-4 h-4 text-cyan-500" />
            <span className="text-xs font-medium">Fuel Eff.</span>
          </div>
          <div className="text-lg font-bold text-cyan-400">
            {performanceMetrics.fuelEfficiency.toFixed(1)} L/h
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Settings className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-medium">Maint. Cost</span>
          </div>
          <div className="text-lg font-bold text-gray-400">
            ${(performanceMetrics.maintenanceCosts / 1000).toFixed(0)}k
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equipment Status */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-semibold mb-4 flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-500" />
            <span>Equipment Status</span>
          </h4>
          <div className="space-y-3">
            {equipment.map((eq) => (
              <div key={eq.id} className="bg-gray-600 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center space-x-1 ${getStatusColor(eq.status)}`}>
                      {getStatusIcon(eq.status)}
                      <span className="text-sm font-medium">{eq.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-bold ${getHealthColor(eq.health)}`}>
                      {eq.health}%
                    </span>
                    <span className="text-xs text-gray-400">Health</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                  <div className="flex items-center space-x-1">
                    <Thermometer className="w-3 h-3 text-red-400" />
                    <span>{eq.metrics.temperature}°C</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Battery className="w-3 h-3 text-green-400" />
                    <span>{eq.metrics.fuelLevel.toFixed(0)}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Gauge className="w-3 h-3 text-blue-400" />
                    <span>{eq.metrics.engineRPM} RPM</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Hours: {eq.operatingHours.toFixed(0)}</span>
                  <span>Efficiency: {eq.efficiency}%</span>
                  <span>Next Service: {eq.nextMaintenance}</span>
                </div>
                
                <div className="w-full bg-gray-500 rounded-full h-1 mt-2">
                  <div 
                    className={`h-1 rounded-full ${
                      eq.health >= 90 ? 'bg-green-500' :
                      eq.health >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${eq.health}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Schedule & Predictive Alerts */}
        <div className="space-y-4">
          {/* Maintenance Schedule */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="font-semibold mb-4 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span>Maintenance Schedule</span>
            </h4>
            <div className="space-y-2">
              {maintenanceSchedule.map((item, index) => (
                <div key={index} className="bg-gray-600 rounded p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.equipment}</span>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${getPriorityColor(item.priority)}`}>
                      {item.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{item.type}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Predictive Maintenance Alerts */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="font-semibold mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span>Predictive Alerts</span>
            </h4>
            <div className="space-y-3">
              {predictiveAlerts.map((alert, index) => (
                <div key={index} className="bg-orange-500 bg-opacity-20 border border-orange-500 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-orange-400">{alert.equipment}</span>
                    <span className="text-xs text-orange-300">{alert.confidence}% confidence</span>
                  </div>
                  <div className="text-xs text-orange-300 mb-1">
                    Component: {alert.component}
                  </div>
                  <div className="text-xs text-orange-200 mb-2">
                    {alert.prediction}
                  </div>
                  <div className="text-xs text-orange-400 font-medium">
                    Recommendation: {alert.recommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Critical Equipment Alert */}
      {equipment.some(eq => eq.status === 'critical' || eq.health < 70) && (
        <div className="mt-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
          <div className="flex items-center space-x-2 text-red-400 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">Critical Equipment Alert</span>
          </div>
          <p className="text-red-300 text-sm">
            {equipment.filter(eq => eq.status === 'critical' || eq.health < 70).length} equipment unit(s) 
            require immediate attention. Production may be affected.
          </p>
        </div>
      )}
    </div>
  );
};

export default EquipmentHealth;