import React from 'react';
import { Language, FinancialStats } from '../types';
import { formatFCFA } from '../data/initialData';
import { Coins, Landmark, ArrowUpRight, ArrowDownLeft, ShieldCheck, RefreshCw, Layers } from 'lucide-react';

interface TreasuryModuleProps {
  lang: Language;
  stats: FinancialStats;
}

export const TreasuryModule: React.FC<TreasuryModuleProps> = ({ lang, stats }) => {
  const accounts = [
    { name: 'BCEAO - Compte Central du Trésor', number: 'TG054-00100-CUT-01', balance: 75200000, type: 'Banque Centrale' },
    { name: 'Trésor - Compte Opérations Courantes', number: 'TG054-00100-TRES-02', balance: 25650000, type: 'Régie Trésor' },
    { name: 'Banque Partenaire - Recouvrement Fiscal', number: 'TG054-00234-FISCAL-03', balance: 18450000, type: 'Collecte Fiscale' },
    { name: 'Banque Partenaire - Recouvrement Douanier', number: 'TG054-00345-DOUANE-04', balance: 6480000, type: 'Recettes Douanes' },
  ];

  return (
    <div className="space-y-6" id="treasury-module">
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0b3b75] font-['Outfit']">
            {lang === 'FR' ? 'Gestion de la Trésorerie & Compte Unique (CUT)' : 'Treasury & Single Treasury Account (TSA)'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Direction Générale du Trésor et de la Comptabilité Publique (DGTCP) • Position nette en direct
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Position Consolidée en Temps Réel</span>
          </div>
        </div>
      </div>

      {/* Global Net Treasury Position */}
      <div className="bg-gradient-to-br from-[#0b3b75] to-[#1565c0] text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-blue-200 font-bold">
              Position Globale Consolidée du Trésor Public
            </span>
            <div className="mt-2 text-3xl sm:text-4xl font-black font-mono tracking-tight">
              {formatFCFA(125780000)}
            </div>
            <span className="text-xs text-blue-200 mt-1 block">
              Dont Solde Disponible Immédiat : <strong className="text-white font-mono">{formatFCFA(stats.soldeDisponible)}</strong>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15">
              <span className="text-[10px] text-blue-200 uppercase font-bold block">Encaissements J-1</span>
              <span className="text-base font-bold font-mono text-emerald-300">+45 000 000 FCFA</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15">
              <span className="text-[10px] text-blue-200 uppercase font-bold block">Décaissements J-1</span>
              <span className="text-base font-bold font-mono text-rose-200">-12 300 000 FCFA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accounts List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200">
          <h3 className="font-bold text-slate-800 text-sm">Comptes constitutifs du CUT (Compte Unique du Trésor)</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {accounts.map((acc, i) => (
            <div key={i} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0b3b75] flex items-center justify-center font-bold">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm block">{acc.name}</span>
                  <span className="text-xs text-slate-400 font-mono">{acc.number} • {acc.type}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono font-black text-slate-900 text-base">{formatFCFA(acc.balance)}</span>
                <span className="text-xs text-emerald-600 block font-semibold">Réconcilié à 16:00</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
