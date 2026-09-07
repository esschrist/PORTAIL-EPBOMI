import React, { useState } from 'react';
import { FinancialStats, MonthlyDataPoint, CategoryBreakdown, Transaction, Language } from '../types';
import { formatFCFA } from '../data/initialData';
import { LineChart } from './LineChart';
import { DonutChart } from './DonutChart';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  Filter, 
  Download, 
  Search, 
  Calendar, 
  Building, 
  Wallet, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ReceiptText,
  Users
} from 'lucide-react';

interface DashboardViewProps {
  stats: FinancialStats;
  monthlyData: MonthlyDataPoint[];
  breakdown: CategoryBreakdown[];
  transactions: Transaction[];
  lang: Language;
  onNewTransaction: () => void;
  onExport: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  monthlyData,
  breakdown,
  transactions,
  lang,
  onNewTransaction,
  onExport,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDirection, setSelectedDirection] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('2025');

  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = 
      tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.beneficiaryOrSource.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDirection = selectedDirection === 'all' || tx.direction.includes(selectedDirection);
    return matchesSearch && matchesDirection;
  });

  return (
    <div className="space-y-6" id="dashboard-view-container">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#0b3b75] font-['Outfit']">
              {lang === 'FR' ? 'Tableau de bord financier MCEF' : 'MCEF Financial Dashboard'}
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
              Exercice {selectedPeriod}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            {lang === 'FR' 
              ? 'Vue consolidée des ressources budgétaires, décaissements et opérations du Trésor' 
              : 'Consolidated view of budgetary resources, disbursements, and treasury operations'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition border border-slate-200"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'FR' ? 'Exporter' : 'Export'}</span>
          </button>

          <button
            onClick={onNewTransaction}
            className="flex items-center gap-1.5 bg-[#1565c0] hover:bg-[#0d47a1] text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'FR' ? 'Nouvelle opération' : 'New Transaction'}</span>
          </button>
        </div>
      </div>

      {/* 3 Main KPIs from the Image + Additional Performance Indicator */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Solde disponible */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {lang === 'FR' ? 'Solde disponible' : 'Available balance'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0b3b75] flex items-center justify-center font-bold">
              <Wallet className="w-4 h-4 text-[#1565c0]" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-xl sm:text-2xl font-black text-[#0b3b75] font-mono tracking-tight block">
              {formatFCFA(stats.soldeDisponible)}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2 font-medium">
            <span>Compte Unique du Trésor</span>
            <span className="text-emerald-600 font-bold">+4.2% ce mois</span>
          </div>
        </div>

        {/* 2. Dépenses du mois */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {lang === 'FR' ? 'Dépenses du mois' : 'Monthly expenses'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
              <ArrowDownLeft className="w-4 h-4 text-sky-600" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-xl sm:text-2xl font-black text-sky-800 font-mono tracking-tight block">
              {formatFCFA(stats.depensesMois)}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2 font-medium">
            <span>Ordonnancements visés</span>
            <span className="text-slate-700 font-bold">14 mandats</span>
          </div>
        </div>

        {/* 3. Recettes du mois */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {lang === 'FR' ? 'Recettes du mois' : 'Monthly revenue'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <ArrowUpRight className="w-4 h-4 text-[#1565c0]" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-xl sm:text-2xl font-black text-[#1565c0] font-mono tracking-tight block">
              {formatFCFA(stats.recettesMois)}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2 font-medium">
            <span>Impôts & Douanes</span>
            <span className="text-emerald-600 font-bold">+12.8% obj.</span>
          </div>
        </div>

        {/* 4. Taux d'exécution budgétaire */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {lang === 'FR' ? 'Taux d\'exécution' : 'Execution rate'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-slate-800 font-mono tracking-tight">
              {stats.tauxExecution}%
            </span>
            <span className="text-xs text-slate-400 font-medium">/ 100%</span>
          </div>
          <div className="mt-2">
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" 
                style={{ width: `${stats.tauxExecution}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart: Évolution des transactions (takes 2 cols) */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="font-extrabold text-[#0b3b75] text-base font-['Outfit']">
                {lang === 'FR' ? 'Évolution des transactions' : 'Transactions trend'}
              </h3>
              <span className="text-xs text-slate-400">
                {lang === 'FR' ? 'Flux cumulés mensuels en millions FCFA' : 'Monthly cumulative flows in million FCFA'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              <button className="px-2.5 py-1 rounded bg-white text-blue-900 shadow-xs font-bold">2025</button>
              <button className="px-2.5 py-1 rounded text-slate-500 hover:text-slate-800">2024</button>
            </div>
          </div>

          <div className="pt-2">
            <LineChart data={monthlyData} compact={false} height={230} />
          </div>
        </div>

        {/* Donut Chart: Répartition par type (takes 1 col) */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
          <div className="mb-4">
            <h3 className="font-extrabold text-[#0b3b75] text-base font-['Outfit']">
              {lang === 'FR' ? 'Répartition par type' : 'Breakdown by type'}
            </h3>
            <span className="text-xs text-slate-400">
              {lang === 'FR' ? 'Structure des opérations financières' : 'Financial operations structure'}
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center py-2">
            <DonutChart data={breakdown} compact={false} size={190} />
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Total des flux analysés</span>
            <span className="font-mono font-bold text-slate-800">
              {formatFCFA(breakdown.reduce((s, i) => s + i.amount, 0))}
            </span>
          </div>
        </div>
      </div>

      {/* Transactions List & Table (Matching the tablet and laptop operations) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table Header & Controls */}
        <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-[#0b3b75] text-lg font-['Outfit']">
                {lang === 'FR' ? 'Transactions et opérations récentes' : 'Recent transactions & operations'}
              </h3>
              <span className="text-xs font-bold bg-blue-50 text-[#0b3b75] px-2.5 py-0.5 rounded-full border border-blue-200">
                {filteredTransactions.length} {lang === 'FR' ? 'opérations' : 'records'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {lang === 'FR' ? 'Journal d\'audit certifié par la direction du MCEF' : 'Audit journal certified by MCEF'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'FR' ? 'Rechercher...' : 'Search...'}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-48 sm:w-56"
              />
            </div>

            {/* Filter by Direction */}
            <select
              value={selectedDirection}
              onChange={(e) => setSelectedDirection(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none text-slate-700 font-medium"
            >
              <option value="all">{lang === 'FR' ? 'Toutes les directions' : 'All divisions'}</option>
              <option value="Trésor">Direction Générale du Trésor</option>
              <option value="Douanes">Direction Générale des Douanes</option>
              <option value="Information">Direction des Systèmes d'Information</option>
              <option value="Ressources">Direction des Ressources Humaines</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">{lang === 'FR' ? 'Opération / Référence' : 'Operation / Ref'}</th>
                <th className="px-5 py-3.5">{lang === 'FR' ? 'Direction émettrice' : 'Division'}</th>
                <th className="px-5 py-3.5">{lang === 'FR' ? 'Bénéficiaire / Source' : 'Beneficiary / Source'}</th>
                <th className="px-5 py-3.5">{lang === 'FR' ? 'Date' : 'Date'}</th>
                <th className="px-5 py-3.5 text-right">{lang === 'FR' ? 'Montant' : 'Amount'}</th>
                <th className="px-5 py-3.5 text-center">{lang === 'FR' ? 'Statut' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredTransactions.map((tx) => {
                const isPositive = tx.amount > 0;
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          tx.type === 'virement_entrant' ? 'bg-emerald-100 text-emerald-700' :
                          tx.type === 'facture_fournisseur' ? 'bg-blue-100 text-blue-700' :
                          tx.type === 'paiement_personnel' ? 'bg-rose-100 text-rose-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {tx.type === 'virement_entrant' ? <ArrowUpRight className="w-4 h-4" /> :
                           tx.type === 'facture_fournisseur' ? <ReceiptText className="w-4 h-4" /> :
                           tx.type === 'paiement_personnel' ? <Users className="w-4 h-4" /> :
                           <ArrowDownLeft className="w-4 h-4" />}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block leading-tight">{tx.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{tx.reference}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 text-slate-600 font-medium">
                      {tx.direction}
                    </td>

                    <td className="px-5 py-3.5 text-slate-600 font-medium max-w-[200px] truncate">
                      {tx.beneficiaryOrSource}
                    </td>

                    <td className="px-5 py-3.5 text-slate-500 font-mono">
                      {tx.date}
                    </td>

                    <td className="px-5 py-3.5 text-right font-mono font-bold">
                      <span className={isPositive ? 'text-emerald-600' : 'text-slate-900'}>
                        {isPositive ? '+ ' : ''}{formatFCFA(tx.amount)}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-center">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Visé MCEF</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
