import React, { useState } from 'react';
import { BudgetAllocation, Language } from '../types';
import { initialBudgets, formatFCFA } from '../data/initialData';
import { WalletCards, Plus, ArrowUpRight, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

interface BudgetsModuleProps {
  lang: Language;
}

export const BudgetsModule: React.FC<BudgetsModuleProps> = ({ lang }) => {
  const [budgets, setBudgets] = useState<BudgetAllocation[]>(initialBudgets);

  const totalAllocated = budgets.reduce((s, b) => s + b.allocated, 0);
  const totalCommitted = budgets.reduce((s, b) => s + b.committed, 0);
  const totalLiquidated = budgets.reduce((s, b) => s + b.liquidated, 0);
  const totalAvailable = budgets.reduce((s, b) => s + b.available, 0);
  const avgExecution = ((totalCommitted / totalAllocated) * 100).toFixed(1);

  return (
    <div className="space-y-6" id="budgets-module">
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0b3b75] font-['Outfit']">
            {lang === 'FR' ? 'Gestion des Dotations & Crédits Budgétaires' : 'Budget Allocations & Appropriations'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Loi de Finances • Suivi des programmes budgétaires par Direction Générale
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#0b3b75] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs hover:bg-blue-900 transition self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Nouvelle ligne de crédit</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Crédits Ouverts</span>
          <span className="text-lg font-black text-slate-900 font-mono block mt-1">{formatFCFA(totalAllocated)}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Engagements Visés</span>
          <span className="text-lg font-black text-blue-700 font-mono block mt-1">{formatFCFA(totalCommitted)}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mandats Liquidés</span>
          <span className="text-lg font-black text-emerald-700 font-mono block mt-1">{formatFCFA(totalLiquidated)}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Taux de Consommation</span>
          <span className="text-lg font-black text-indigo-700 font-mono block mt-1">{avgExecution}%</span>
        </div>
      </div>

      {/* Program lines breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200">
          <h3 className="font-bold text-slate-800 text-sm">Programmes et Directions Sectorielles</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {budgets.map((b) => (
            <div key={b.id} className="p-4 sm:p-5 hover:bg-slate-50 transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      {b.code}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{b.name}</span>
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">
                    Engagé: {formatFCFA(b.committed)} sur {formatFCFA(b.allocated)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-slate-800 font-mono">{b.percentage}%</span>
                  <span className="text-xs text-slate-400 block">Disponible: {formatFCFA(b.available)}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-sky-500 rounded-full transition-all duration-500"
                  style={{ width: `${b.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
