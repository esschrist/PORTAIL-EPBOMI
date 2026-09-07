import React, { useState } from 'react';
import { FinancialStats, MonthlyDataPoint, CategoryBreakdown, Transaction, Language, NavSection } from '../types';
import { TabletScreenContent } from './TabletScreenContent';
import { LaptopScreenContent } from './LaptopScreenContent';
import { PhoneScreenContent } from './PhoneScreenContent';
import { Maximize2, Sparkles, CheckCircle, RefreshCw, ZoomIn } from 'lucide-react';

interface DeviceMockupShowcaseProps {
  stats: FinancialStats;
  monthlyData: MonthlyDataPoint[];
  breakdown: CategoryBreakdown[];
  transactions: Transaction[];
  lang: Language;
  onOpenPortal: () => void;
  onSelectSection: (section: NavSection) => void;
}

export const DeviceMockupShowcase: React.FC<DeviceMockupShowcaseProps> = ({
  stats,
  monthlyData,
  breakdown,
  transactions,
  lang,
  onOpenPortal,
  onSelectSection,
}) => {
  const [selectedDevice, setSelectedDevice] = useState<'all' | 'tablet' | 'laptop' | 'phone'>('all');

  return (
    <div className="w-full relative py-6 md:py-10" id="device-showcase-container">
      {/* Device Filter / Focus Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-2">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-700">
            {lang === 'FR' 
              ? 'Synchronisation active : La tablette affiche les mêmes données que le PC central' 
              : 'Active sync: Tablet displays the same data as the central PC'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => setSelectedDevice('all')}
            className={`px-2.5 py-1 rounded-md transition ${selectedDevice === 'all' ? 'bg-white text-blue-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            {lang === 'FR' ? 'Vue 3 Écrans (Affiche)' : '3 Screens (Poster)'}
          </button>
          <button
            onClick={() => setSelectedDevice('tablet')}
            className={`px-2.5 py-1 rounded-md transition ${selectedDevice === 'tablet' ? 'bg-white text-blue-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Tablette
          </button>
          <button
            onClick={() => setSelectedDevice('laptop')}
            className={`px-2.5 py-1 rounded-md transition ${selectedDevice === 'laptop' ? 'bg-white text-blue-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            PC Portable
          </button>
          <button
            onClick={() => setSelectedDevice('phone')}
            className={`px-2.5 py-1 rounded-md transition ${selectedDevice === 'phone' ? 'bg-white text-blue-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Smartphone
          </button>
        </div>
      </div>

      {/* Main Showcase Stage */}
      <div className="relative min-h-[460px] md:min-h-[540px] flex items-end justify-center px-2 sm:px-4">
        {/* Soft floor reflection shadow */}
        <div className="absolute bottom-2 inset-x-8 h-12 bg-gradient-to-t from-slate-300/40 to-transparent blur-xl rounded-[50%] pointer-events-none" />

        {/* 1. TABLET MOCKUP (LEFT) */}
        <div
          className={`transition-all duration-300 z-20 ${
            selectedDevice === 'tablet'
              ? 'scale-110 md:scale-125 z-40 mx-auto'
              : selectedDevice !== 'all'
              ? 'opacity-30 scale-95 pointer-events-none hidden md:block'
              : 'relative -mr-6 sm:-mr-10 md:-mr-12 mb-4 md:mb-6 shrink-0'
          }`}
          style={{ width: 'clamp(210px, 25vw, 290px)' }}
        >
          {/* Tablet Frame */}
          <div className="relative bg-[#1a1c23] p-2 sm:p-2.5 rounded-[22px] sm:rounded-[26px] shadow-[0_20px_45px_-12px_rgba(15,23,42,0.35)] border-2 border-slate-700/80 ring-1 ring-white/20 group">
            {/* Tablet Camera */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-800 border border-slate-700 z-30" />

            {/* Tablet Screen */}
            <div className="relative w-full aspect-[3/4.1] bg-white rounded-[16px] sm:rounded-[18px] overflow-hidden shadow-inner">
              <TabletScreenContent
                stats={stats}
                monthlyData={monthlyData}
                breakdown={breakdown}
                transactions={transactions}
                lang={lang}
                onOpenPortal={onOpenPortal}
              />
            </div>

            {/* Focus indicator tooltip */}
            <button
              onClick={() => setSelectedDevice(selectedDevice === 'tablet' ? 'all' : 'tablet')}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0b3b75] text-white text-[10px] px-2.5 py-0.5 rounded-full shadow-md font-semibold opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-30"
            >
              {selectedDevice === 'tablet' ? 'Réduire' : 'Agrandir Tablette'}
            </button>
          </div>
        </div>

        {/* 2. LAPTOP MOCKUP (CENTER) */}
        <div
          className={`transition-all duration-300 z-30 ${
            selectedDevice === 'laptop'
              ? 'scale-110 md:scale-120 z-40 mx-auto'
              : selectedDevice !== 'all'
              ? 'opacity-30 scale-95 pointer-events-none hidden md:block'
              : 'relative w-full max-w-[480px] sm:max-w-[560px] md:max-w-[620px] shrink-0'
          }`}
        >
          {/* Laptop Screen Bezel */}
          <div className="relative bg-[#0f172a] p-2.5 sm:p-3 pb-1 rounded-t-[14px] sm:rounded-t-[18px] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.45)] border-t-2 border-x-2 border-slate-700/60 ring-1 ring-white/10 group">
            {/* Laptop Camera Dot */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-30">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-700" />
              <div className="w-0.5 h-0.5 rounded-full bg-emerald-500/80" />
            </div>

            {/* Laptop Display */}
            <div className="relative w-full aspect-[16/10.5] bg-white rounded-t-[8px] overflow-hidden shadow-inner">
              <LaptopScreenContent
                stats={stats}
                monthlyData={monthlyData}
                breakdown={breakdown}
                lang={lang}
                onOpenSection={onSelectSection}
                onOpenPortal={onOpenPortal}
              />
            </div>

            {/* Focus indicator tooltip */}
            <button
              onClick={() => setSelectedDevice(selectedDevice === 'laptop' ? 'all' : 'laptop')}
              className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0b3b75] text-white text-[10px] px-2.5 py-0.5 rounded-full shadow-md font-semibold opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-30"
            >
              {selectedDevice === 'laptop' ? 'Réduire' : 'Agrandir PC'}
            </button>
          </div>

          {/* Laptop Aluminum Base & Keyboard Deck */}
          <div className="relative bg-gradient-to-b from-[#e2e8f0] via-[#cbd5e1] to-[#94a3b8] h-3.5 sm:h-4.5 rounded-b-[10px] sm:rounded-b-[14px] shadow-[0_12px_25px_rgba(0,0,0,0.25)] border-t border-slate-300 px-4 flex items-center justify-center">
            {/* Opening indent */}
            <div className="w-16 sm:w-20 h-1 bg-slate-400/80 rounded-full shadow-inner" />
          </div>
          {/* Laptop Base Bottom Lip */}
          <div className="h-1.5 bg-[#64748b] mx-4 sm:mx-6 rounded-b-[6px] shadow-md" />
        </div>

        {/* 3. SMARTPHONE MOCKUP (RIGHT) */}
        <div
          className={`transition-all duration-300 z-20 ${
            selectedDevice === 'phone'
              ? 'scale-110 md:scale-135 z-40 mx-auto'
              : selectedDevice !== 'all'
              ? 'opacity-30 scale-95 pointer-events-none hidden md:block'
              : 'relative -ml-6 sm:-ml-10 md:-ml-12 mb-2 md:mb-4 shrink-0'
          }`}
          style={{ width: 'clamp(140px, 16vw, 190px)' }}
        >
          {/* Phone Frame */}
          <div className="relative bg-[#111827] p-1.5 sm:p-2 rounded-[24px] sm:rounded-[28px] shadow-[0_20px_45px_-10px_rgba(15,23,42,0.35)] border-2 border-slate-700/80 ring-1 ring-white/20 group">
            {/* Dynamic Island / Speaker Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-black rounded-full z-30 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800 ml-auto mr-1" />
            </div>

            {/* Phone Screen */}
            <div className="relative w-full aspect-[9/18.5] bg-white rounded-[18px] sm:rounded-[22px] overflow-hidden shadow-inner pt-2">
              <PhoneScreenContent
                stats={stats}
                transactions={transactions}
                lang={lang}
                onOpenSection={onSelectSection}
                onOpenPortal={onOpenPortal}
              />
            </div>

            {/* Focus indicator tooltip */}
            <button
              onClick={() => setSelectedDevice(selectedDevice === 'phone' ? 'all' : 'phone')}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0b3b75] text-white text-[10px] px-2.5 py-0.5 rounded-full shadow-md font-semibold opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-30"
            >
              {selectedDevice === 'phone' ? 'Réduire' : 'Agrandir Mobile'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
