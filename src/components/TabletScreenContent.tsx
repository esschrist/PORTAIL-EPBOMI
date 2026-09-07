import React, { useState } from 'react';
import { FinancialStats, MonthlyDataPoint, CategoryBreakdown, Transaction, Language } from '../types';
import { formatFCFA } from '../data/initialData';
import { LineChart } from './LineChart';
import { DonutChart } from './DonutChart';
import { ArrowUpRight, ArrowDownLeft, Users, ReceiptText, Menu, RefreshCw, LayoutDashboard, ListFilter, CheckCircle2 } from 'lucide-react';

interface TabletScreenContentProps {
  stats: FinancialStats;
  monthlyData: MonthlyDataPoint[];
  breakdown: CategoryBreakdown[];
  transactions: Transaction[];
  lang: Language;
  onOpenPortal?: () => void;
}

export const TabletScreenContent: React.FC<TabletScreenContentProps> = ({
  stats,
  monthlyData,
  breakdown,
  transactions,
  lang,
  onOpenPortal
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions'>('dashboard');

  return (
    <div className="w-full h-full bg-[#f8fafc] text-slate-800 flex flex-col text-[11px] select-none overflow-y-auto custom-scrollbar">
      {/* Tablet App Bar */}
      <div className="bg-[#0e3b75] text-white px-3 py-2 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-2">
          <Menu className="w-4 h-4 text-blue-200" />
          <span className="font-extrabold tracking-tight text-sm text-white font-['Outfit']">SIGEF</span>
          <span className="text-[9px] bg-blue-800/80 px-1.5 py-0.5 rounded text-blue-200 uppercase font-semibold">
            Tablette MCEF
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-[9px] font-semibold px-2 py-0.5 rounded-full border border-emerald-400/30">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
            <span>Synchro PC</span>
          </div>
          <button 
            onClick={onOpenPortal}
            className="text-[9px] bg-white/15 hover:bg-white/25 text-white px-2 py-0.5 rounded transition"
            title="Agrandir"
          >
            {lang === 'FR' ? 'Ouvrir' : 'Open'}
          </button>
        </div>
      </div>

      {/* Synchronized Notice Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 px-3 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-blue-900 font-semibold text-[10px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{lang === 'FR' ? 'Mêmes données financières que le PC portable' : 'Same financial data as central laptop'}</span>
        </div>
        <div className="flex items-center gap-1 bg-white border border-blue-200 rounded p-0.5 text-[9px]">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-1.5 py-0.5 rounded font-medium transition ${activeTab === 'dashboard' ? 'bg-[#0e3b75] text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Tableau de bord
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-1.5 py-0.5 rounded font-medium transition ${activeTab === 'transactions' ? 'bg-[#0e3b75] text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Transactions ({transactions.length})
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-2.5 space-y-2.5">
        {activeTab === 'dashboard' ? (
          <>
            {/* Exactly the same 3 KPIs as the PC Portable */}
            <div className="grid grid-cols-3 gap-1.5">
              {/* Solde disponible */}
              <div className="bg-white p-2 rounded-lg border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <span className="text-[9px] text-slate-500 block font-medium truncate">
                  {lang === 'FR' ? 'Solde disponible' : 'Available balance'}
                </span>
                <span className="text-xs font-bold text-[#0e3b75] font-mono block mt-0.5 truncate">
                  {formatFCFA(stats.soldeDisponible)}
                </span>
              </div>

              {/* Dépenses du mois */}
              <div className="bg-white p-2 rounded-lg border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <span className="text-[9px] text-slate-500 block font-medium truncate">
                  {lang === 'FR' ? 'Dépenses du mois' : 'Monthly expenses'}
                </span>
                <span className="text-xs font-bold text-sky-700 font-mono block mt-0.5 truncate">
                  {formatFCFA(stats.depensesMois)}
                </span>
              </div>

              {/* Recettes du mois */}
              <div className="bg-white p-2 rounded-lg border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <span className="text-[9px] text-slate-500 block font-medium truncate">
                  {lang === 'FR' ? 'Recettes du mois' : 'Monthly revenue'}
                </span>
                <span className="text-xs font-bold text-blue-600 font-mono block mt-0.5 truncate">
                  {formatFCFA(stats.recettesMois)}
                </span>
              </div>
            </div>

            {/* Exactly the same 2 Charts as the PC Portable, styled for Tablet */}
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-slate-800">
                  {lang === 'FR' ? 'Évolution des transactions' : 'Transactions trend'}
                </span>
                <span className="text-[9px] text-slate-400 font-mono">Jan - Juil 2025</span>
              </div>
              <LineChart data={monthlyData} compact={true} height={110} />
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-slate-800">
                  {lang === 'FR' ? 'Répartition par type' : 'Breakdown by type'}
                </span>
                <span className="text-[9px] text-blue-600 font-semibold font-mono">MCEF 2025</span>
              </div>
              <DonutChart data={breakdown} compact={true} size={110} />
            </div>

            {/* Mini preview of transactions at the bottom */}
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-800">
                  {lang === 'FR' ? 'Dernières opérations' : 'Recent activities'}
                </span>
                <button
                  onClick={() => setActiveTab('transactions')}
                  className="text-[9px] text-blue-600 font-semibold hover:underline"
                >
                  {lang === 'FR' ? 'Voir tout' : 'View all'}
                </button>
              </div>
              <div className="space-y-1.5">
                {transactions.slice(0, 2).map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        tx.amount > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {tx.amount > 0 ? '↑' : '↓'}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-slate-700 leading-tight">{tx.title}</span>
                        <span className="text-[8px] text-slate-400">{tx.date}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold font-mono ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {tx.amount > 0 ? '+' : ''}{formatFCFA(tx.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Transactions View (As shown in original image, for complete fidelity) */
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                {lang === 'FR' ? 'Transactions récentes' : 'Recent transactions'}
              </span>
              <span className="text-[9px] text-slate-400">Mai 2025</span>
            </div>

            <div className="space-y-2">
              {transactions.slice(0, 4).map((tx) => {
                const isPositive = tx.amount > 0;
                let iconBg = 'bg-emerald-500 text-white';
                let IconComponent = ArrowUpRight;

                if (tx.type === 'facture_fournisseur') {
                  iconBg = 'bg-sky-600 text-white';
                  IconComponent = ReceiptText;
                } else if (tx.type === 'paiement_personnel') {
                  iconBg = 'bg-rose-500 text-white';
                  IconComponent = Users;
                } else if (tx.type === 'recette_budgetaire') {
                  iconBg = 'bg-amber-500 text-white';
                  IconComponent = ArrowDownLeft;
                }

                return (
                  <div
                    key={tx.id}
                    className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between shadow-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-slate-800">{tx.title}</span>
                        <span className="text-[9px] text-slate-400 font-mono">{tx.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[11px] font-black font-mono ${isPositive ? 'text-emerald-600' : 'text-slate-800'}`}>
                        {isPositive ? '+ ' : ''}{formatFCFA(tx.amount)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
