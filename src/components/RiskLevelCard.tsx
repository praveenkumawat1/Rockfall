import React from 'react';
import { AlertTriangle, TrendingUp, Activity, Thermometer, Zap } from 'lucide-react';
import RiskChart from './RiskChart';
import type { RiskFactors } from '../types';

interface RiskLevelCardProps {
  riskLevel: number;
  riskFactors: RiskFactors;
  motionScore: number;
}

const RiskLevelCard: React.FC<RiskLevelCardProps> = ({ riskLevel, riskFactors, motionScore }) => {
  const getRiskColor = (level: number) => {
    if (level >= 70) return 'text-red-500';
    if (level >= 40) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getRiskLabel = (level: number) => {
    if (level >= 70) return 'High Risk';
    if (level >= 40) return 'Medium Risk';
    return 'Low Risk';
  };

  const getRiskBgColor = (level: number) => {
    if (level >= 70) return 'bg-red-500';
    if (level >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Video simulation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Live Site Monitoring</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-red-400">RECORDING</span>
            </div>
          </div>
          <div className="relative bg-gray-700 rounded-lg overflow-hidden aspect-video">
            <div className="relative w-full h-full">
              <img 
                src="https://images.pexels.com/photos/162553/mining-excavator-coal-mining-bucket-wheel-excavators-162553.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Mining Site"
                className="w-full h-full object-cover brightness-90"
              />
              
              {/* Real-time overlay grid */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-30">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-green-500 border-opacity-30"></div>
                ))}
              </div>
              
              {/* Motion detection zones */}
              {motionScore > 15 && (
                <>
                  <div className="absolute top-1/4 left-1/3 w-16 h-16 border-2 border-red-500 animate-pulse rounded"></div>
                  <div className="absolute top-1/2 right-1/4 w-12 h-12 border-2 border-yellow-500 animate-pulse rounded"></div>
                </>
              )}
              
              {/* Risk heat zones */}
              {riskLevel > 50 && (
                <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-red-500 bg-opacity-20 border border-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
            
            {/* Real-time overlay effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            {/* Motion detection overlay */}
            {motionScore > 15 && (
              <div className="absolute inset-0 border-2 border-red-500 animate-pulse"></div>
            )}
            
            <div className="absolute top-4 right-4">
              <div className="space-y-1">
                <div className="bg-black bg-opacity-75 rounded px-2 py-1 text-sm">
                  <span className="text-green-400 animate-pulse">● LIVE</span>
                </div>
                <div className="bg-black bg-opacity-75 rounded px-2 py-1 text-xs">
                  <span className="text-blue-400">4K Ultra HD</span>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 space-y-2">
              <div className="bg-black bg-opacity-75 rounded px-2 py-1 text-xs">
                Motion: <span className="text-orange-400">{motionScore.toFixed(1)}/30</span>
              </div>
              <div className="bg-black bg-opacity-75 rounded px-2 py-1 text-xs">
                AI Processing: <span className="text-green-400">{(Math.random() * 50 + 50).toFixed(1)}ms</span>
              </div>
              <div className="bg-black bg-opacity-75 rounded px-2 py-1 text-xs">
                Objects: <span className="text-blue-400">{Math.floor(Math.random() * 5 + 3)}</span>
              </div>
              <div className="bg-black bg-opacity-75 rounded px-2 py-1 text-xs">
                Temp: <span className="text-yellow-400">{(22 + Math.random() * 8).toFixed(1)}°C</span>
              </div>
            </div>
            
            {/* Risk Level Indicators */}
            <div className="absolute top-4 left-4">
              <div className="bg-black bg-opacity-75 rounded-lg p-2 space-y-1">
                <div className="text-xs text-gray-400">Detection Status</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Motion Tracking</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>Object Detection</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span>Risk Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Risk level and factors */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Current Risk Level</h3>
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          </div>
          
          <div className="text-center space-y-2">
            <div className={`text-6xl font-bold ${getRiskColor(riskLevel)}`}>
              {Math.round(riskLevel)}%
            </div>
            <div className={`inline-block px-4 py-2 rounded-full text-white text-sm font-medium ${getRiskBgColor(riskLevel)}`}>
              {getRiskLabel(riskLevel)}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-300">Key Risk Factors</h4>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-red-500" />
                  <span className="text-sm">Slope Movement</span>
                </div>
                <span className="text-red-500 font-medium">{Math.round(riskFactors.slopeMovement)}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">Seismic Impact</span>
                </div>
                <span className="text-yellow-500 font-medium">{Math.round(riskFactors.seismicEvent)}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Weather Impact</span>
                </div>
                <span className="text-blue-500 font-medium">{Math.round(riskFactors.weatherImpact)}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">Vibration Level</span>
                </div>
                <span className="text-orange-500 font-medium">{Math.round(riskFactors.vibrationLevel)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <RiskChart riskLevel={riskLevel} />
    </div>
  );
};

export default RiskLevelCard;