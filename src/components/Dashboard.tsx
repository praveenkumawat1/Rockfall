import React, { useState, useEffect } from 'react';
import RealTimeMetrics from './RealTimeMetrics';
import PredictiveAnalytics from './PredictiveAnalytics';
import EmergencyProtocol from './EmergencyProtocol';
import RiskLevelCard from './RiskLevelCard';
import MonitoringTiers from './MonitoringTiers';
import ActiveAlerts from './ActiveAlerts';
import WeatherForecast from './WeatherForecast';
import LiveAssetTracking from './LiveAssetTracking';
import SlopeMovements from './SlopeMovements';
import ReportsSection from './ReportsSection';
import AdvancedControlCenter from './AdvancedControlCenter';
import GeologicalAnalysis from './GeologicalAnalysis';
import SafetyCompliance from './SafetyCompliance';
import EquipmentHealth from './EquipmentHealth';
import { generateSensorData, calculateRiskScore, detectMotion } from '../utils/dataSimulation';
import type { SensorData, RiskFactors } from '../types';

const Dashboard: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [currentRisk, setCurrentRisk] = useState(0);
  const [riskFactors, setRiskFactors] = useState<RiskFactors>({
    slopeMovement: 0,
    seismicEvent: 0,
    weatherImpact: 0,
    vibrationLevel: 0
  });
  const [motionScore, setMotionScore] = useState(0);

  useEffect(() => {
    // Initialize with some data
    const initialData = Array.from({ length: 20 }, () => generateSensorData());
    setSensorData(initialData);
    
    const interval = setInterval(() => {
      // Simulate real-time data updates
      const newData = generateSensorData();
      setSensorData(prev => [...prev.slice(-50), newData]);
      
      // Simulate motion detection
      const motion = detectMotion();
      setMotionScore(motion);
      
      // Calculate risk score based on sensor data and motion
      const risk = calculateRiskScore(newData, motion);
      setCurrentRisk(risk.totalRisk);
      setRiskFactors(risk.factors);
    }, 1500); // Faster updates for more real-time feel

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6">
        {/* Emergency Protocol Banner */}
        {currentRisk > 70 && <EmergencyProtocol riskLevel={currentRisk} />}

        {/* Real-time Metrics Bar */}
        <RealTimeMetrics sensorData={sensorData} />

        {/* Top Row - Main Risk Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RiskLevelCard 
              riskLevel={currentRisk}
              riskFactors={riskFactors}
              motionScore={motionScore}
            />
          </div>
          <div className="space-y-4">
            <MonitoringTiers />
          </div>
        </div>

        {/* Middle Row - Alerts and Weather */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActiveAlerts riskLevel={currentRisk} />
          <WeatherForecast />
        </div>

        {/* Asset Tracking */}
        <LiveAssetTracking />

        {/* Advanced Control Center */}
        <AdvancedControlCenter riskLevel={currentRisk} />

        {/* Geological Analysis */}
        <GeologicalAnalysis sensorData={sensorData} />

        {/* Equipment Health & Safety */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EquipmentHealth />
          <SafetyCompliance />
        </div>

        {/* Bottom Row - Slope Movements and Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SlopeMovements sensorData={sensorData} />
          <div className="space-y-6">
            <PredictiveAnalytics riskLevel={currentRisk} sensorData={sensorData} />
            <ReportsSection />
          </div>
        </div>
    </div>
  );
};

export default Dashboard;