import React, { useState } from 'react';
import { CategoryBreakdown } from '../types';
import { formatFCFA } from '../data/initialData';

interface DonutChartProps {
  data: CategoryBreakdown[];
  compact?: boolean;
  size?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({ data, compact = false, size = 160 }) => {
  const [hoveredCategory, setHoveredCategory] = useState<CategoryBreakdown | null>(null);

  const radius = size * 0.42;
  const strokeWidth = compact ? 22 : 28;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  // Compute total
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  let accumulatedPercent = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full select-none" id="donut-distribution-chart">
      {/* SVG Donut Circle */}
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full transform -rotate-90">
          {data.map((item) => {
            const percent = (item.amount / total) * 100;
            const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
            accumulatedPercent += percent;

            const isHovered = hoveredCategory?.label === item.label;

            return (
              <circle
                key={item.label}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredCategory(item)}
                onMouseLeave={() => setHoveredCategory(null)}
              />
            );
          })}
        </svg>

        {/* Center overlay label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          {hoveredCategory ? (
            <div className="px-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none">
                {hoveredCategory.label}
              </span>
              <span className="text-xs font-black text-slate-800 font-mono mt-0.5">
                {hoveredCategory.percentage}%
              </span>
            </div>
          ) : (
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider leading-tight">
                Total
              </span>
              <span className="text-[11px] font-bold text-slate-700 font-mono">
                100%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-1.5 min-w-[110px] text-left">
        {data.map((item) => {
          const isHovered = hoveredCategory?.label === item.label;
          return (
            <div
              key={item.label}
              className={`flex items-center gap-2 cursor-pointer py-0.5 px-1 rounded transition-colors ${
                isHovered ? 'bg-slate-100 font-bold' : 'text-slate-600 font-medium'
              }`}
              onMouseEnter={() => setHoveredCategory(item)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[11px] md:text-xs leading-none">
                {item.label}
              </span>
              <span className="text-[10px] text-slate-400 ml-auto font-mono">
                {item.percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
