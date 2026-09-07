import React from 'react';
import { Language } from '../types';
import { formatFCFA } from '../data/initialData';
import { BookOpen, FileCheck, CheckCircle2, ShieldCheck, Scale, FileSpreadsheet } from 'lucide-react';

interface AccountingModuleProps {
  lang: Language;
}

export const AccountingModule: React.FC<AccountingModuleProps> = ({ lang }) => {
  const accounts = [
    { code: 'Classe 1', name: 'Comptes de capitaux et dotations', debit: 0, credit: 1250000000 },
    { code: 'Classe 2', name: 'Comptes d\'immobilisations de l\'État', debit: 840000000, credit: 0 },
    { code: 'Classe 4', name: 'Comptes de tiers (Fournisseurs / Collectivités)', debit: 45000000, credit: 89000000 },
    { code: 'Classe 5', name: 'Comptes financiers et Trésor Public', debit: 25650000, credit: 0 },
    { code: 'Classe 6', name: 'Comptes de charges publiques', debit: 18320000, credit: 0 },
    { code: 'Classe 7', name: 'Comptes de produits et recettes fiscales', debit: 0, credit: 125780000 },
  ];

  return (
    <div className="space-y-6" id="accounting-module">
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0b3b75] font-['Outfit']">
            {lang === 'FR' ? 'Comptabilité Générale de l\'État (MCEF)' : 'State General Accounting (MCEF)'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Plan comptable public • Journal des écritures • Balance générale à partie double
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Grand Livre</span>
          </button>
          <button className="flex items-center gap-2 bg-[#0b3b75] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs hover:bg-blue-900 transition">
            <FileCheck className="w-4 h-4" />
            <span>Arrêté de Balance</span>
          </button>
        </div>
      </div>

      {/* Balance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Débits</span>
          <span className="text-lg font-black text-blue-800 font-mono block mt-1">{formatFCFA(928970000)}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Crédits</span>
          <span className="text-lg font-black text-blue-800 font-mono block mt-1">{formatFCFA(928970000)}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Équilibre Comptable</span>
          <div className="flex items-center gap-1.5 mt-1 text-emerald-600 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Balance équilibrée (Écart: 0 FCFA)</span>
          </div>
        </div>
      </div>

      {/* Accounting Classes Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm">Balance par classes de comptes</h3>
          <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
            Conforme SYSCOHADA / MCEF
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Classe</th>
                <th className="px-5 py-3">Intitulé du compte</th>
                <th className="px-5 py-3 text-right">Débit</th>
                <th className="px-5 py-3 text-right">Crédit</th>
                <th className="px-5 py-3 text-center">Solde</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {accounts.map((acc, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="px-5 py-3 font-mono font-bold text-blue-900">{acc.code}</td>
                  <td className="px-5 py-3 font-semibold text-slate-800">{acc.name}</td>
                  <td className="px-5 py-3 text-right font-mono">{acc.debit > 0 ? formatFCFA(acc.debit) : '-'}</td>
                  <td className="px-5 py-3 text-right font-mono">{acc.credit > 0 ? formatFCFA(acc.credit) : '-'}</td>
                  <td className="px-5 py-3 text-center">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">
                      {acc.debit >= acc.credit ? 'Débiteur' : 'Créditeur'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
