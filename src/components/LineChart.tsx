import React, { useState } from 'react';
import { MonthlyDataPoint } from '../types';

interface LineChartProps {
  data: MonthlyDataPoint[];
  compact?: boolean;
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({ data, compact = false, height = 180 }) => {
  const [hoveredPoint, setHoveredPoint] = useState<MonthlyDataPoint | null>(null);

  // Chart coordinate calculations
  const width = 500;
  const paddingLeft = compact ? 35 : 45;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxY = 110; // in Millions
  const yTicks = [0, 25, 50, 75, 100];

  const points = data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (d.valeur / maxY) * chartHeight;
    return { x, y, data: d };
  });

  // Generate SVG path for line
  const pathD = points.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    // Catmull-Rom or standard smooth cubic bezier
    const prev = points[idx - 1];
    const cp1x = prev.x + (curr.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (curr.x - prev.x) / 2;
    const cp2y = curr.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }, '');

  // Generate area path
  const areaD = `${pathD} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;

  return (
    <div className="w-full relative select-none" id="financial-line-chart">
      {hoveredPoint && (
        <div 
          className="absolute z-20 pointer-events-none bg-slate-900/90 text-white text-[11px] px-2.5 py-1.5 rounded-md shadow-lg backdrop-blur-sm -top-2 transform -translate-x-1/2"
          style={{
            left: `${paddingLeft + (data.indexOf(hoveredPoint) / (data.length - 1)) * (100 - (paddingLeft/width*100) - (paddingRight/width*100))}%`
          }}
        >
          <div className="font-bold">{hoveredPoint.month}</div>
          <div className="text-sky-300 font-mono text-[10px]">{(hoveredPoint.valeur * 1000000).toLocaleString('fr-FR')} FCFA</div>
        </div>
      )}

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="lineChartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.32" />
            <stop offset="75%" stopColor="#38bdf8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {yTicks.map((tick) => {
          const y = paddingTop + chartHeight - (tick / maxY) * chartHeight;
          return (
            <g key={tick}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray={tick === 0 ? undefined : "3 3"}
                strokeWidth={tick === 0 ? "1.5" : "1"}
              />
              <text
                x={paddingLeft - 8}
                y={y + 3}
                fill="#94a3b8"
                fontSize={compact ? "9" : "10"}
                textAnchor="end"
                className="font-medium font-mono"
              >
                {tick === 0 ? "0" : `${tick}M`}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={areaD} fill="url(#lineChartGradient)" />

        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke="#1d4ed8"
          strokeWidth={compact ? "2" : "2.6"}
          strokeLinecap="round"
        />

        {/* Interactive points */}
        {points.map((pt, i) => (
          <g key={i} className="cursor-pointer">
            <circle
              cx={pt.x}
              cy={pt.y}
              r={hoveredPoint?.month === pt.data.month ? "5.5" : "3.5"}
              fill="#ffffff"
              stroke="#1d4ed8"
              strokeWidth={hoveredPoint?.month === pt.data.month ? "3" : "2"}
              className="transition-all duration-150"
            />
            {/* Transparent touch/hover target */}
            <circle
              cx={pt.x}
              cy={pt.y}
              r="14"
              fill="transparent"
              onMouseEnter={() => setHoveredPoint(pt.data)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          </g>
        ))}

        {/* X Axis Labels */}
        {points.map((pt, i) => (
          <text
            key={i}
            x={pt.x}
            y={height - 8}
            fill={hoveredPoint?.month === pt.data.month ? "#1d4ed8" : "#64748b"}
            fontSize={compact ? "9" : "10"}
            textAnchor="middle"
            fontWeight={hoveredPoint?.month === pt.data.month ? "700" : "500"}
          >
            {pt.data.shortMonth}
          </text>
        ))}
      </svg>
    </div>
  );
};
