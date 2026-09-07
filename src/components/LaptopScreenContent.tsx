import React from 'react';
import { FinancialStats, MonthlyDataPoint, CategoryBreakdown, Language, NavSection } from '../types';
import { formatFCFA } from '../data/initialData';
import { LineChart } from './LineChart';
import { DonutChart } from './DonutChart';
import { 
  LayoutDashboard, 
  WalletCards, 
  BookOpen, 
  Coins, 
  FileBarChart2, 
  Settings, 
  User, 
  ExternalLink 
} from 'lucide-react';

interface LaptopScreenContentProps {
  stats: FinancialStats;
  monthlyData: MonthlyDataPoint[];
  breakdown: CategoryBreakdown[];
  lang: Language;
  onOpenSection?: (section: NavSection) => void;
  onOpenPortal?: () => void;
}

export const LaptopScreenContent: React.FC<LaptopScreenContentProps> = ({
  stats,
  monthlyData,
  breakdown,
  lang,
  onOpenSection,
  onOpenPortal
}) => {
  return (
    <div className="w-full h-full bg-[#f8fafc] text-slate-800 flex flex-col text-[11px] select-none overflow-hidden">
      {/* Laptop App Header */}
      <div className="bg-[#0b3b75] text-white px-3 py-1.5 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-extrabold tracking-tight text-sm text-white font-['Outfit']">SIGEF</span>
          <span className="text-[9px] text-blue-200 hidden sm:inline">Portail Ministériel MCEF</span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-blue-900/60 rounded px-1.5 py-0.5 text-[9px] font-semibold text-blue-200">
            <span className={lang === 'FR' ? 'text-white font-bold' : 'text-blue-300'}>FR</span>
            <span className="mx-1 text-blue-400">|</span>
            <span className={lang === 'EN' ? 'text-white font-bold' : 'text-blue-300'}>EN</span>
          </div>

          <div className="w-5 h-5 rounded-full bg-blue-500/30 border border-blue-400/40 flex items-center justify-center text-white">
            <User className="w-3 h-3" />
          </div>

          <button
            onClick={onOpenPortal}
            className="hidden md:flex items-center gap-1 bg-sky-500 hover:bg-sky-400 text-white text-[9px] font-bold px-2 py-0.5 rounded transition"
            title="Agrandir en plein écran"
          >
            <span>{lang === 'FR' ? 'Agrandir' : 'Expand'}</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* Main Body: Sidebar + Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* PC Sidebar */}
        <div className="w-32 sm:w-36 bg-[#0e3b75] text-blue-100 flex flex-col py-2 px-1.5 shrink-0 border-r border-blue-900/40 text-[10px]">
          <div className="space-y-0.5">
            {/* Tableau de bord - Active */}
            <button
              onClick={() => onOpenSection?.('dashboard')}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md bg-[#2563eb] text-white font-semibold text-left shadow-xs"
            >
              <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{lang === 'FR' ? 'Tableau de bord' : 'Dashboard'}</span>
            </button>

            {/* Budgets */}
            <button
              onClick={() => onOpenSection?.('budgets')}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-blue-200 hover:bg-blue-800/60 hover:text-white transition text-left"
            >
              <WalletCards className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{lang === 'FR' ? 'Budgets' : 'Budgets'}</span>
            </button>

            {/* Comptabilité */}
            <button
              onClick={() => onOpenSection?.('accounting')}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-blue-200 hover:bg-blue-800/60 hover:text-white transition text-left"
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{lang === 'FR' ? 'Comptabilité' : 'Accounting'}</span>
            </button>

            {/* Trésorerie */}
            <button
              onClick={() => onOpenSection?.('treasury')}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-blue-200 hover:bg-blue-800/60 hover:text-white transition text-left"
            >
              <Coins className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{lang === 'FR' ? 'Trésorerie' : 'Treasury'}</span>
            </button>

            {/* Rapports */}
            <button
              onClick={() => onOpenSection?.('reports')}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-blue-200 hover:bg-blue-800/60 hover:text-white transition text-left"
            >
              <FileBarChart2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{lang === 'FR' ? 'Rapports' : 'Reports'}</span>
            </button>

            {/* Paramètres */}
            <button
              onClick={() => onOpenSection?.('settings')}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-blue-200 hover:bg-blue-800/60 hover:text-white transition text-left"
            >
              <Settings className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{lang === 'FR' ? 'Paramètres' : 'Settings'}</span>
            </button>
          </div>

          <div className="mt-auto pt-2 border-t border-blue-900/50 px-1 text-[8px] text-blue-300">
            <span>MCEF Cloud v2.4</span>
          </div>
        </div>

        {/* Dashboard Main View */}
        <div className="flex-1 p-2.5 overflow-y-auto custom-scrollbar flex flex-col gap-2.5">
          {/* Header Title */}
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-[#0e3b75] text-xs sm:text-sm font-['Outfit']">
              {lang === 'FR' ? 'Tableau de bord' : 'Dashboard'}
            </h3>
            <span className="text-[9px] bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded font-mono">
              Exercice 2025
            </span>
          </div>

          {/* 3 Main KPIs */}
          <div className="grid grid-cols-3 gap-2">
            {/* Solde disponible */}
            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-[9px] text-slate-500 block font-medium">
                {lang === 'FR' ? 'Solde disponible' : 'Available balance'}
              </span>
              <span className="text-xs sm:text-[13px] font-black text-[#0e3b75] font-mono block mt-0.5">
                {formatFCFA(stats.soldeDisponible)}
              </span>
            </div>

            {/* Dépenses du mois */}
            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-[9px] text-slate-500 block font-medium">
                {lang === 'FR' ? 'Dépenses du mois' : 'Monthly expenses'}
              </span>
              <span className="text-xs sm:text-[13px] font-black text-sky-700 font-mono block mt-0.5">
                {formatFCFA(stats.depensesMois)}
              </span>
            </div>

            {/* Recettes du mois */}
            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-[9px] text-slate-500 block font-medium">
                {lang === 'FR' ? 'Recettes du mois' : 'Monthly revenue'}
              </span>
              <span className="text-xs sm:text-[13px] font-black text-blue-600 font-mono block mt-0.5">
                {formatFCFA(stats.recettesMois)}
              </span>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1 items-start">
            {/* Évolution des transactions */}
            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-slate-800">
                  {lang === 'FR' ? 'Évolution des transactions' : 'Transactions trend'}
                </span>
                <span className="text-[8px] text-slate-400 font-mono">0 - 100M</span>
              </div>
              <LineChart data={monthlyData} compact={false} height={125} />
            </div>

            {/* Répartition par type */}
            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-slate-800">
                  {lang === 'FR' ? 'Répartition par type' : 'Breakdown by type'}
                </span>
                <span className="text-[8px] text-slate-400 font-mono">100%</span>
              </div>
              <DonutChart data={breakdown} compact={false} size={115} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
