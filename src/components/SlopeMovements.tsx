import React, { useRef, useEffect } from 'react';
import { TrendingUp, Activity, Zap } from 'lucide-react';
import type { SensorData } from '../types';

interface SlopeMovementsProps {
  sensorData: SensorData[];
}

const SlopeMovements: React.FC<SlopeMovementsProps> = ({ sensorData }) => {
  const crackWidthRef = useRef<HTMLCanvasElement>(null);
  const tiltAngleRef = useRef<HTMLCanvasElement>(null);
  const vibrationRef = useRef<HTMLCanvasElement>(null);

  const drawChart = (canvas: HTMLCanvasElement, data: number[], color: string) => {
    const ctx = canvas.getContext('2d');
    if (!ctx || data.length === 0) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = 'rgba(55, 65, 81, 1)';
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Data line
    if (data.length > 1) {
      const stepX = width / (data.length - 1);
      const maxValue = Math.max(...data);
      const minValue = Math.min(...data);
      const range = maxValue - minValue || 1;

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();

      data.forEach((value, index) => {
        const x = index * stepX;
        const normalizedValue = (value - minValue) / range;
        const y = height - (normalizedValue * height);
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();
    }
  };

  useEffect(() => {
    if (sensorData.length === 0) return;

    const crackWidthData = sensorData.map(d => d.crackWidth);
    const tiltAngleData = sensorData.map(d => d.tiltAngle);
    const vibrationData = sensorData.map(d => d.vibrationLevel);

    if (crackWidthRef.current) {
      drawChart(crackWidthRef.current, crackWidthData, '#ef4444');
    }
    if (tiltAngleRef.current) {
      drawChart(tiltAngleRef.current, tiltAngleData, '#f59e0b');
    }
    if (vibrationRef.current) {
      drawChart(vibrationRef.current, vibrationData, '#3b82f6');
    }
  }, [sensorData]);

  const getLatestValue = (field: keyof SensorData) => {
    if (sensorData.length === 0) return 0;
    return sensorData[sensorData.length - 1][field];
  };

  const sensors = [
    {
      title: 'Crack Width',
      value: getLatestValue('crackWidth'),
      unit: 'mm',
      icon: TrendingUp,
      color: 'text-red-400',
      canvasRef: crackWidthRef
    },
    {
      title: 'Tilt Angle',
      value: getLatestValue('tiltAngle'),
      unit: 'degrees',
      icon: Activity,
      color: 'text-yellow-400',
      canvasRef: tiltAngleRef
    },
    {
      title: 'Vibration Level',
      value: getLatestValue('vibrationLevel'),
      unit: 'Hz',
      icon: Zap,
      color: 'text-blue-400',
      canvasRef: vibrationRef
    }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Slope Movements</h3>
        <div className="text-sm text-gray-400 flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>AI prediction active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sensors.map((sensor, index) => {
          const Icon = sensor.icon;
          return (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-4 h-4 ${sensor.color}`} />
                  <span className="text-sm font-medium">{sensor.title}</span>
                </div>
                <span className={`text-lg font-bold ${sensor.color}`}>
                  {typeof sensor.value === 'number' ? sensor.value.toFixed(1) : sensor.value}{sensor.unit}
                </span>
              </div>
              
              <canvas
                ref={sensor.canvasRef}
                width={200}
                height={80}
                className="w-full h-16 rounded"
              />
            </div>
          );
        })}
      </div>

      {/* Prediction Summary */}
      <div className="mt-4 p-3 bg-blue-500 bg-opacity-20 border border-blue-500 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-blue-400 text-sm font-medium">ML Prediction Model Active</div>
            <div className="text-blue-300 text-xs mt-1">
              Analyzing slope stability patterns. Next prediction update in 45s.
            </div>
          </div>
          <div className="text-blue-400 text-xs">
            Accuracy: 94.2%
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlopeMovements;