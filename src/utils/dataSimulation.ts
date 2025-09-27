import type { SensorData, RiskCalculation, RiskFactors } from '../types';

// Simulate computer vision motion detection
export const detectMotion = (): number => {
  // Simulate OpenCV-like motion detection with realistic fluctuations
  const baseMotion = Math.random() * 8; // Base motion score 0-8
  const spikes = Math.random() < 0.15 ? Math.random() * 25 : 0; // More frequent spikes
  const timeVariation = Math.sin(Date.now() / 10000) * 5; // Time-based variation
  return Math.min(Math.max(baseMotion + spikes + timeVariation, 0), 30); // Cap at 30
};

// Generate realistic IoT sensor data
export const generateSensorData = (): SensorData => {
  const now = Date.now();
  
  // Simulate realistic sensor readings with some noise and trends
  return {
    timestamp: now,
    temperature: 20 + Math.random() * 15, // 20-35°C
    vibrationLevel: Math.random() * 100, // 0-100 Hz
    crackWidth: 0.1 + Math.random() * 5, // 0.1-5.1 mm
    tiltAngle: Math.random() * 0.5, // 0-0.5 degrees
    seismicActivity: Math.random() * 10, // 0-10 magnitude
    moistureLevel: 30 + Math.random() * 40 // 30-70%
  };
};

// ML-based risk calculation (simplified rule-based for demo)
export const calculateRiskScore = (sensorData: SensorData, motionScore: number): RiskCalculation => {
  // Risk factors calculation based on thresholds
  const slopeMovement = Math.min((sensorData.crackWidth / 5) * 100, 100); // Higher crack width = higher risk
  const seismicEvent = Math.min(sensorData.seismicActivity * 10, 100); // Seismic activity impact
  const weatherImpact = Math.min(sensorData.moistureLevel * 1.2, 100); // Moisture impact on stability
  const vibrationLevel = Math.min(sensorData.vibrationLevel * 0.8, 100); // Vibration impact
  
  // Motion detection impact (from computer vision)
  const motionImpact = motionScore * 2; // Motion score multiplier
  
  // Combine all factors with weights
  const weights = {
    slope: 0.3,
    seismic: 0.25,
    weather: 0.2,
    vibration: 0.15,
    motion: 0.1
  };
  
  const totalRisk = Math.min(
    slopeMovement * weights.slope +
    seismicEvent * weights.seismic +
    weatherImpact * weights.weather +
    vibrationLevel * weights.vibration +
    motionImpact * weights.motion,
    100
  );
  
  return {
    totalRisk,
    factors: {
      slopeMovement,
      seismicEvent,
      weatherImpact,
      vibrationLevel
    }
  };
};

// Explainable AI - provide reasoning for risk scores
export const explainRiskFactors = (riskCalculation: RiskCalculation): string[] => {
  const explanations: string[] = [];
  
  if (riskCalculation.factors.slopeMovement > 70) {
    explanations.push("Significant slope movement detected through crack width analysis");
  }
  
  if (riskCalculation.factors.seismicEvent > 50) {
    explanations.push("Elevated seismic activity may destabilize rock formations");
  }
  
  if (riskCalculation.factors.weatherImpact > 60) {
    explanations.push("High moisture levels increase slope instability risk");
  }
  
  if (riskCalculation.factors.vibrationLevel > 80) {
    explanations.push("Excessive vibrations from equipment operation detected");
  }
  
  return explanations;
};

// Simulate edge computing constraints (lightweight model)
export const processEdgeData = (data: SensorData): { processed: boolean; latency: number } => {
  // Simulate edge processing with realistic latency
  const processingTime = 50 + Math.random() * 200; // 50-250ms processing time
  
  return {
    processed: true,
    latency: processingTime
  };
};