import React, { useState, useEffect, useRef } from 'react';
import { 
  Mountain, 
  Layers, 
  Compass, 
  Zap, 
  Thermometer, 
  Droplets, 
  Wind,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Eye,
  Target
} from 'lucide-react';
import type { SensorData } from '../types';

interface GeologicalAnalysisProps {
  sensorData: SensorData[];
}

const GeologicalAnalysis: React.FC<GeologicalAnalysisProps> = ({ sensorData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [geologicalData, setGeologicalData] = useState({
    rockType: 'Sedimentary Limestone',
    hardness: 6.2,
    porosity: 15.8,
    density: 2.65,
    weatheringRate: 2.3,
    fractureIndex: 0.42,
    stabilityIndex: 78.5,
    groundwaterLevel: 12.5,
    soilMoisture: 28.7,
    phLevel: 7.2
  });

  const [stratigraphicLayers, setStratigraphicLayers] = useState([
    { depth: '0-5m', type: 'Topsoil & Vegetation', stability: 45, color: '#8B4513' },
    { depth: '5-15m', type: 'Weathered Rock', stability: 62, color: '#A0522D' },
    { depth: '15-30m', type: 'Fractured Limestone', stability: 78, color: '#D2B48C' },
    { depth: '30-50m', type: 'Solid Bedrock', stability: 92, color: '#696969' },
    { depth: '50m+', type: 'Deep Bedrock', stability: 98, color: '#2F4F4F' }
  ]);

  const [seismicData, setSeismicData] = useState({
    pWaveVelocity: 4200,
    sWaveVelocity: 2400,
    elasticModulus: 45.2,
    poissonRatio: 0.28,
    shearStrength: 12.8,
    compressionStrength: 85.6,
    tensileStrength: 8.4
  });

  const [mineralComposition, setMineralComposition] = useState([
    { mineral: 'Calcite', percentage: 65, stability: 'High' },
    { mineral: 'Quartz', percentage: 20, stability: 'Very High' },
    { mineral: 'Clay Minerals', percentage: 10, stability: 'Low' },
    { mineral: 'Iron Oxides', percentage: 3, stability: 'Medium' },
    { mineral: 'Other', percentage: 2, stability: 'Variable' }
  ]);

  const [structuralFeatures, setStructuralFeatures] = useState({
    joints: { count: 15, orientation: 'N45°E', spacing: '0.5-2m' },
    faults: { count: 2, type: 'Normal', displacement: '0.2m' },
    bedding: { dip: '15°', strike: 'N30°W', thickness: '2-5m' },
    fractures: { density: 'Medium', aperture: '1-5mm', filling: 'Calcite' }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Update geological data with realistic variations
      setGeologicalData(prev => ({
        ...prev,
        hardness: Math.max(5.5, Math.min(7.0, prev.hardness + (Math.random() - 0.5) * 0.1)),
        porosity: Math.max(12, Math.min(20, prev.porosity + (Math.random() - 0.5) * 0.5)),
        weatheringRate: Math.max(1.5, Math.min(3.5, prev.weatheringRate + (Math.random() - 0.5) * 0.2)),
        fractureIndex: Math.max(0.3, Math.min(0.6, prev.fractureIndex + (Math.random() - 0.5) * 0.02)),
        stabilityIndex: Math.max(70, Math.min(85, prev.stabilityIndex + (Math.random() - 0.5) * 2)),
        groundwaterLevel: Math.max(10, Math.min(15, prev.groundwaterLevel + (Math.random() - 0.5) * 0.3)),
        soilMoisture: Math.max(20, Math.min(40, prev.soilMoisture + (Math.random() - 0.5) * 1.5))
      }));

      // Update seismic properties
      setSeismicData(prev => ({
        ...prev,
        pWaveVelocity: Math.max(4000, Math.min(4500, prev.pWaveVelocity + (Math.random() - 0.5) * 50)),
        sWaveVelocity: Math.max(2200, Math.min(2600, prev.sWaveVelocity + (Math.random() - 0.5) * 30)),
        shearStrength: Math.max(10, Math.min(15, prev.shearStrength + (Math.random() - 0.5) * 0.5))
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Draw geological cross-section
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // Draw stratigraphic layers
    let currentY = 0;
    const layerHeight = height / stratigraphicLayers.length;

    stratigraphicLayers.forEach((layer, index) => {
      ctx.fillStyle = layer.color;
      ctx.fillRect(0, currentY, width, layerHeight);
      
      // Add texture/pattern
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * width, currentY + Math.random() * layerHeight);
        ctx.lineTo(Math.random() * width, currentY + Math.random() * layerHeight);
        ctx.stroke();
      }
      
      // Layer labels
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.fillText(layer.type, 10, currentY + layerHeight / 2);
      ctx.fillText(`${layer.depth}`, 10, currentY + layerHeight / 2 + 15);
      
      currentY += layerHeight;
    });

    // Draw structural features
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    // Draw joints
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(width * 0.2 + i * width * 0.3, 0);
      ctx.lineTo(width * 0.15 + i * width * 0.3, height);
      ctx.stroke();
    }
    
    ctx.setLineDash([]);
  }, [stratigraphicLayers]);

  const getStabilityColor = (stability: number) => {
    if (stability >= 90) return 'text-green-400';
    if (stability >= 70) return 'text-yellow-400';
    if (stability >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  const getMineralStabilityColor = (stability: string) => {
    switch (stability) {
      case 'Very High': return 'text-green-400';
      case 'High': return 'text-green-300';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Mountain className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-semibold">Advanced Geological Analysis</h3>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-400">
            Last Survey: {new Date().toLocaleDateString()}
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Geological Properties */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-semibold mb-4 flex items-center space-x-2">
            <Layers className="w-5 h-5 text-blue-500" />
            <span>Rock Properties</span>
          </h4>
          <div className="space-y-3">
            <div className="bg-gray-600 rounded p-3">
              <div className="text-sm font-medium mb-2">Primary Rock Type</div>
              <div className="text-blue-400">{geologicalData.rockType}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-600 rounded p-2">
                <div className="text-xs text-gray-400">Hardness (Mohs)</div>
                <div className="text-white font-medium">{geologicalData.hardness.toFixed(1)}</div>
              </div>
              <div className="bg-gray-600 rounded p-2">
                <div className="text-xs text-gray-400">Porosity (%)</div>
                <div className="text-white font-medium">{geologicalData.porosity.toFixed(1)}</div>
              </div>
              <div className="bg-gray-600 rounded p-2">
                <div className="text-xs text-gray-400">Density (g/cm³)</div>
                <div className="text-white font-medium">{geologicalData.density}</div>
              </div>
              <div className="bg-gray-600 rounded p-2">
                <div className="text-xs text-gray-400">Weathering Rate</div>
                <div className="text-orange-400 font-medium">{geologicalData.weatheringRate.toFixed(1)}</div>
              </div>
            </div>
            
            <div className="bg-gray-600 rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Stability Index</span>
                <span className={`font-bold ${getStabilityColor(geologicalData.stabilityIndex)}`}>
                  {geologicalData.stabilityIndex.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-500 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    geologicalData.stabilityIndex >= 80 ? 'bg-green-500' :
                    geologicalData.stabilityIndex >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${geologicalData.stabilityIndex}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Geological Cross-Section */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-semibold mb-4 flex items-center space-x-2">
            <Compass className="w-5 h-5 text-purple-500" />
            <span>Stratigraphic Profile</span>
          </h4>
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={400}
              height={300}
              className="w-full h-64 rounded border border-gray-600"
            />
            <div className="absolute top-2 right-2 bg-black bg-opacity-75 rounded p-2">
              <div className="text-xs text-gray-300">Cross-Section A-A'</div>
              <div className="text-xs text-green-400">Scale: 1:1000</div>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            {stratigraphicLayers.map((layer, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-3 rounded"
                    style={{ backgroundColor: layer.color }}
                  />
                  <span>{layer.type}</span>
                </div>
                <span className={getStabilityColor(layer.stability)}>
                  {layer.stability}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Seismic & Structural Data */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-semibold mb-4 flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span>Seismic Properties</span>
          </h4>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-600 rounded p-2">
                <div className="text-gray-400">P-Wave Velocity</div>
                <div className="text-blue-400 font-medium">{seismicData.pWaveVelocity} m/s</div>
              </div>
              <div className="bg-gray-600 rounded p-2">
                <div className="text-gray-400">S-Wave Velocity</div>
                <div className="text-green-400 font-medium">{seismicData.sWaveVelocity} m/s</div>
              </div>
              <div className="bg-gray-600 rounded p-2">
                <div className="text-gray-400">Elastic Modulus</div>
                <div className="text-purple-400 font-medium">{seismicData.elasticModulus} GPa</div>
              </div>
              <div className="bg-gray-600 rounded p-2">
                <div className="text-gray-400">Poisson's Ratio</div>
                <div className="text-orange-400 font-medium">{seismicData.poissonRatio}</div>
              </div>
            </div>
            
            <div className="bg-gray-600 rounded p-3">
              <div className="text-sm font-medium mb-2">Strength Parameters</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Shear Strength:</span>
                  <span className="text-red-400">{seismicData.shearStrength.toFixed(1)} MPa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Compression:</span>
                  <span className="text-green-400">{seismicData.compressionStrength} MPa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tensile:</span>
                  <span className="text-yellow-400">{seismicData.tensileStrength} MPa</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-600 rounded p-3">
              <div className="text-sm font-medium mb-2">Structural Features</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Joints:</span>
                  <span className="text-white">{structuralFeatures.joints.count} ({structuralFeatures.joints.orientation})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Faults:</span>
                  <span className="text-red-400">{structuralFeatures.faults.count} {structuralFeatures.faults.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Bedding Dip:</span>
                  <span className="text-blue-400">{structuralFeatures.bedding.dip}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mineral Composition & Environmental Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Mineral Composition */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-semibold mb-4 flex items-center space-x-2">
            <Target className="w-5 h-5 text-cyan-500" />
            <span>Mineral Composition</span>
          </h4>
          <div className="space-y-3">
            {mineralComposition.map((mineral, index) => (
              <div key={index} className="bg-gray-600 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{mineral.mineral}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-bold">{mineral.percentage}%</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      mineral.stability === 'Very High' ? 'bg-green-600' :
                      mineral.stability === 'High' ? 'bg-green-500' :
                      mineral.stability === 'Medium' ? 'bg-yellow-500' :
                      mineral.stability === 'Low' ? 'bg-red-500' : 'bg-gray-500'
                    }`}>
                      {mineral.stability}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-500 rounded-full h-2">
                  <div 
                    className="bg-cyan-500 h-2 rounded-full"
                    style={{ width: `${mineral.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Environmental Factors */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-semibold mb-4 flex items-center space-x-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            <span>Environmental Factors</span>
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-600 rounded p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">Groundwater Level</span>
                </div>
                <div className="text-blue-400 font-bold">{geologicalData.groundwaterLevel.toFixed(1)}m</div>
              </div>
              
              <div className="bg-gray-600 rounded p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Thermometer className="w-4 h-4 text-orange-400" />
                  <span className="text-sm">Soil Moisture</span>
                </div>
                <div className="text-orange-400 font-bold">{geologicalData.soilMoisture.toFixed(1)}%</div>
              </div>
            </div>
            
            <div className="bg-gray-600 rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Fracture Index</span>
                <span className={`font-bold ${
                  geologicalData.fractureIndex < 0.3 ? 'text-green-400' :
                  geologicalData.fractureIndex < 0.5 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {geologicalData.fractureIndex.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-gray-500 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    geologicalData.fractureIndex < 0.3 ? 'bg-green-500' :
                    geologicalData.fractureIndex < 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${geologicalData.fractureIndex * 100}%` }}
                />
              </div>
            </div>
            
            <div className="bg-gray-600 rounded p-3">
              <div className="text-sm font-medium mb-2">Chemical Analysis</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">pH Level:</span>
                  <span className="text-green-400">{geologicalData.phLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Weathering Rate:</span>
                  <span className="text-orange-400">{geologicalData.weatheringRate.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      {geologicalData.stabilityIndex < 75 && (
        <div className="mt-6 p-4 bg-yellow-500 bg-opacity-20 border border-yellow-500 rounded-lg">
          <div className="flex items-center space-x-2 text-yellow-400 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">Geological Risk Assessment</span>
          </div>
          <p className="text-yellow-300 text-sm">
            Current stability index ({geologicalData.stabilityIndex.toFixed(1)}%) indicates increased geological risk. 
            Recommend enhanced monitoring and potential slope stabilization measures.
          </p>
        </div>
      )}
    </div>
  );
};

export default GeologicalAnalysis;