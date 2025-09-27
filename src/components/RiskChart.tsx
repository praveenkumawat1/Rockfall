import React, { useEffect, useRef, useState } from 'react';

interface RiskChartProps {
  riskLevel: number;
}

const RiskChart: React.FC<RiskChartProps> = ({ riskLevel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataPoints, setDataPoints] = useState<number[]>([]);

  useEffect(() => {
    setDataPoints(prev => [...prev.slice(-50), riskLevel]);
  }, [riskLevel]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dataPoints.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Risk threshold lines
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)'; // Red for high risk (70%)
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    const highRiskY = height - (70 / 100) * height;
    ctx.beginPath();
    ctx.moveTo(0, highRiskY);
    ctx.lineTo(width, highRiskY);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(234, 179, 8, 0.5)'; // Yellow for medium risk (40%)
    const mediumRiskY = height - (40 / 100) * height;
    ctx.beginPath();
    ctx.moveTo(0, mediumRiskY);
    ctx.lineTo(width, mediumRiskY);
    ctx.stroke();

    ctx.setLineDash([]);

    // Risk trend line
    if (dataPoints.length > 1) {
      const stepX = width / (dataPoints.length - 1);
      
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      dataPoints.forEach((point, index) => {
        const x = index * stepX;
        const y = height - (point / 100) * height;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();

      // Data points
      ctx.fillStyle = '#3b82f6';
      dataPoints.forEach((point, index) => {
        const x = index * stepX;
        const y = height - (point / 100) * height;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    // Risk level labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '12px Arial';
    ctx.fillText('High (70%)', 10, highRiskY - 5);
    ctx.fillText('Medium (40%)', 10, mediumRiskY - 5);
    ctx.fillText('Low (0%)', 10, height - 5);

  }, [dataPoints]);

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-300">Risk Trend Analysis</h4>
      <div className="bg-gray-700 rounded-lg p-4">
        <canvas
          ref={canvasRef}
          width={800}
          height={200}
          className="w-full h-32"
          style={{ maxHeight: '200px' }}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Past</span>
          <span>Current: {Math.round(riskLevel)}%</span>
          <span>Real-time</span>
        </div>
      </div>
    </div>
  );
};

export default RiskChart;