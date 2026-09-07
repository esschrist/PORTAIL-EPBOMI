import React from 'react';
import { Language } from '../types';
import { FileBarChart2, Download, FileText, CheckCircle2, Shield, Calendar } from 'lucide-react';

interface ReportsModuleProps {
  lang: Language;
}

export const ReportsModule: React.FC<ReportsModuleProps> = ({ lang }) => {
  const reports = [
    { title: 'Rapport d\'Exécution Budgétaire - T1 2025', date: '30/04/2025', format: 'PDF (2.4 MB)', type: 'Officiel MCEF', status: 'Certifié' },
    { title: 'Situation Mensuelle de Trésorerie - Avril 2025', date: '05/05/2025', format: 'Excel (1.1 MB)', type: 'DGTCP', status: 'Certifié' },
    { title: 'Bilan Analytique des Recettes Fiscales & Douanières', date: '02/05/2025', format: 'PDF (3.8 MB)', type: 'DGI / DGD', status: 'Certifié' },
    { title: 'Tableau des Dépenses Publiques par Programme', date: '28/04/2025', format: 'PDF (1.8 MB)', type: 'Budget État', status: 'Certifié' },
    { title: 'Grand Livre Comptable Consolidé MCEF', date: '20/04/2025', format: 'CSV / Data', type: 'Comptabilité Publique', status: 'Certifié' },
  ];

  return (
    <div className="space-y-6" id="reports-module">
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0b3b75] font-['Outfit']">
            {lang === 'FR' ? 'États Financiers & Rapports d\'Audit' : 'Financial Statements & Audit Reports'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Documents réglementaires certifiés par l'Inspection Générale des Finances et la Cour des Comptes
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200">
          <h3 className="font-bold text-slate-800 text-sm">Rapports Financiers Disponibles au Téléchargement</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {reports.map((rep, idx) => (
            <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0b3b75] flex items-center justify-center font-bold shrink-0">
                  <FileText className="w-5 h-5 text-[#1565c0]" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm block">{rep.title}</span>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                    <span>{rep.date}</span>
                    <span>•</span>
                    <span className="font-mono text-slate-500">{rep.format}</span>
                    <span>•</span>
                    <span className="text-blue-700 font-semibold">{rep.type}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{rep.status}</span>
                </span>
                <button
                  onClick={() => alert(`Téléchargement de: ${rep.title}`)}
                  className="flex items-center gap-1.5 bg-[#0b3b75] hover:bg-blue-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
