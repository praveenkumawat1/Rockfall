import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, Target } from 'lucide-react';
import type { SensorData } from '../types';

interface PredictiveAnalyticsProps {
  riskLevel: number;
  sensorData: SensorData[];
}

const PredictiveAnalytics: React.FC<PredictiveAnalyticsProps> = ({ riskLevel, sensorData }) => {
  const [predictions, setPredictions] = useState({
    nextHour: 0,
    next6Hours: 0,
    next24Hours: 0,
    confidence: 0
  });

  const [mlMetrics, setMlMetrics] = useState({
    accuracy: 94.2,
    precision: 91.8,
    recall: 96.5,
    f1Score: 94.1
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate ML predictions based on current risk
      const baseRisk = riskLevel;
      const randomVariation = (Math.random() - 0.5) * 20;
      
      setPredictions({
        nextHour: Math.max(0, Math.min(100, baseRisk + randomVariation * 0.5)),
        next6Hours: Math.max(0, Math.min(100, baseRisk + randomVariation * 0.8)),
        next24Hours: Math.max(0, Math.min(100, baseRisk + randomVariation * 1.2)),
        confidence: Math.random() * 15 + 85 // 85-100%
      });

      // Simulate ML model performance metrics
      setMlMetrics({
        accuracy: Math.random() * 5 + 92,
        precision: Math.random() * 5 + 89,
        recall: Math.random() * 5 + 94,
        f1Score: Math.random() * 5 + 91
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [riskLevel]);

  const getPredictionColor = (risk: number) => {
    if (risk >= 70) return 'text-red-400';
    if (risk >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getPredictionBg = (risk: number) => {
    if (risk >= 70) return 'bg-red-500 bg-opacity-20 border-red-500';
    if (risk >= 40) return 'bg-yellow-500 bg-opacity-20 border-yellow-500';
    return 'bg-green-500 bg-opacity-20 border-green-500';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-semibold">AI Predictive Analytics</h3>
        </div>
        <div className="text-xs text-gray-400">
          Model: RockfallNet v2.1 | Updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Predictions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`border rounded-lg p-4 ${getPredictionBg(predictions.nextHour)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Next Hour</span>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>
          <div className={`text-2xl font-bold ${getPredictionColor(predictions.nextHour)}`}>
            {predictions.nextHour.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400">Risk Probability</div>
        </div>

        <div className={`border rounded-lg p-4 ${getPredictionBg(predictions.next6Hours)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Next 6 Hours</span>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>
          <div className={`text-2xl font-bold ${getPredictionColor(predictions.next6Hours)}`}>
            {predictions.next6Hours.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400">Risk Probability</div>
        </div>

        <div className={`border rounded-lg p-4 ${getPredictionBg(predictions.next24Hours)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Next 24 Hours</span>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>
          <div className={`text-2xl font-bold ${getPredictionColor(predictions.next24Hours)}`}>
            {predictions.next24Hours.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400">Risk Probability</div>
        </div>
      </div>

      {/* Model Performance */}
      <div className="bg-gray-700 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Target className="w-4 h-4 text-blue-500" />
          <h4 className="text-sm font-medium">Model Performance</h4>
          <div className={`px-2 py-1 rounded text-xs ${
            predictions.confidence > 90 ? 'bg-green-600 text-white' : 
            predictions.confidence > 80 ? 'bg-yellow-600 text-white' : 'bg-red-600 text-white'
          }`}>
            {predictions.confidence.toFixed(1)}% Confidence
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="text-center">
            <div className="text-green-400 font-bold">{mlMetrics.accuracy.toFixed(1)}%</div>
            <div className="text-gray-400">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 font-bold">{mlMetrics.precision.toFixed(1)}%</div>
            <div className="text-gray-400">Precision</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-400 font-bold">{mlMetrics.recall.toFixed(1)}%</div>
            <div className="text-gray-400">Recall</div>
          </div>
          <div className="text-center">
            <div className="text-purple-400 font-bold">{mlMetrics.f1Score.toFixed(1)}%</div>
            <div className="text-gray-400">F1-Score</div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      {predictions.next6Hours > 60 && (
        <div className="mt-4 p-3 bg-orange-500 bg-opacity-20 border border-orange-500 rounded-lg">
          <div className="flex items-center space-x-2 text-orange-400 text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-medium">AI Insight</span>
          </div>
          <p className="text-xs text-orange-300 mt-1">
            Machine learning model predicts elevated risk in next 6 hours. Consider implementing preventive measures.
          </p>
        </div>
      )}
    </div>
  );
};

export default PredictiveAnalytics;