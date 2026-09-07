import React from 'react';
import { FinancialStats, Language, Transaction, NavSection } from '../types';
import { formatFCFA } from '../data/initialData';
import { 
  Menu, 
  ShieldCheck, 
  BookOpen, 
  Coins, 
  FileBarChart2, 
  ArrowUpRight, 
  Wifi, 
  BatteryMedium,
  WalletCards
} from 'lucide-react';

interface PhoneScreenContentProps {
  stats: FinancialStats;
  transactions: Transaction[];
  lang: Language;
  onOpenSection?: (section: NavSection) => void;
  onOpenPortal?: () => void;
}

export const PhoneScreenContent: React.FC<PhoneScreenContentProps> = ({
  stats,
  transactions,
  lang,
  onOpenSection,
  onOpenPortal
}) => {
  return (
    <div className="w-full h-full bg-[#f8fafc] text-slate-800 flex flex-col text-[10px] select-none overflow-y-auto custom-scrollbar">
      {/* Phone Status Bar */}
      <div className="px-3 pt-1 pb-0.5 flex items-center justify-between text-[9px] text-slate-700 font-semibold bg-white">
        <span>16:01</span>
        <div className="flex items-center gap-1">
          <Wifi className="w-2.5 h-2.5" />
          <BatteryMedium className="w-3 h-3" />
        </div>
      </div>

      {/* Header */}
      <div className="bg-white px-3 py-1.5 flex items-center justify-between border-b border-slate-100">
        <span className="font-black text-sm text-[#0b3b75] font-['Outfit']">SIGEF</span>
        <button onClick={onOpenPortal} className="text-slate-600 p-0.5 hover:text-slate-900">
          <Menu className="w-4 h-4" />
        </button>
      </div>

      <div className="p-2 space-y-2">
        {/* Solde disponible Card */}
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[9px] text-slate-500 font-medium block">
            {lang === 'FR' ? 'Solde disponible' : 'Available balance'}
          </span>
          <span className="text-sm font-black text-[#0b3b75] font-mono block mt-0.5">
            {formatFCFA(stats.recettesMois)}
          </span>
          <div className="mt-1 flex items-center justify-between text-[8px] text-slate-400 border-t border-slate-100 pt-1">
            <span>Compte Unique du Trésor</span>
            <span className="text-emerald-600 font-semibold">● Actif</span>
          </div>
        </div>

        {/* Accès rapide */}
        <div>
          <span className="text-[10px] font-bold text-slate-700 block mb-1.5">
            {lang === 'FR' ? 'Accès rapide' : 'Quick access'}
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {/* Budget */}
            <button 
              onClick={() => onOpenSection?.('budgets')}
              className="bg-sky-50/70 hover:bg-sky-100/70 border border-sky-100 p-2 rounded-lg flex flex-col items-center justify-center text-center transition"
            >
              <div className="w-6 h-6 rounded-md bg-sky-500 text-white flex items-center justify-center mb-1">
                <WalletCards className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-bold text-slate-800">Budget</span>
            </button>

            {/* Comptabilité */}
            <button 
              onClick={() => onOpenSection?.('accounting')}
              className="bg-blue-50/70 hover:bg-blue-100/70 border border-blue-100 p-2 rounded-lg flex flex-col items-center justify-center text-center transition"
            >
              <div className="w-6 h-6 rounded-md bg-[#0b3b75] text-white flex items-center justify-center mb-1">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-bold text-slate-800">Comptabilité</span>
            </button>

            {/* Trésorerie */}
            <button 
              onClick={() => onOpenSection?.('treasury')}
              className="bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-100 p-2 rounded-lg flex flex-col items-center justify-center text-center transition"
            >
              <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center mb-1">
                <Coins className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-bold text-slate-800">Trésorerie</span>
            </button>

            {/* Rapports */}
            <button 
              onClick={() => onOpenSection?.('reports')}
              className="bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-100 p-2 rounded-lg flex flex-col items-center justify-center text-center transition"
            >
              <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center mb-1">
                <FileBarChart2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-bold text-slate-800">Rapports</span>
            </button>
          </div>
        </div>

        {/* Dernières opérations on mobile */}
        <div className="bg-white p-2 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] font-bold text-slate-700">Dernier mouvement</span>
            <span className="text-[8px] text-slate-400">12/05</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">
                ↑
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-semibold text-slate-700 leading-tight">Virement entrant</span>
                <span className="text-[7px] text-slate-400">Dotation MCEF</span>
              </div>
            </div>
            <span className="text-[9px] font-bold text-emerald-600 font-mono">+25M</span>
          </div>
        </div>
      </div>
    </div>
  );
};
