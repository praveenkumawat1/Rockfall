export interface SensorData {
  timestamp: number;
  temperature: number;
  vibrationLevel: number;
  crackWidth: number;
  tiltAngle: number;
  seismicActivity: number;
  moistureLevel: number;
}

export interface RiskFactors {
  slopeMovement: number;
  seismicEvent: number;
  weatherImpact: number;
  vibrationLevel: number;
}

export interface RiskCalculation {
  totalRisk: number;
  factors: RiskFactors;
}